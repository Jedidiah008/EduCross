import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { GameHeader } from '@/components/GameHeader';
import { GameResult } from '@/components/GameResult';
import { Button } from '@/components/ui/button';
import { useGameQuestions } from '@/hooks/useGameQuestions';
import { Undo2, Check } from 'lucide-react';

interface GuessWordGameProps {
  subjectId: string;
  unitId: string;
}

export default function GuessWordGame({ subjectId, unitId }: GuessWordGameProps) {
  const { guessword } = useGameQuestions(subjectId, unitId);
  const [currentLevel, setCurrentLevel] = useState(0);
  const [shuffledLetters, setShuffledLetters] = useState<{ char: string; id: number; used: boolean }[]>([]);
  const [selectedLetters, setSelectedLetters] = useState<{ char: string; id: number }[]>([]);
  const [score, setScore] = useState(0);
  const [gameComplete, setGameComplete] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [showResult, setShowResult] = useState<'correct' | 'wrong' | null>(null);

  const gameQuestions = guessword ? guessword.slice(0, 10) : [];
  const currentQuestion = gameQuestions[currentLevel];
  const targetAnswer = currentQuestion?.answer.toUpperCase().replace(/\s/g, '') || '';

  useEffect(() => {
    if (gameStarted && targetAnswer) {
      const letters = targetAnswer.split('').map((char, i) => ({
        char,
        id: i,
        used: false
      }));
      setShuffledLetters(letters.sort(() => Math.random() - 0.5));
      setSelectedLetters([]);
      setShowResult(null);
    }
  }, [currentLevel, gameStarted, targetAnswer]);

  const handleLetterClick = (letter: { char: string; id: number }) => {
    if (showResult) return;
    
    setShuffledLetters(prev => prev.map(l => 
      l.id === letter.id ? { ...l, used: true } : l
    ));
    setSelectedLetters(prev => [...prev, letter]);
  };

  const handleUndo = () => {
    if (selectedLetters.length === 0 || showResult) return;
    
    const lastLetter = selectedLetters[selectedLetters.length - 1];
    setShuffledLetters(prev => prev.map(l => 
      l.id === lastLetter.id ? { ...l, used: false } : l
    ));
    setSelectedLetters(prev => prev.slice(0, -1));
  };

  const handleClear = () => {
    if (showResult) return;
    
    setShuffledLetters(prev => prev.map(l => ({ ...l, used: false })));
    setSelectedLetters([]);
  };

  const checkAnswer = () => {
    const userAnswer = selectedLetters.map(l => l.char).join('');
    const isCorrect = userAnswer === targetAnswer;
    
    setShowResult(isCorrect ? 'correct' : 'wrong');
    
    if (isCorrect) {
      setScore(s => s + 1);
    }

    setTimeout(() => {
      if (currentLevel + 1 >= gameQuestions.length) {
        setGameComplete(true);
      } else {
        setCurrentLevel(l => l + 1);
      }
    }, 1500);
  };

  const isComplete = selectedLetters.length === targetAnswer.length;

  if (gameComplete) {
    return (
      <GameResult
        score={score}
        maxScore={gameQuestions.length}
        gameName="Guess the Word"
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
        <GameHeader title="Guess the Word" subjectId={subjectId} unitId={unitId} />
        <div className="flex-1 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-md"
          >
            <div className="text-6xl mb-4">🔤</div>
            <h2 className="font-display text-2xl font-bold mb-4">How to Play</h2>
            <p className="text-muted-foreground mb-6">
              Unscramble the letters to spell the correct answer.
              Click letters in the right order to form the word.
            </p>
            <p className="text-sm text-muted-foreground mb-6">
              {gameQuestions.length} words to guess
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
        title="Guess the Word"
        subjectId={subjectId}
        unitId={unitId}
        score={score}
        maxScore={gameQuestions.length}
      />

      <div className="flex-1 flex flex-col items-center justify-center p-4 gap-6">
        <div className="text-center">
          <p className="text-sm text-muted-foreground mb-2">
            Level {currentLevel + 1} of {gameQuestions.length}
          </p>
          <p className="text-xl font-medium max-w-lg">{currentQuestion?.question}</p>
        </div>

        {/* Answer slots */}
        <div className="flex gap-2 flex-wrap justify-center">
          {Array.from({ length: targetAnswer.length }).map((_, i) => (
            <motion.div
              key={i}
              className={`w-12 h-14 flex items-center justify-center text-2xl font-bold rounded-lg border-2
                ${selectedLetters[i] ? 
                  (showResult === 'correct' ? 'border-green-500 bg-green-500/20' : 
                   showResult === 'wrong' ? 'border-game-red bg-game-red/20' : 
                   'border-primary bg-primary/20') : 
                  'border-dashed border-muted-foreground/50'}`}
              initial={false}
              animate={{ 
                scale: selectedLetters[i] ? [1, 1.1, 1] : 1,
              }}
            >
              {selectedLetters[i]?.char || ''}
            </motion.div>
          ))}
        </div>

        {showResult && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex items-center gap-2 font-bold text-lg ${
              showResult === 'correct' ? 'text-green-500' : 'text-game-red'
            }`}
          >
            {showResult === 'correct' ? (
              <>
                <Check size={24} />
                Correct!
              </>
            ) : (
              <>
                Correct answer: {targetAnswer}
              </>
            )}
          </motion.div>
        )}

        {/* Letter tiles */}
        {!showResult && (
          <>
            <div className="flex gap-2 flex-wrap justify-center max-w-md">
              {shuffledLetters.map((letter) => (
                <motion.button
                  key={letter.id}
                  onClick={() => handleLetterClick(letter)}
                  disabled={letter.used}
                  className={`w-12 h-14 flex items-center justify-center text-2xl font-bold rounded-lg border-2 transition-all
                    ${letter.used ? 
                      'border-muted bg-muted/50 text-muted-foreground cursor-not-allowed' : 
                      'border-game-yellow bg-game-yellow text-game-navy cursor-pointer hover:scale-105'}`}
                  whileHover={{ scale: letter.used ? 1 : 1.05 }}
                  whileTap={{ scale: letter.used ? 1 : 0.95 }}
                >
                  {letter.char}
                </motion.button>
              ))}
            </div>

            <div className="flex gap-4">
              <Button
                variant="outline"
                onClick={handleUndo}
                disabled={selectedLetters.length === 0}
                className="gap-2"
              >
                <Undo2 size={18} />
                Undo
              </Button>
              <Button
                variant="outline"
                onClick={handleClear}
                disabled={selectedLetters.length === 0}
              >
                Clear
              </Button>
              {isComplete && (
                <Button onClick={checkAnswer}>
                  Check Answer
                </Button>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
