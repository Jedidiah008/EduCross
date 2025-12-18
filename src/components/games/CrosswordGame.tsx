import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CrosswordQuestion } from "@/data/gameQuestions";
import { Check } from "lucide-react";

interface Props {
  questions: CrosswordQuestion[];
  onComplete: (score: number, maxScore: number, time: number) => void;
  subjectColor: "yellow" | "blue";
}

export default function CrosswordGame({ questions, onComplete, subjectColor }: Props) {
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [startTime] = useState(Date.now());
  const [submitted, setSubmitted] = useState(false);
  const [results, setResults] = useState<Record<number, boolean>>({});

  const colorClass = subjectColor === "yellow" ? "text-primary" : "text-secondary";
  const bgClass = subjectColor === "yellow" ? "bg-primary" : "bg-secondary";

  const handleSubmit = () => {
    const newResults: Record<number, boolean> = {};
    let score = 0;
    
    questions.forEach((q, index) => {
      const isCorrect = (answers[index] || "").toLowerCase().trim() === q.word.toLowerCase();
      newResults[index] = isCorrect;
      if (isCorrect) score++;
    });
    
    setResults(newResults);
    setSubmitted(true);
  };

  const handleFinish = () => {
    const score = Object.values(results).filter(Boolean).length;
    const timeTaken = Math.floor((Date.now() - startTime) / 1000);
    onComplete(score, questions.length, timeTaken);
  };

  return (
    <Card className="game-card max-w-3xl mx-auto animate-slide-up">
      <CardContent className="p-6">
        <h2 className={`text-2xl font-fredoka ${colorClass} mb-6 text-center`}>
          Crossword Puzzle
        </h2>
        <p className="text-muted-foreground text-center mb-6">
          Answer the clues to fill in the crossword
        </p>

        <div className="space-y-4 mb-6">
          {questions.map((q, index) => (
            <div key={index} className="flex items-center gap-4">
              <div className={`w-8 h-8 rounded-full ${bgClass} text-background flex items-center justify-center font-bold`}>
                {index + 1}
              </div>
              <div className="flex-1">
                <p className="text-sm text-muted-foreground mb-1">
                  {q.direction === "across" ? "→" : "↓"} {q.clue}
                </p>
                <div className="flex items-center gap-2">
                  <Input
                    value={answers[index] || ""}
                    onChange={(e) => setAnswers({ ...answers, [index]: e.target.value.toUpperCase() })}
                    placeholder={`${q.word.length} letters`}
                    maxLength={q.word.length}
                    disabled={submitted}
                    className={`uppercase font-mono ${
                      submitted
                        ? results[index]
                          ? "border-success bg-success/10"
                          : "border-destructive bg-destructive/10"
                        : ""
                    }`}
                  />
                  {submitted && (
                    <span className={`text-sm font-medium ${results[index] ? "text-success" : "text-destructive"}`}>
                      {results[index] ? <Check className="w-5 h-5" /> : q.word}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {!submitted ? (
          <Button 
            onClick={handleSubmit} 
            className={`w-full ${subjectColor === "yellow" ? "bg-gradient-primary" : "bg-gradient-secondary"}`}
          >
            Check Answers
          </Button>
        ) : (
          <Button 
            onClick={handleFinish} 
            className={`w-full ${subjectColor === "yellow" ? "bg-gradient-primary" : "bg-gradient-secondary"}`}
          >
            See Results
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
