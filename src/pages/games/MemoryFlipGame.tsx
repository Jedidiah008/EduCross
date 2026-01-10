import { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { GameHeader } from '@/components/GameHeader';
import { GameResult } from '@/components/GameResult';
import { Button } from '@/components/ui/button';
import { useGameQuestions } from '@/hooks/useGameQuestions';

interface MemoryFlipGameProps {
  subjectId: string;
  unitId: string;
}

interface Card {
  id: string;
  content: string;
  type: 'question' | 'answer';
  pairId: number;
  isFlipped: boolean;
  isMatched: boolean;
}

export default function MemoryFlipGame({ subjectId, unitId }: MemoryFlipGameProps) {
  const { memoryflip } = useGameQuestions(subjectId, unitId);
  const [cards, setCards] = useState<Card[]>([]);
  const [flippedCards, setFlippedCards] = useState<string[]>([]);
  const [matchedPairs, setMatchedPairs] = useState(0);
  const [moves, setMoves] = useState(0);
  const [gameComplete, setGameComplete] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [isChecking, setIsChecking] = useState(false);

  const gameQuestions = useMemo(() => memoryflip ? memoryflip.slice(0, 6) : [], [memoryflip]);

  useEffect(() => {
    if (gameStarted && gameQuestions.length > 0 && cards.length === 0) {
      const newCards: Card[] = [];

      gameQuestions.forEach((q, index) => {
        newCards.push({
          id: `q-${index}`,
          content: q.question,
          type: 'question',
          pairId: index,
          isFlipped: false,
          isMatched: false
        });
        newCards.push({
          id: `a-${index}`,
          content: q.answer,
          type: 'answer',
          pairId: index,
          isFlipped: false,
          isMatched: false
        });
      });

      // Shuffle once and store
      const shuffled = [...newCards].sort(() => Math.random() - 0.5);
      setCards(shuffled);
      setMatchedPairs(0);
      setMoves(0);
      setFlippedCards([]);
    }
  }, [gameStarted, gameQuestions, cards.length]);

  const handleCardClick = (cardId: string) => {
    if (isChecking) return;
    if (flippedCards.length >= 2) return;
    if (flippedCards.includes(cardId)) return;

    const card = cards.find(c => c.id === cardId);
    if (!card || card.isMatched) return;

    const newFlipped = [...flippedCards, cardId];
    setFlippedCards(newFlipped);

    if (newFlipped.length === 2) {
      setMoves(m => m + 1);
      setIsChecking(true);

      const [firstId, secondId] = newFlipped;
      const firstCard = cards.find(c => c.id === firstId);
      const secondCard = cards.find(c => c.id === secondId);

      if (firstCard && secondCard && firstCard.pairId === secondCard.pairId && firstCard.type !== secondCard.type) {
        // Match found
        setTimeout(() => {
          setCards(prev => prev.map(c => 
            c.id === firstId || c.id === secondId ? { ...c, isMatched: true } : c
          ));
          setMatchedPairs(p => {
            const newPairs = p + 1;
            if (newPairs === gameQuestions.length) {
              setTimeout(() => setGameComplete(true), 500);
            }
            return newPairs;
          });
          setFlippedCards([]);
          setIsChecking(false);
        }, 1000);
      } else {
        // No match
        setTimeout(() => {
          setFlippedCards([]);
          setIsChecking(false);
        }, 1500);
      }
    }
  };

  const isCardFlipped = (cardId: string) => {
    const card = cards.find(c => c.id === cardId);
    return flippedCards.includes(cardId) || card?.isMatched;
  };

  if (gameComplete) {
    return (
      <GameResult
        score={matchedPairs}
        maxScore={gameQuestions.length}
        gameName="Memory Flip"
        subjectId={subjectId}
        unitId={unitId}
        onRetry={() => {
          setGameComplete(false);
          setGameStarted(false);
          setCards([]);
        }}
      />
    );
  }

  if (!gameStarted) {
    return (
      <div className="min-h-screen flex flex-col">
        <GameHeader title="Memory Flip" subjectId={subjectId} unitId={unitId} />
        <div className="flex-1 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-md"
          >
            <div className="text-6xl mb-4">🃏</div>
            <h2 className="font-display text-2xl font-bold mb-4">How to Play</h2>
            <p className="text-muted-foreground mb-6">
              Flip cards to find matching pairs of questions and answers.
              Match all pairs to win!
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
        title="Memory Flip"
        subjectId={subjectId}
        unitId={unitId}
        score={matchedPairs}
        maxScore={gameQuestions.length}
      />

      <div className="flex-1 flex flex-col items-center justify-center p-4 gap-4">
        <p className="text-muted-foreground">Moves: {moves}</p>

        <div className="grid grid-cols-3 sm:grid-cols-4 gap-4 max-w-4xl w-full px-4">
          {cards.map(card => (
            <motion.div
              key={card.id}
              className="aspect-[3/4] cursor-pointer perspective-1000 min-h-[140px] sm:min-h-[160px]"
              onClick={() => handleCardClick(card.id)}
              whileHover={{ scale: isCardFlipped(card.id) ? 1 : 1.05 }}
            >
              <motion.div
                className="relative w-full h-full"
                initial={false}
                animate={{ rotateY: isCardFlipped(card.id) ? 180 : 0 }}
                transition={{ duration: 0.4 }}
                style={{ transformStyle: 'preserve-3d' }}
              >
                {/* Back of card */}
                <div
                  className={`absolute inset-0 flex items-center justify-center rounded-xl border-2 font-bold text-3xl
                    ${card.isMatched ? 'border-green-500 bg-green-500/20' : 'border-primary bg-gradient-to-br from-primary to-accent'}`}
                  style={{ backfaceVisibility: 'hidden' }}
                >
                  <span className="text-primary-foreground">?</span>
                </div>

                {/* Front of card */}
                <div
                  className={`absolute inset-0 flex items-center justify-center p-3 rounded-xl border-2 text-center
                    ${card.type === 'question' ? 'bg-game-lightblue/20 border-game-lightblue' : 'bg-game-yellow/20 border-game-yellow'}
                    ${card.isMatched ? 'border-green-500 bg-green-500/20' : ''}`}
                  style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
                >
                  <span className="font-medium text-sm sm:text-base leading-relaxed whitespace-normal break-words">{card.content}</span>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}