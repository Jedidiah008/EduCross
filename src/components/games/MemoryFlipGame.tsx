import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MemoryPair } from "@/data/gameQuestions";

interface Props {
  pairs: MemoryPair[];
  onComplete: (score: number, maxScore: number, time: number) => void;
  subjectColor: "yellow" | "blue";
}

interface GameCard {
  id: string;
  text: string;
  type: "question" | "answer";
  pairId: number;
}

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export default function MemoryFlipGame({ pairs, onComplete, subjectColor }: Props) {
  const [cards, setCards] = useState<GameCard[]>([]);
  const [flippedCards, setFlippedCards] = useState<string[]>([]);
  const [matchedPairs, setMatchedPairs] = useState<Set<number>>(new Set());
  const [startTime] = useState(Date.now());
  const [moves, setMoves] = useState(0);

  const colorClass = subjectColor === "yellow" ? "text-primary" : "text-secondary";
  const bgClass = subjectColor === "yellow" ? "bg-primary" : "bg-secondary";

  useEffect(() => {
    const gameCards: GameCard[] = [];
    pairs.slice(0, 10).forEach((pair, index) => {
      gameCards.push({
        id: `q-${index}`,
        text: pair.question,
        type: "question",
        pairId: index,
      });
      gameCards.push({
        id: `a-${index}`,
        text: pair.answer,
        type: "answer",
        pairId: index,
      });
    });
    setCards(shuffleArray(gameCards));
  }, [pairs]);

  useEffect(() => {
    if (flippedCards.length === 2) {
      const [first, second] = flippedCards;
      const firstCard = cards.find(c => c.id === first);
      const secondCard = cards.find(c => c.id === second);

      if (firstCard && secondCard && firstCard.pairId === secondCard.pairId) {
        // Match found
        setMatchedPairs(prev => new Set([...prev, firstCard.pairId]));
        setFlippedCards([]);
      } else {
        // No match
        setTimeout(() => {
          setFlippedCards([]);
        }, 1000);
      }
      setMoves(prev => prev + 1);
    }
  }, [flippedCards, cards]);

  const handleCardClick = (cardId: string) => {
    if (flippedCards.length >= 2) return;
    if (flippedCards.includes(cardId)) return;
    
    const card = cards.find(c => c.id === cardId);
    if (card && matchedPairs.has(card.pairId)) return;

    setFlippedCards(prev => [...prev, cardId]);
  };

  const handleFinish = () => {
    const timeTaken = Math.floor((Date.now() - startTime) / 1000);
    onComplete(matchedPairs.size, pairs.slice(0, 10).length, timeTaken);
  };

  const isFlipped = (cardId: string) => {
    const card = cards.find(c => c.id === cardId);
    return flippedCards.includes(cardId) || (card && matchedPairs.has(card.pairId));
  };

  const isMatched = (cardId: string) => {
    const card = cards.find(c => c.id === cardId);
    return card && matchedPairs.has(card.pairId);
  };

  const allMatched = matchedPairs.size === pairs.slice(0, 10).length;

  return (
    <Card className="game-card max-w-4xl mx-auto animate-slide-up">
      <CardContent className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className={`text-2xl font-fredoka ${colorClass}`}>Memory Flip</h2>
          <div className="text-sm text-muted-foreground">
            Matches: {matchedPairs.size}/{pairs.slice(0, 10).length} | Moves: {moves}
          </div>
        </div>

        <div className="grid grid-cols-4 sm:grid-cols-5 gap-2 sm:gap-3 mb-6">
          {cards.map(card => (
            <button
              key={card.id}
              onClick={() => handleCardClick(card.id)}
              disabled={isMatched(card.id)}
              className={`aspect-square rounded-lg p-2 text-xs sm:text-sm font-medium transition-all transform ${
                isFlipped(card.id)
                  ? isMatched(card.id)
                    ? "bg-success/20 text-success border-2 border-success"
                    : `${bgClass} text-background`
                  : "bg-muted hover:bg-muted-foreground/20"
              } ${isFlipped(card.id) ? "rotate-0" : "hover:scale-105"}`}
            >
              {isFlipped(card.id) ? (
                <span className="line-clamp-3">{card.text}</span>
              ) : (
                <span className="text-2xl">?</span>
              )}
            </button>
          ))}
        </div>

        <Button 
          onClick={handleFinish} 
          className={`w-full ${subjectColor === "yellow" ? "bg-gradient-primary" : "bg-gradient-secondary"}`}
          disabled={!allMatched && matchedPairs.size === 0}
        >
          {allMatched ? "Complete!" : `${matchedPairs.size} matches found - Finish`}
        </Button>
      </CardContent>
    </Card>
  );
}
