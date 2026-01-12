import { useState, useEffect, useRef, useMemo } from 'react';
import { motion } from 'framer-motion';
import { GameHeader } from '@/components/GameHeader';
import { GameResult } from '@/components/GameResult';
import { Button } from '@/components/ui/button';
import { useGameQuestions } from '@/hooks/useGameQuestions';
import { Check, X, Lightbulb } from 'lucide-react';

interface MatchItGameProps {
  subjectId: string;
  unitId: string;
}

interface Connection {
  questionIndex: number;
  answerIndex: number;
}

export default function MatchItGame({ subjectId, unitId }: MatchItGameProps) {
  const { matchit } = useGameQuestions(subjectId, unitId);
  const [shuffledAnswers, setShuffledAnswers] = useState<{ text: string; correctIndex: number }[]>([]);
  const [connections, setConnections] = useState<Connection[]>([]);
  const [selectedQuestion, setSelectedQuestion] = useState<number | null>(null);
  const [showResults, setShowResults] = useState(false);
  const [gameComplete, setGameComplete] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const gameQuestions = useMemo(() => matchit ? matchit.slice(0, 8) : [], [matchit]);

  useEffect(() => {
    if (gameStarted && gameQuestions.length > 0 && shuffledAnswers.length === 0) {
      const answers = gameQuestions.map((q, i) => ({
        text: q.answer,
        correctIndex: i
      }));
      // Shuffle once and store
      const shuffled = [...answers].sort(() => Math.random() - 0.5);
      setShuffledAnswers(shuffled);
      setConnections([]);
      setShowResults(false);
    }
  }, [gameStarted, gameQuestions, shuffledAnswers.length]);

  const handleQuestionClick = (index: number) => {
    if (showResults) return;
    
    // Check if already connected
    const existing = connections.find(c => c.questionIndex === index);
    if (existing) {
      setConnections(prev => prev.filter(c => c.questionIndex !== index));
    }
    
    setSelectedQuestion(index);
  };

  const handleAnswerClick = (answerIndex: number) => {
    if (showResults || selectedQuestion === null) return;

    // Remove any existing connection to this answer
    setConnections(prev => {
      const filtered = prev.filter(c => c.answerIndex !== answerIndex && c.questionIndex !== selectedQuestion);
      return [...filtered, { questionIndex: selectedQuestion, answerIndex }];
    });

    setSelectedQuestion(null);
  };

  const checkAnswers = () => {
    setShowResults(true);
  };

  const getScore = () => {
    return connections.filter(conn => {
      const answer = shuffledAnswers[conn.answerIndex];
      return answer.correctIndex === conn.questionIndex;
    }).length;
  };

  const isConnectionCorrect = (conn: Connection) => {
    const answer = shuffledAnswers[conn.answerIndex];
    return answer.correctIndex === conn.questionIndex;
  };

  const allConnected = connections.length === gameQuestions.length;

  if (gameComplete) {
    return (
      <GameResult
        score={getScore()}
        maxScore={gameQuestions.length}
        gameName="Match It"
        subjectId={subjectId}
        unitId={unitId}
        onRetry={() => {
          setGameComplete(false);
          setShowResults(false);
          setGameStarted(false);
          setShuffledAnswers([]);
        }}
      />
    );
  }

  if (!gameStarted) {
    return (
      <div className="min-h-screen flex flex-col">
        <GameHeader title="Match It" subjectId={subjectId} unitId={unitId} />
        <div className="flex-1 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-md"
          >
            <div className="text-6xl mb-4">🔗</div>
            <h2 className="font-display text-2xl font-bold mb-4">How to Play</h2>
            <p className="text-muted-foreground mb-6">
              Connect each question on the left to its matching answer on the right.
              Click a question, then click its answer to make a connection.
            </p>
            <p className="text-sm text-muted-foreground mb-6">
              {gameQuestions.length} pairs to match
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
        title="Match It"
        subjectId={subjectId}
        unitId={unitId}
        score={showResults ? getScore() : connections.length}
        maxScore={gameQuestions.length}
      />

      <div className="flex-1 flex flex-col p-4 gap-4">
        <div ref={containerRef} className="flex-1 flex gap-8 justify-center items-start max-w-4xl mx-auto w-full">
          {/* Questions */}
          <div className="flex-1 space-y-3">
            <h3 className="font-display text-lg font-bold text-center mb-4">Questions</h3>
            {gameQuestions.map((q, index) => {
              const isConnected = connections.some(c => c.questionIndex === index);
              const conn = connections.find(c => c.questionIndex === index);
              const isCorrect = conn && showResults && isConnectionCorrect(conn);
              const isWrong = conn && showResults && !isConnectionCorrect(conn);

              return (
                <motion.div
                  key={index}
                  onClick={() => handleQuestionClick(index)}
                  className={`p-3 rounded-lg border-2 cursor-pointer transition-all text-sm
                    ${selectedQuestion === index ? 'border-primary bg-primary/20 ring-2 ring-primary' : ''}
                    ${isConnected && !showResults ? 'border-game-yellow bg-game-yellow/10' : ''}
                    ${isCorrect ? 'border-green-500 bg-green-500/10' : ''}
                    ${isWrong ? 'border-game-red bg-game-red/10' : ''}
                    ${!isConnected && !selectedQuestion ? 'border-border bg-card hover:border-primary/50' : ''}`}
                  whileHover={{ scale: showResults ? 1 : 1.02 }}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="flex-1 break-words whitespace-normal">{q.question}</span>
                    <div className={`w-4 h-4 rounded-full border-2 flex-shrink-0
                      ${isConnected ? 'bg-game-yellow border-game-yellow' : 'border-muted-foreground'}`}
                    />
                  </div>
                  {showResults && isWrong && (
                    <p className="text-xs text-green-500 mt-1 flex items-center gap-1">
                      <Lightbulb size={12} /> Correct: {gameQuestions[index].answer}
                    </p>
                  )}
                </motion.div>
              );
            })}
          </div>

          {/* Answers */}
          <div className="flex-1 space-y-3">
            <h3 className="font-display text-lg font-bold text-center mb-4">Answers</h3>
            {shuffledAnswers.map((answer, index) => {
              const conn = connections.find(c => c.answerIndex === index);
              const isConnected = !!conn;
              const isCorrect = conn && showResults && isConnectionCorrect(conn);
              const isWrong = conn && showResults && !isConnectionCorrect(conn);

              return (
                <motion.div
                  key={index}
                  onClick={() => handleAnswerClick(index)}
                  className={`p-3 rounded-lg border-2 cursor-pointer transition-all text-sm
                    ${isConnected && !showResults ? 'border-game-yellow bg-game-yellow/10' : ''}
                    ${isCorrect ? 'border-green-500 bg-green-500/10' : ''}
                    ${isWrong ? 'border-game-red bg-game-red/10' : ''}
                    ${!isConnected ? 'border-border bg-card hover:border-primary/50' : ''}`}
                  whileHover={{ scale: showResults ? 1 : 1.02 }}
                >
                  <div className="flex items-center gap-2">
                    <div className={`w-4 h-4 rounded-full border-2 flex-shrink-0
                      ${isConnected ? 'bg-game-yellow border-game-yellow' : 'border-muted-foreground'}`}
                    />
                    <span className="flex-1">{answer.text}</span>
                    {showResults && (
                      isCorrect ? <Check className="text-green-500" size={16} /> :
                      isWrong ? <X className="text-game-red" size={16} /> : null
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        <div className="flex justify-center gap-4 py-4">
          {!showResults && allConnected && (
            <Button size="lg" onClick={checkAnswers}>
              Check Answers
            </Button>
          )}
          {showResults && (
            <Button size="lg" onClick={() => setGameComplete(true)}>
              Continue
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}