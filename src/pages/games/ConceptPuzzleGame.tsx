import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { GameHeader } from '@/components/GameHeader';
import { GameResult } from '@/components/GameResult';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useGameQuestions } from '@/hooks/useGameQuestions';
import { Lightbulb, Check, X } from 'lucide-react';

interface ConceptPuzzleGameProps {
  subjectId: string;
  unitId: string;
}

export default function ConceptPuzzleGame({ subjectId, unitId }: ConceptPuzzleGameProps) {
  const { conceptpuzzle } = useGameQuestions(subjectId, unitId);
  const [currentLevel, setCurrentLevel] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [hintsUsed, setHintsUsed] = useState(0);
  const [showHint, setShowHint] = useState<string | null>(null);
  const [showResult, setShowResult] = useState<'correct' | 'wrong' | null>(null);
  const [score, setScore] = useState(0);
  const [gameComplete, setGameComplete] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  let gameQuestions = conceptpuzzle ? [...conceptpuzzle] : [];

  // Override specific question for Chemistry 1 Unit 1 (index 5 -> question 6)
  if (subjectId === 'chemistry-1' && unitId === 'chem1-unit1' && gameQuestions.length >= 6) {
    gameQuestions[5] = {
      question:
        "An ionized gas consisting of positive ions and free electrons in proportions resulting in more or less no overall electric charge.",
      answer: 'Plasma',
      hints: ['First letter: P', '6 letters'],
    };
  }
  const currentQuestion = gameQuestions[currentLevel];
  const hints = currentQuestion?.hints || [];

  useEffect(() => {
    if (gameStarted && inputRef.current) {
      inputRef.current.focus();
    }
  }, [currentLevel, gameStarted, showResult]);

  const handleGetHint = () => {
    if (hintsUsed < hints.length) {
      setShowHint(hints[hintsUsed]);
      setHintsUsed(h => h + 1);
    }
  };

  const handleSubmit = () => {
    if (!userAnswer.trim()) return;

    const isCorrect = userAnswer.toLowerCase().trim() === currentQuestion?.answer.toLowerCase().trim();
    setShowResult(isCorrect ? 'correct' : 'wrong');

    if (isCorrect) {
      // Score based on hints used (3 points max, -1 per hint)
      const points = Math.max(1, 3 - hintsUsed);
      setScore(s => s + points);
    }
  };

  const nextLevel = () => {
    if (currentLevel + 1 >= gameQuestions.length) {
      setGameComplete(true);
    } else {
      setCurrentLevel(l => l + 1);
      setUserAnswer('');
      setHintsUsed(0);
      setShowHint(null);
      setShowResult(null);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !showResult) {
      handleSubmit();
    }
  };

  if (gameComplete) {
    return (
      <GameResult
        score={score}
        maxScore={gameQuestions.length * 3}
        gameName="Concept Puzzle"
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
        <GameHeader title="Concept Puzzle" subjectId={subjectId} unitId={unitId} />
        <div className="flex-1 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-md"
          >
            <div className="text-6xl mb-4">💡</div>
            <h2 className="font-display text-2xl font-bold mb-4">How to Play</h2>
            <p className="text-muted-foreground mb-6">
              Read the clue and guess the correct answer.
              Use hints if you're stuck, but each hint reduces your score!
            </p>
            <p className="text-sm text-muted-foreground mb-6">
              {gameQuestions.length} concepts to solve • 3 points each (minus hints)
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
        title="Concept Puzzle"
        subjectId={subjectId}
        unitId={unitId}
        score={score}
        maxScore={gameQuestions.length * 3}
      />

      <div className="flex-1 flex flex-col items-center justify-center p-4 gap-6">
        <div className="text-center">
          <p className="text-sm text-muted-foreground mb-2">
            Puzzle {currentLevel + 1} of {gameQuestions.length}
          </p>
        </div>

        <motion.div
          key={currentLevel}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-xl bg-card p-6 rounded-2xl border-2 border-border"
        >
          <div className="text-center mb-6">
            <p className="text-xl font-medium">{currentQuestion?.question}</p>
          </div>

          {/* Hints */}
          {showHint && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="mb-4 p-3 bg-game-yellow/20 border border-game-yellow rounded-lg flex items-center gap-2"
            >
              <Lightbulb className="text-game-yellow flex-shrink-0" size={18} />
              <p className="text-sm">{showHint}</p>
            </motion.div>
          )}

          {!showResult && (
            <>
              <div className="flex gap-2 mb-4">
                <Input
                  ref={inputRef}
                  value={userAnswer}
                  onChange={(e) => setUserAnswer(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Type your answer..."
                  className="flex-1"
                />
                <Button onClick={handleSubmit}>
                  Submit
                </Button>
              </div>

              <div className="flex items-center justify-between">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleGetHint}
                  disabled={hintsUsed >= hints.length}
                  className="gap-2"
                >
                  <Lightbulb size={16} />
                  Get Hint ({hints.length - hintsUsed} left)
                </Button>
                <p className="text-sm text-muted-foreground">
                  Potential points: {Math.max(1, 3 - hintsUsed)}
                </p>
              </div>
            </>
          )}

          {showResult && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center"
            >
              <div className={`flex items-center justify-center gap-2 text-xl font-bold mb-4 ${
                showResult === 'correct' ? 'text-green-500' : 'text-game-red'
              }`}>
                {showResult === 'correct' ? (
                  <>
                    <Check size={24} />
                    Correct! +{Math.max(1, 3 - hintsUsed)} points
                  </>
                ) : (
                  <>
                    <X size={24} />
                    Incorrect
                  </>
                )}
              </div>

              {showResult === 'wrong' && (
                <p className="text-muted-foreground mb-4">
                  Correct answer: <span className="text-primary font-bold">{currentQuestion?.answer}</span>
                </p>
              )}

              <Button onClick={nextLevel}>
                {currentLevel + 1 >= gameQuestions.length ? 'Finish' : 'Next Puzzle'}
              </Button>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
