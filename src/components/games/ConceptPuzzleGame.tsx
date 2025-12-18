import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ConceptPuzzleQuestion } from "@/data/gameQuestions";
import { Lightbulb, Check, X } from "lucide-react";

interface Props {
  questions: ConceptPuzzleQuestion[];
  onComplete: (score: number, maxScore: number, time: number) => void;
  subjectColor: "yellow" | "blue";
}

export default function ConceptPuzzleGame({ questions, onComplete, subjectColor }: Props) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answer, setAnswer] = useState("");
  const [hintsUsed, setHintsUsed] = useState(0);
  const [showHints, setShowHints] = useState<number[]>([]);
  const [results, setResults] = useState<Record<number, { correct: boolean; hints: number }>>({});
  const [feedback, setFeedback] = useState<"correct" | "wrong" | null>(null);
  const [startTime] = useState(Date.now());

  const colorClass = subjectColor === "yellow" ? "text-primary" : "text-secondary";
  const bgClass = subjectColor === "yellow" ? "bg-primary" : "bg-secondary";

  const currentQ = questions[currentQuestion];

  const handleShowHint = () => {
    if (showHints.length < currentQ.hints.length) {
      setShowHints(prev => [...prev, prev.length]);
      setHintsUsed(prev => prev + 1);
    }
  };

  const handleSubmit = () => {
    const isCorrect = answer.toLowerCase().trim() === currentQ.answer.toLowerCase();
    
    setResults(prev => ({
      ...prev,
      [currentQuestion]: { correct: isCorrect, hints: showHints.length }
    }));
    
    setFeedback(isCorrect ? "correct" : "wrong");
    
    if (!isCorrect && showHints.length < currentQ.hints.length) {
      // Show another hint on wrong answer
      setShowHints(prev => [...prev, prev.length]);
      setHintsUsed(prev => prev + 1);
      setFeedback(null);
      setAnswer("");
    } else {
      // Move to next question
      setTimeout(() => {
        if (currentQuestion < questions.length - 1) {
          setCurrentQuestion(prev => prev + 1);
          setAnswer("");
          setShowHints([]);
          setFeedback(null);
        } else {
          handleFinish();
        }
      }, 1500);
    }
  };

  const handleFinish = () => {
    // Calculate score: full points for no hints, reduced for hints used
    let score = 0;
    Object.values(results).forEach(r => {
      if (r.correct) {
        score += Math.max(1, 3 - r.hints); // 3 points max, -1 per hint
      }
    });
    
    // Add current question if answered correctly
    const currentCorrect = answer.toLowerCase().trim() === currentQ.answer.toLowerCase();
    if (currentCorrect) {
      score += Math.max(1, 3 - showHints.length);
    }
    
    const maxScore = questions.length * 3;
    const timeTaken = Math.floor((Date.now() - startTime) / 1000);
    onComplete(score, maxScore, timeTaken);
  };

  return (
    <Card className="game-card max-w-2xl mx-auto animate-slide-up">
      <CardContent className="p-6">
        {/* Progress */}
        <div className="flex justify-between items-center mb-6">
          <h2 className={`text-xl font-fredoka ${colorClass}`}>Concept Puzzle</h2>
          <span className="text-sm text-muted-foreground">
            {currentQuestion + 1} / {questions.length}
          </span>
        </div>

        {/* Question */}
        <div className={`p-6 rounded-xl ${bgClass}/10 mb-6`}>
          <p className="text-lg text-center text-foreground font-medium">
            {currentQ.question}
          </p>
        </div>

        {/* Hints */}
        {showHints.length > 0 && (
          <div className="space-y-2 mb-6">
            <p className="text-sm text-muted-foreground flex items-center gap-1">
              <Lightbulb className="w-4 h-4" />
              Hints:
            </p>
            {showHints.map(index => (
              <div key={index} className="p-3 bg-amber-500/10 border border-amber-500/30 rounded-lg text-sm">
                {currentQ.hints[index]}
              </div>
            ))}
          </div>
        )}

        {/* Feedback */}
        {feedback && (
          <div className={`flex items-center justify-center gap-2 mb-4 ${feedback === "correct" ? "text-success" : "text-destructive"}`}>
            {feedback === "correct" ? (
              <>
                <Check className="w-5 h-5" />
                <span>Correct! +{Math.max(1, 3 - showHints.length)} points</span>
              </>
            ) : (
              <>
                <X className="w-5 h-5" />
                <span>Try again! Here's a hint...</span>
              </>
            )}
          </div>
        )}

        {/* Answer input */}
        {!feedback && (
          <>
            <div className="flex gap-2 mb-4">
              <Input
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && answer.trim() && handleSubmit()}
                placeholder="Type your answer..."
                className="flex-1"
              />
            </div>

            <div className="flex gap-3">
              <Button 
                variant="outline" 
                onClick={handleShowHint}
                disabled={showHints.length >= currentQ.hints.length}
                className="flex-1"
              >
                <Lightbulb className="w-4 h-4 mr-2" />
                Get Hint ({currentQ.hints.length - showHints.length} left)
              </Button>
              <Button 
                onClick={handleSubmit} 
                className={`flex-1 ${subjectColor === "yellow" ? "bg-gradient-primary" : "bg-gradient-secondary"}`}
                disabled={!answer.trim()}
              >
                Submit
              </Button>
            </div>
          </>
        )}

        {/* Points info */}
        <p className="text-xs text-center text-muted-foreground mt-4">
          Max 3 points per question. -1 point for each hint used.
        </p>
      </CardContent>
    </Card>
  );
}
