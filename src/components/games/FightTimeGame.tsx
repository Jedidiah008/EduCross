import { useState, useEffect, useCallback } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FightTimeQuestion } from "@/data/gameQuestions";
import { Clock, Check, X } from "lucide-react";

interface Props {
  questions: FightTimeQuestion[];
  onComplete: (score: number, maxScore: number, time: number) => void;
  subjectColor: "yellow" | "blue";
}

const TIME_OPTIONS = [60, 120, 180];

export default function FightTimeGame({ questions, onComplete, subjectColor }: Props) {
  const [selectedTime, setSelectedTime] = useState<number | null>(null);
  const [timeLeft, setTimeLeft] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswers, setUserAnswers] = useState<string[]>([]);
  const [currentInput, setCurrentInput] = useState("");
  const [allAnswers, setAllAnswers] = useState<Record<number, string[]>>({});
  const [submitted, setSubmitted] = useState(false);
  const [startTime, setStartTime] = useState(0);

  const colorClass = subjectColor === "yellow" ? "text-primary" : "text-secondary";
  const bgClass = subjectColor === "yellow" ? "bg-primary" : "bg-secondary";

  const handleTimeUp = useCallback(() => {
    setAllAnswers(prev => ({ ...prev, [currentQuestion]: userAnswers }));
    setSubmitted(true);
  }, [currentQuestion, userAnswers]);

  useEffect(() => {
    if (selectedTime && timeLeft > 0 && !submitted) {
      const timer = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            handleTimeUp();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [selectedTime, timeLeft, submitted, handleTimeUp]);

  const handleStartGame = (time: number) => {
    setSelectedTime(time);
    setTimeLeft(time);
    setStartTime(Date.now());
  };

  const handleAddAnswer = () => {
    if (!currentInput.trim()) return;
    
    const answer = currentInput.trim().toLowerCase();
    if (!userAnswers.includes(answer)) {
      setUserAnswers(prev => [...prev, answer]);
    }
    setCurrentInput("");
  };

  const handleNextQuestion = () => {
    setAllAnswers(prev => ({ ...prev, [currentQuestion]: userAnswers }));
    setUserAnswers([]);
    
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      handleTimeUp();
    }
  };

  

  const handleFinish = () => {
    let score = 0;
    let maxScore = 0;
    
    questions.forEach((q, index) => {
      const userAns = allAnswers[index] || [];
      maxScore += q.answers.length;
      
      q.answers.forEach(correctAnswer => {
        if (userAns.some(ua => correctAnswer.toLowerCase().includes(ua) || ua.includes(correctAnswer.toLowerCase()))) {
          score++;
        }
      });
    });
    
    const timeTaken = selectedTime ? selectedTime - timeLeft : 0;
    onComplete(score, maxScore, timeTaken);
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
            Fight the Time
          </h2>
          <p className="text-muted-foreground mb-6">
            List as many answers as you can for each question before time runs out!
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

  if (submitted) {
    return (
      <Card className="game-card max-w-3xl mx-auto animate-slide-up">
        <CardContent className="p-6">
          <h2 className={`text-2xl font-fredoka ${colorClass} mb-6 text-center`}>
            Results
          </h2>
          
          <div className="space-y-6 mb-6">
            {questions.map((q, index) => (
              <div key={index} className="p-4 bg-muted/50 rounded-xl">
                <p className="font-medium text-foreground mb-2">{q.question}</p>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Your answers:</p>
                    <div className="flex flex-wrap gap-1">
                      {(allAnswers[index] || []).map((ans, i) => (
                        <span key={i} className="px-2 py-1 bg-muted rounded text-xs">{ans}</span>
                      ))}
                      {(allAnswers[index] || []).length === 0 && (
                        <span className="text-xs text-muted-foreground italic">No answers</span>
                      )}
                    </div>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Correct answers:</p>
                    <div className="flex flex-wrap gap-1">
                      {q.answers.map((ans, i) => (
                        <span key={i} className="px-2 py-1 bg-success/20 text-success rounded text-xs">{ans}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <Button 
            onClick={handleFinish} 
            className={`w-full ${subjectColor === "yellow" ? "bg-gradient-primary" : "bg-gradient-secondary"}`}
          >
            See Final Score
          </Button>
        </CardContent>
      </Card>
    );
  }

  const currentQ = questions[currentQuestion];

  return (
    <Card className="game-card max-w-2xl mx-auto animate-slide-up">
      <CardContent className="p-6">
        {/* Timer */}
        <div className={`flex items-center justify-center gap-2 mb-4 ${timeLeft <= 10 ? "text-destructive animate-pulse" : colorClass}`}>
          <Clock className="w-6 h-6" />
          <span className="text-3xl font-fredoka">{formatTime(timeLeft)}</span>
        </div>

        {/* Progress */}
        <div className="text-center mb-4">
          <span className="text-sm text-muted-foreground">
            Question {currentQuestion + 1} of {questions.length}
          </span>
        </div>

        {/* Question */}
        <div className={`p-6 rounded-xl ${bgClass}/10 mb-6`}>
          <h3 className="text-xl font-fredoka text-foreground text-center">
            {currentQ.question}
          </h3>
        </div>

        {/* Input */}
        <div className="flex gap-2 mb-4">
          <Input
            value={currentInput}
            onChange={(e) => setCurrentInput(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleAddAnswer()}
            placeholder="Type an answer..."
            className="flex-1"
          />
          <Button onClick={handleAddAnswer} variant="outline">
            Add
          </Button>
        </div>

        {/* User answers */}
        <div className="min-h-20 p-4 bg-muted/50 rounded-xl mb-6">
          <p className="text-xs text-muted-foreground mb-2">Your answers ({userAnswers.length}):</p>
          <div className="flex flex-wrap gap-2">
            {userAnswers.map((ans, i) => (
              <span key={i} className={`px-3 py-1 rounded-full ${bgClass} text-background text-sm`}>
                {ans}
              </span>
            ))}
          </div>
        </div>

        <Button 
          onClick={handleNextQuestion} 
          className={`w-full ${subjectColor === "yellow" ? "bg-gradient-primary" : "bg-gradient-secondary"}`}
        >
          {currentQuestion < questions.length - 1 ? "Next Question" : "Finish"}
        </Button>
      </CardContent>
    </Card>
  );
}
