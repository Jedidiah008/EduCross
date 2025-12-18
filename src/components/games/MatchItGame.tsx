import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MatchQuestion } from "@/data/gameQuestions";
import { Check, X } from "lucide-react";

interface Props {
  questions: MatchQuestion[];
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

export default function MatchItGame({ questions, onComplete, subjectColor }: Props) {
  const [shuffledAnswers] = useState(() => shuffleArray(questions.map(q => q.answer)));
  const [selectedQuestion, setSelectedQuestion] = useState<number | null>(null);
  const [matches, setMatches] = useState<Record<number, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [results, setResults] = useState<Record<number, boolean>>({});
  const [startTime] = useState(Date.now());

  const colorClass = subjectColor === "yellow" ? "text-primary" : "text-secondary";
  const bgClass = subjectColor === "yellow" ? "bg-primary" : "bg-secondary";

  const handleQuestionClick = (index: number) => {
    if (submitted || matches[index]) return;
    setSelectedQuestion(index);
  };

  const handleAnswerClick = (answer: string) => {
    if (submitted || selectedQuestion === null) return;
    
    setMatches(prev => ({ ...prev, [selectedQuestion]: answer }));
    setSelectedQuestion(null);
  };

  const handleRemoveMatch = (index: number) => {
    if (submitted) return;
    setMatches(prev => {
      const newMatches = { ...prev };
      delete newMatches[index];
      return newMatches;
    });
  };

  const handleSubmit = () => {
    const newResults: Record<number, boolean> = {};
    
    questions.forEach((q, index) => {
      newResults[index] = matches[index] === q.answer;
    });
    
    setResults(newResults);
    setSubmitted(true);
  };

  const handleFinish = () => {
    const score = Object.values(results).filter(Boolean).length;
    const timeTaken = Math.floor((Date.now() - startTime) / 1000);
    onComplete(score, questions.length, timeTaken);
  };

  const usedAnswers = new Set(Object.values(matches));

  return (
    <Card className="game-card max-w-4xl mx-auto animate-slide-up">
      <CardContent className="p-6">
        <h2 className={`text-2xl font-fredoka ${colorClass} mb-2 text-center`}>
          Match It
        </h2>
        <p className="text-muted-foreground text-center mb-6">
          Click a question, then click the matching answer
        </p>

        <div className="grid md:grid-cols-2 gap-6 mb-6">
          {/* Questions */}
          <div className="space-y-2">
            <h3 className="text-sm font-semibold text-muted-foreground mb-3">Questions</h3>
            {questions.map((q, index) => (
              <button
                key={index}
                onClick={() => handleQuestionClick(index)}
                className={`w-full text-left p-3 rounded-lg transition-all ${
                  submitted
                    ? results[index]
                      ? "bg-success/20 border-2 border-success"
                      : "bg-destructive/20 border-2 border-destructive"
                    : selectedQuestion === index
                    ? `${bgClass} text-background`
                    : matches[index]
                    ? "bg-muted/50 opacity-60"
                    : "bg-muted hover:bg-muted-foreground/20"
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className={`w-6 h-6 rounded-full ${bgClass} text-background text-xs flex items-center justify-center font-bold`}>
                    {index + 1}
                  </span>
                  <span className="flex-1 text-sm">{q.question}</span>
                  {submitted && (
                    results[index] ? (
                      <Check className="w-4 h-4 text-success" />
                    ) : (
                      <X className="w-4 h-4 text-destructive" />
                    )
                  )}
                </div>
                {matches[index] && (
                  <div className="mt-2 ml-8 text-xs text-muted-foreground flex items-center gap-1">
                    → {matches[index]}
                    {!submitted && (
                      <button 
                        onClick={(e) => { e.stopPropagation(); handleRemoveMatch(index); }}
                        className="ml-1 text-destructive hover:text-destructive/80"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    )}
                  </div>
                )}
              </button>
            ))}
          </div>

          {/* Answers */}
          <div className="space-y-2">
            <h3 className="text-sm font-semibold text-muted-foreground mb-3">Answers</h3>
            {shuffledAnswers.map((answer, index) => (
              <button
                key={index}
                onClick={() => handleAnswerClick(answer)}
                disabled={usedAnswers.has(answer) || selectedQuestion === null}
                className={`w-full text-left p-3 rounded-lg transition-all ${
                  usedAnswers.has(answer)
                    ? "bg-muted/50 opacity-60"
                    : selectedQuestion !== null
                    ? `bg-muted hover:${bgClass} hover:text-background`
                    : "bg-muted opacity-50"
                }`}
              >
                <span className="text-sm">{answer}</span>
              </button>
            ))}
          </div>
        </div>

        {!submitted ? (
          <Button 
            onClick={handleSubmit} 
            className={`w-full ${subjectColor === "yellow" ? "bg-gradient-primary" : "bg-gradient-secondary"}`}
            disabled={Object.keys(matches).length !== questions.length}
          >
            {Object.keys(matches).length !== questions.length 
              ? `Match ${questions.length - Object.keys(matches).length} more` 
              : "Check Answers"}
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
