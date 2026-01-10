import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { GameHeader } from '@/components/GameHeader';
import { GameResult } from '@/components/GameResult';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useGameQuestions } from '@/hooks/useGameQuestions';
import { Clock, Check, X } from 'lucide-react';

interface FightTimeGameProps {
  subjectId: string;
  unitId: string;
}

const TIME_OPTIONS = [
  { label: '60 seconds', value: 60 },
  { label: '2 minutes', value: 120 },
  { label: '3 minutes', value: 180 },
];

export default function FightTimeGame({ subjectId, unitId }: FightTimeGameProps) {
  const { fighttime } = useGameQuestions(subjectId, unitId);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswers, setUserAnswers] = useState<string[]>([]);
  const [currentInput, setCurrentInput] = useState('');
  const [timeLeft, setTimeLeft] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const question = fighttime && fighttime.length > currentQuestion ? fighttime[currentQuestion] : null;
  const correctAnswers = question?.answers || [];

  useEffect(() => {
    if (gameStarted && !gameOver && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            setGameOver(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [gameStarted, gameOver, timeLeft]);

  useEffect(() => {
    if (gameStarted && inputRef.current) {
      inputRef.current.focus();
    }
  }, [gameStarted, userAnswers]);

  const startGame = (time: number) => {
    setTimeLeft(time);
    setUserAnswers([]);
    setCurrentInput('');
    setCurrentQuestion(0);
    setGameStarted(true);
    setGameOver(false);
  };

  const handleSubmitAnswer = () => {
    if (!currentInput.trim()) return;

    const normalized = currentInput.toLowerCase().trim();
    const isCorrect = correctAnswers.some(
      ans => ans.toLowerCase().trim() === normalized
    );
    const alreadyAnswered = userAnswers.some(
      ans => ans.toLowerCase() === normalized
    );

    if (isCorrect && !alreadyAnswered) {
      const newAnswers = [...userAnswers, currentInput.trim()];
      setUserAnswers(newAnswers);

      // Check if all answers found
      if (newAnswers.length >= correctAnswers.length) {
        if (currentQuestion + 1 >= (fighttime ? fighttime.length : 0)) {
          setGameOver(true);
        } else {
          setCurrentQuestion(c => c + 1);
          setUserAnswers([]);
        }
      }
    }

    setCurrentInput('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSubmitAnswer();
    }
  };

  const getScore = () => {
    // Score based on questions completed
    let score = currentQuestion;
    if (userAnswers.length === correctAnswers.length) {
      score++;
    }
    return score;
  };

  if (gameOver) {
    return (
      <GameResult
        score={getScore()}
        maxScore={enumerationQuestions.length}
        gameName="Fight the Time"
        subjectId={subjectId}
        unitId={unitId}
        onRetry={() => {
          setGameStarted(false);
          setGameOver(false);
        }}
      />
    );
  }

  if (!gameStarted || !fighttime || fighttime.length === 0) {
    return (
      <div className="min-h-screen flex flex-col">
        <GameHeader title="Fight the Time" subjectId={subjectId} unitId={unitId} />
        <div className="flex-1 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-md"
          >
            <div className="text-6xl mb-4">⏱️</div>
            <h2 className="font-display text-2xl font-bold mb-4">How to Play</h2>
            <p className="text-muted-foreground mb-6">
              Enumerate all the answers to each question before time runs out!
              Type each answer and press Enter.
            </p>

            {enumerationQuestions.length === 0 ? (
              <p className="text-game-red">No fight time questions available for this unit.</p>
            ) : (
              <>
                <div className="mb-6">
                  <p className="text-sm text-muted-foreground mb-4 flex items-center justify-center gap-2">
                    <Clock size={16} />
                    Choose your time limit:
                  </p>
                  <div className="flex flex-col gap-2">
                    {TIME_OPTIONS.map(option => (
                      <Button
                        key={option.value}
                        variant="outline"
                        size="lg"
                        onClick={() => startGame(option.value)}
                        className="w-full"
                      >
                        {option.label}
                      </Button>
                    ))}
                  </div>
                </div>
              </>
            )}
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <GameHeader
        title="Fight the Time"
        subjectId={subjectId}
        unitId={unitId}
        score={currentQuestion}
        maxScore={enumerationQuestions.length}
        timeLeft={timeLeft}
      />

      <div className="flex-1 flex flex-col items-center justify-center p-4 gap-6">
        <div className="text-center">
          <p className="text-sm text-muted-foreground mb-2">
            Question {currentQuestion + 1} of {enumerationQuestions.length}
          </p>
        </div>

        <motion.div
          key={currentQuestion}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-xl bg-card p-6 rounded-2xl border-2 border-border"
        >
          <h3 className="text-xl font-bold mb-6 text-center">{question?.question}</h3>

          <div className="mb-6">
            <p className="text-sm text-muted-foreground mb-2">
              Found: {userAnswers.length} / {correctAnswers.length}
            </p>
            <div className="flex flex-wrap gap-2">
              {userAnswers.map((ans, i) => (
                <span
                  key={i}
                  className="px-3 py-1 bg-green-500/20 text-green-500 rounded-full text-sm flex items-center gap-1"
                >
                  <Check size={14} />
                  {ans}
                </span>
              ))}
              {Array.from({ length: correctAnswers.length - userAnswers.length }).map((_, i) => (
                <span
                  key={`empty-${i}`}
                  className="px-3 py-1 bg-muted text-muted-foreground rounded-full text-sm"
                >
                  ???
                </span>
              ))}
            </div>
          </div>

          <div className="flex gap-2">
            <Input
              ref={inputRef}
              value={currentInput}
              onChange={(e) => setCurrentInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type an answer..."
              className="flex-1"
            />
            <Button onClick={handleSubmitAnswer}>
              Add
            </Button>
          </div>
        </motion.div>

        <p className="text-sm text-muted-foreground">
          Press Enter to submit each answer
        </p>
      </div>
    </div>
  );
}
