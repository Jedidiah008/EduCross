import { useState, useEffect, useCallback } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FillBlankQuestion } from "@/data/gameQuestions";
import { Clock, Check, X } from "lucide-react";

interface Props {
  questions: FillBlankQuestion[];
  onComplete: (score: number, maxScore: number, time: number) => void;
  subjectColor: "yellow" | "blue";
}

const TIME_OPTIONS = [60, 120, 180];

export default function FillBlanksGame({ questions, onComplete, subjectColor }: Props) {
  const [selectedTime, setSelectedTime] = useState<number | null>(null);
  const [timeLeft, setTimeLeft] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [results, setResults] = useState<Record<number, boolean>>({});
  const [startTime, setStartTime] = useState(0);

  const colorClass = subjectColor === "yellow" ? "text-primary" : "text-secondary";
  const bgClass = subjectColor === "yellow" ? "bg-primary" : "bg-secondary";

  const handleSubmit = useCallback(() => {
    const newResults: Record<number, boolean> = {};
    
    questions.forEach((q, index) => {
      const userAnswer = (answers[index] || "").toLowerCase().trim();
      const isCorrect = userAnswer === q.answer.toLowerCase();
      newResults[index] = isCorrect;
    });
    
    setResults(newResults);
    setSubmitted(true);
  }, [questions, answers]);

  useEffect(() => {
    if (selectedTime && timeLeft > 0 && !submitted) {
      const timer = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            handleSubmit();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [selectedTime, timeLeft, submitted, handleSubmit]);

  const handleStartGame = (time: number) => {
    setSelectedTime(time);
    setTimeLeft(time);
    setStartTime(Date.now());
  };

  

  const handleFinish = () => {
    const score = Object.values(results).filter(Boolean).length;
    const timeTaken = selectedTime ? selectedTime - timeLeft : 0;
    onComplete(score, questions.length, timeTaken);
  };

  const handleRestart = () => {
    setSelectedTime(null);
    setTimeLeft(0);
    setAnswers({});
    setSubmitted(false);
    setResults({});
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  if (!selectedTime) {
    return (
      <Card className="game-card max-w-md mx-auto animate-slide-up">
        <CardContent className="p-6 text-center">
          <Clock className={`w-16 h-16 mx-auto mb-4 ${colorClass}`} />
          <h2 className={`text-2xl font-fredoka ${colorClass} mb-2`}>
            Fill in the Blanks
          </h2>
          <p className="text-muted-foreground mb-6">
            Choose your time limit. Complete all {questions.length} questions before time runs out!
          </p>
          <div className="flex flex-col gap-3">
            {TIME_OPTIONS.map(time => (
              <Button
                key={time}
                onClick={() => handleStartGame(time)}
                className={`${subjectColor === "yellow" ? "bg-gradient-primary" : "bg-gradient-secondary"}`}
              >
                {time === 60 ? "1 Minute (Hard)" : time === 120 ? "2 Minutes (Medium)" : "3 Minutes (Easy)"}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="game-card max-w-3xl mx-auto animate-slide-up">
      <CardContent className="p-6">
        {/* Timer */}
        <div className={`flex items-center justify-center gap-2 mb-6 ${timeLeft <= 10 ? "text-destructive animate-pulse" : colorClass}`}>
          <Clock className="w-6 h-6" />
          <span className="text-3xl font-fredoka">{formatTime(timeLeft)}</span>
        </div>

        <div className="space-y-4 mb-6">
          {questions.map((q, index) => {
            const parts = q.sentence.split("___");
            return (
              <div key={index} className="flex items-center gap-2 flex-wrap">
                <span className={`w-6 h-6 rounded-full ${bgClass} text-background text-xs flex items-center justify-center font-bold`}>
                  {index + 1}
                </span>
                <span className="text-foreground">{parts[0]}</span>
                <div className="inline-flex items-center gap-1">
                  <Input
                    value={answers[index] || ""}
                    onChange={(e) => setAnswers({ ...answers, [index]: e.target.value })}
                    disabled={submitted}
                    className={`w-32 inline-block ${
                      submitted
                        ? results[index]
                          ? "border-success bg-success/10"
                          : "border-destructive bg-destructive/10"
                        : ""
                    }`}
                    placeholder="..."
                  />
                  {submitted && (
                    results[index] ? (
                      <Check className="w-5 h-5 text-success" />
                    ) : (
                      <span className="text-sm text-destructive">{q.answer}</span>
                    )
                  )}
                </div>
                {parts[1] && <span className="text-foreground">{parts[1]}</span>}
              </div>
            );
          })}
        </div>

        <div className="flex gap-3">
          <Button variant="outline" onClick={handleRestart} className="flex-1">
            Restart
          </Button>
          {!submitted ? (
            <Button 
              onClick={handleSubmit} 
              className={`flex-1 ${subjectColor === "yellow" ? "bg-gradient-primary" : "bg-gradient-secondary"}`}
            >
              Submit
            </Button>
          ) : (
            <Button 
              onClick={handleFinish} 
              className={`flex-1 ${subjectColor === "yellow" ? "bg-gradient-primary" : "bg-gradient-secondary"}`}
            >
              See Results
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
