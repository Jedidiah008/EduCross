import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { GameHeader } from '@/components/GameHeader';
import { GameResult } from '@/components/GameResult';
import { Button } from '@/components/ui/button';
import { useGameQuestions } from '@/hooks/useGameQuestions';
import { Check, X, Lightbulb } from 'lucide-react';

interface JigsawGameProps {
  subjectId: string;
  unitId: string;
}

interface PuzzlePiece {
  id: string;
  text: string;
  order: number;
}

export default function JigsawGame({ subjectId, unitId }: JigsawGameProps) {
  const { jigsaw } = useGameQuestions(subjectId, unitId);
  const [currentLevel, setCurrentLevel] = useState(0);
  const [pieces, setPieces] = useState<PuzzlePiece[]>([]);
  const [placedPieces, setPlacedPieces] = useState<(PuzzlePiece | null)[]>([]);
  const [showCorrection, setShowCorrection] = useState(false);
  const [score, setScore] = useState(0);
  const [gameComplete, setGameComplete] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [draggingPiece, setDraggingPiece] = useState<PuzzlePiece | null>(null);

  const currentQuestion = jigsaw && jigsaw.length > currentLevel ? jigsaw[currentLevel] : null;

  const correctPhrase = currentQuestion
    ? [...currentQuestion].sort((a, b) => a.order - b.order).map(p => p.text).join('').trim()
    : '';

  const clue = currentQuestion && (currentQuestion as any).answer ? (currentQuestion as any).answer : '';

  // Now the QUESTION (text) needs to be arranged to form the phrase that answers what's shown
  // The ANSWER becomes the clue/definition shown to the user
  useEffect(() => {
    if (gameStarted && currentQuestion) {
      // currentQuestion is now an array of puzzle pieces
      const newPieces: PuzzlePiece[] = currentQuestion.map((piece) => ({
        id: piece.id,
        text: piece.text,
        order: piece.order
      }));

      setPieces([...newPieces].sort(() => Math.random() - 0.5));
      setPlacedPieces(new Array(currentQuestion.length).fill(null));
      setShowCorrection(false);
    }
  }, [currentLevel, gameStarted, currentQuestion]);

  const handleDragStart = (piece: PuzzlePiece) => {
    setDraggingPiece(piece);
  };

  const handleDrop = (slotIndex: number) => {
    if (draggingPiece) {
      // Remove from pieces pool
      setPieces(prev => prev.filter(p => p.id !== draggingPiece.id));
      
      // If slot already has a piece, return it to pool
      if (placedPieces[slotIndex]) {
        setPieces(prev => [...prev, placedPieces[slotIndex]!]);
      }

      // Place piece in slot
      setPlacedPieces(prev => {
        const updated = [...prev];
        updated[slotIndex] = draggingPiece;
        return updated;
      });

      setDraggingPiece(null);
    }
  };

  const handleRemovePiece = (slotIndex: number) => {
    const piece = placedPieces[slotIndex];
    if (piece) {
      setPlacedPieces(prev => {
        const updated = [...prev];
        updated[slotIndex] = null;
        return updated;
      });
      setPieces(prev => [...prev, piece]);
    }
  };

  const checkAnswer = () => {
    // piece.order is 1-based in the data, while placedPieces indexes are 0-based
    const isCorrect = placedPieces.length > 0 && placedPieces.every((piece, index) => piece !== null && Number(piece!.order) === index + 1);

    if (isCorrect) {
      setScore(s => s + 1);
    }

    setShowCorrection(true);
  };

  const nextLevel = () => {
    if (currentLevel + 1 >= (jigsaw ? jigsaw.length : 0)) {
      setGameComplete(true);
    } else {
      setCurrentLevel(l => l + 1);
    }
  };

  const isComplete = placedPieces.length > 0 && placedPieces.every(p => p !== null);

  if (gameComplete) {
    return (
      <GameResult
        score={score}
        maxScore={jigsaw ? jigsaw.length : 0}
        gameName="Jigsaw Puzzle"
        subjectId={subjectId}
        unitId={unitId}
        onRetry={() => {
          setCurrentLevel(0);
          setScore(0);
          setGameComplete(false);
          setGameStarted(false);
        }}
      />
    );
  }

  if (!gameStarted) {
    return (
      <div className="min-h-screen flex flex-col">
        <GameHeader title="Jigsaw Puzzle" subjectId={subjectId} unitId={unitId} />
        <div className="flex-1 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-md"
          >
            <div className="text-6xl mb-4">🧩</div>
            <h2 className="font-display text-2xl font-bold mb-4">How to Play</h2>
            <p className="text-muted-foreground mb-6">
              Read the answer/definition shown, then arrange the word pieces in the correct order 
              to form the question/phrase that corresponds to it.
            </p>
            <p className="text-sm text-muted-foreground mb-6">
              {jigsaw ? jigsaw.length : 0} levels to complete
            </p>
            <Button size="lg" onClick={() => setGameStarted(true)}>
              Start Game
            </Button>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <GameHeader
        title="Jigsaw Puzzle"
        subjectId={subjectId}
        unitId={unitId}
        score={score}
        maxScore={jigsaw ? jigsaw.length : 0}
      />

      <div className="flex-1 flex flex-col items-center justify-center p-4 gap-8">
        <div className="text-center max-w-2xl">
          <p className="text-sm text-muted-foreground mb-2">Level {currentLevel + 1}/{jigsaw ? jigsaw.length : 0}</p>
          <p className="text-sm text-muted-foreground mb-1">Arrange words to form the phrase for:</p>
          {clue ? (
            <p className="text-xl font-medium text-primary bg-primary/10 px-4 py-2 rounded-lg inline-block">
              {clue}
            </p>
          ) : null}
        </div>

        {/* Puzzle Slots */}
        <div className="flex flex-wrap gap-2 justify-center p-4 bg-card rounded-xl border-2 border-border min-h-[80px]">
          {placedPieces.map((piece, index) => (
            <div
              key={index}
              onDragOver={(e) => e.preventDefault()}
              onDrop={() => handleDrop(index)}
              onClick={() => !showCorrection && handleRemovePiece(index)}
              className={`min-w-[80px] h-12 flex items-center justify-center rounded-lg border-2 border-dashed transition-colors cursor-pointer
                ${piece ? 
                  (showCorrection ? 
                    (Number(piece.order) === index + 1 ? 'border-green-500 bg-green-500/20' : 'border-game-red bg-game-red/20') : 
                    'border-primary bg-primary/20') : 
                  'border-muted-foreground/30 hover:border-primary'}`}
            >
              {piece ? (
                <span className="font-medium px-3 flex items-center gap-2">
                  {piece.text}
                  {showCorrection && (
                    Number(piece.order) === index + 1 ? 
                      <Check className="text-green-500" size={16} /> : 
                      <X className="text-game-red" size={16} />
                  )}
                </span>
              ) : (
                <span className="text-muted-foreground text-sm">{index + 1}</span>
              )}
            </div>
          ))}
        </div>

        {/* Pieces Pool */}
        {!showCorrection && (
          <div className="flex flex-wrap gap-2 justify-center">
            {pieces.map(piece => (
              <motion.div
                key={piece.id}
                draggable
                onDragStart={() => handleDragStart(piece)}
                className="px-4 py-2 bg-game-yellow text-game-navy font-bold rounded-lg cursor-grab active:cursor-grabbing shadow-md"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {piece.text}
              </motion.div>
            ))}
          </div>
        )}

        {/* Correction */}
        {showCorrection && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center bg-card p-4 rounded-xl border-2 border-border"
          >
            <div className="flex items-center gap-2 justify-center mb-2">
              <Lightbulb className="text-game-yellow" size={20} />
              <span className="font-bold">Correct Phrase:</span>
            </div>
            <p className="text-lg text-primary">{correctPhrase}</p>
          </motion.div>
        )}

        {/* Actions */}
        <div className="flex gap-4">
          {!showCorrection && isComplete && (
            <Button size="lg" onClick={checkAnswer}>
              Check Answer
            </Button>
          )}
          {showCorrection && (
            <Button size="lg" onClick={nextLevel}>
              {currentLevel + 1 >= (jigsaw ? jigsaw.length : 0) ? 'Finish' : 'Next Level'}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}