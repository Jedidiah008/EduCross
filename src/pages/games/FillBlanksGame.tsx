import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { GameHeader } from '@/components/GameHeader';
import { GameResult } from '@/components/GameResult';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useGameQuestions } from '@/hooks/useGameQuestions';
import { Clock } from 'lucide-react';

interface FillBlanksGameProps {
  subjectId: string;
  unitId: string;
}

const TIME_OPTIONS = [
  { label: '60 seconds', value: 60 },
  { label: '2 minutes', value: 120 },
  { label: '3 minutes', value: 180 },
];

export default function FillBlanksGame({ subjectId, unitId }: FillBlanksGameProps) {
  const { fillblanks } = useGameQuestions(subjectId, unitId);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [timeLeft, setTimeLeft] = useState(0);
  const [selectedTime, setSelectedTime] = useState<number | null>(null);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [gameWon, setGameWon] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const gameQuestions = fillblanks ? fillblanks.slice(0, 10) : [];

  useEffect(() => {
    if (gameStarted && !gameOver && !gameWon) {
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
  }, [gameStarted, gameOver, gameWon]);

  useEffect(() => {
    if (gameStarted && inputRef.current) {
      inputRef.current.focus();
    }
  }, [currentQuestion, gameStarted]);

  const startGame = (time: number) => {
    setSelectedTime(time);
    setTimeLeft(time);
    setAnswers(new Array(gameQuestions.length).fill(''));
    setCurrentQuestion(0);
    setGameStarted(true);
    setGameOver(false);
    setGameWon(false);
  };

  const handleAnswerChange = (value: string) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = value;
    setAnswers(newAnswers);
  };

  const handleSubmit = () => {
    if (currentQuestion + 1 >= gameQuestions.length) {
      // Check all answers
      const allCorrect = gameQuestions.every((q, i) => 
        answers[i].toLowerCase().trim() === q.answer.toLowerCase().trim()
      );
      
      if (allCorrect) {
        setGameWon(true);
      } else {
        // Reset to first question
        setCurrentQuestion(0);
        setTimeLeft(selectedTime || 60);
      }
    } else {
      setCurrentQuestion(c => c + 1);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  const getScore = () => {
    return gameQuestions.filter((q, i) => 
      answers[i]?.toLowerCase().trim() === q.answer.toLowerCase().trim()
    ).length;
  };

  if (gameOver || gameWon) {
    return (
      <GameResult
        score={getScore()}
        maxScore={gameQuestions.length}
        gameName="Fill in the Blanks"
        subjectId={subjectId}
        unitId={unitId}
        onRetry={() => {
          setGameStarted(false);
          setGameOver(false);
          setGameWon(false);
          setSelectedTime(null);
        }}
      />
    );
  }

  if (!gameStarted) {
    return (
      <div className="min-h-screen flex flex-col">
        <GameHeader title="Fill in the Blanks" subjectId={subjectId} unitId={unitId} />
        <div className="flex-1 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-md"
          >
            <div className="text-6xl mb-4">📝</div>
            <h2 className="font-display text-2xl font-bold mb-4">How to Play</h2>
            <p className="text-muted-foreground mb-6">
              Answer all {gameQuestions.length} questions before time runs out.
              If you don't finish in time, you'll start over from question 1!
            </p>
            
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
          </motion.div>
        </div>
      </div>
    );
  }

  const question = gameQuestions[currentQuestion];

  return (
    <div className="min-h-screen flex flex-col">
      <GameHeader
        title="Fill in the Blanks"
        subjectId={subjectId}
        unitId={unitId}
        score={currentQuestion}
        maxScore={gameQuestions.length}
        timeLeft={timeLeft}
      />

      <div className="flex-1 flex flex-col items-center justify-center p-4 gap-8">
        <div className="text-center">
          <p className="text-sm text-muted-foreground mb-2">
            Question {currentQuestion + 1} of {gameQuestions.length}
          </p>
          
          <div className="flex gap-1 mb-6">
            {gameQuestions.map((_, i) => (
              <div
                key={i}
                className={`w-3 h-3 rounded-full ${
                  i < currentQuestion ? 'bg-primary' : 
                  i === currentQuestion ? 'bg-game-yellow' : 'bg-muted'
                }`}
              />
            ))}
          </div>
        </div>

        <motion.div
          key={currentQuestion}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          className="w-full max-w-xl bg-card p-8 rounded-2xl border-2 border-border"
        >
          <p className="text-lg mb-6">{question?.question}</p>
          
          <div className="space-y-4">
            <div className="relative">
              <Input
                ref={inputRef}
                value={answers[currentQuestion] || ''}
                onChange={(e) => handleAnswerChange(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type your answer..."
                className="text-lg h-14"
              />
            </div>

            <Button 
              onClick={handleSubmit} 
              className="w-full"
              size="lg"
            >
              {currentQuestion + 1 >= gameQuestions.length ? 'Submit All' : 'Next Question'}
            </Button>
          </div>
        </motion.div>

        <p className="text-sm text-muted-foreground">
          Press Enter to submit
        </p>
      </div>
    </div>
  );
}
