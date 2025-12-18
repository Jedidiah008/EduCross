import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { JigsawPiece } from "@/data/gameQuestions";

interface Props {
  pieces: JigsawPiece[];
  onComplete: (score: number, maxScore: number, time: number) => void;
  subjectColor: "yellow" | "blue";
}

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export default function JigsawGame({ pieces, onComplete, subjectColor }: Props) {
  const [shuffledPieces, setShuffledPieces] = useState<JigsawPiece[]>([]);
  const [arrangement, setArrangement] = useState<JigsawPiece[]>([]);
  const [startTime] = useState(Date.now());
  const [isCorrect, setIsCorrect] = useState(false);

  const colorClass = subjectColor === "yellow" ? "text-primary" : "text-secondary";
  const bgClass = subjectColor === "yellow" ? "bg-primary" : "bg-secondary";

  useEffect(() => {
    setShuffledPieces(shuffleArray(pieces));
  }, [pieces]);

  const handlePieceClick = (piece: JigsawPiece) => {
    if (arrangement.find(p => p.id === piece.id)) {
      // Remove from arrangement
      setArrangement(prev => prev.filter(p => p.id !== piece.id));
      setShuffledPieces(prev => [...prev, piece]);
    } else {
      // Add to arrangement
      setArrangement(prev => [...prev, piece]);
      setShuffledPieces(prev => prev.filter(p => p.id !== piece.id));
    }
  };

  const handleCheck = () => {
    const correct = arrangement.every((piece, index) => piece.order === index + 1);
    setIsCorrect(correct);
  };

  const handleFinish = () => {
    const score = isCorrect ? pieces.length : 0;
    const timeTaken = Math.floor((Date.now() - startTime) / 1000);
    onComplete(score, pieces.length, timeTaken);
  };

  const handleReset = () => {
    setShuffledPieces(shuffleArray(pieces));
    setArrangement([]);
    setIsCorrect(false);
  };

  return (
    <Card className="game-card max-w-3xl mx-auto animate-slide-up">
      <CardContent className="p-6">
        <h2 className={`text-2xl font-fredoka ${colorClass} mb-2 text-center`}>
          Jigsaw Puzzle
        </h2>
        <p className="text-muted-foreground text-center mb-6">
          Arrange the pieces to form a complete statement
        </p>

        {/* Arrangement area */}
        <div className={`min-h-20 p-4 rounded-xl border-2 border-dashed mb-6 ${
          isCorrect ? "border-success bg-success/10" : "border-border"
        }`}>
          <p className="text-xs text-muted-foreground mb-2">Your arrangement:</p>
          <div className="flex flex-wrap gap-2">
            {arrangement.length === 0 ? (
              <span className="text-muted-foreground text-sm italic">Click pieces below to add them</span>
            ) : (
              arrangement.map((piece, index) => (
                <button
                  key={piece.id}
                  onClick={() => handlePieceClick(piece)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all hover:opacity-80 ${
                    isCorrect ? "bg-success text-success-foreground" : `${bgClass} text-background`
                  }`}
                >
                  {piece.text}
                </button>
              ))
            )}
          </div>
        </div>

        {/* Available pieces */}
        {shuffledPieces.length > 0 && (
          <div className="mb-6">
            <p className="text-xs text-muted-foreground mb-2">Available pieces:</p>
            <div className="flex flex-wrap gap-2">
              {shuffledPieces.map(piece => (
                <button
                  key={piece.id}
                  onClick={() => handlePieceClick(piece)}
                  className="px-4 py-2 rounded-lg bg-muted text-foreground text-sm font-medium transition-all hover:bg-muted-foreground/20"
                >
                  {piece.text}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="flex gap-3">
          <Button variant="outline" onClick={handleReset} className="flex-1">
            Reset
          </Button>
          {!isCorrect ? (
            <Button 
              onClick={handleCheck} 
              className={`flex-1 ${subjectColor === "yellow" ? "bg-gradient-primary" : "bg-gradient-secondary"}`}
              disabled={arrangement.length !== pieces.length}
            >
              Check
            </Button>
          ) : (
            <Button 
              onClick={handleFinish} 
              className={`flex-1 ${subjectColor === "yellow" ? "bg-gradient-primary" : "bg-gradient-secondary"}`}
            >
              Complete!
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
