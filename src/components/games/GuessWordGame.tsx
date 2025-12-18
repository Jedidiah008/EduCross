import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { GuessWordQuestion } from "@/data/gameQuestions";
import { Check, X, RotateCcw } from "lucide-react";

interface Props {
  questions: GuessWordQuestion[];
  onComplete: (score: number, maxScore: number, time: number) => void;
  subjectColor: "yellow" | "blue";
}

function shuffleString(str: string): string[] {
  const letters = str.split("");
  for (let i = letters.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [letters[i], letters[j]] = [letters[j], letters[i]];
  }
  return letters;
}

export default function GuessWordGame({ questions, onComplete, subjectColor }: Props) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [shuffledLetters, setShuffledLetters] = useState<string[]>([]);
  const [selectedLetters, setSelectedLetters] = useState<number[]>([]);
  const [results, setResults] = useState<Record<number, boolean>>({});
  const [startTime] = useState(Date.now());

  const colorClass = subjectColor === "yellow" ? "text-primary" : "text-secondary";
  const bgClass = subjectColor === "yellow" ? "bg-primary" : "bg-secondary";

  const currentQ = questions[currentQuestion];

  useEffect(() => {
    if (currentQ) {
      setShuffledLetters(shuffleString(currentQ.answer.toUpperCase()));
      setSelectedLetters([]);
    }
  }, [currentQuestion, currentQ]);

  const handleLetterClick = (index: number) => {
    if (selectedLetters.includes(index)) {
      // Deselect
      setSelectedLetters(prev => prev.filter(i => i !== index));
    } else {
      // Select
      setSelectedLetters(prev => [...prev, index]);
    }
  };

  const getCurrentWord = () => {
    return selectedLetters.map(i => shuffledLetters[i]).join("");
  };

  const handleSubmit = () => {
    const word = getCurrentWord();
    const isCorrect = word === currentQ.answer.toUpperCase();
    
    setResults(prev => ({ ...prev, [currentQuestion]: isCorrect }));
    
    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(prev => prev + 1);
      } else {
        handleFinish();
      }
    }, 1000);
  };

  const handleReset = () => {
    setShuffledLetters(shuffleString(currentQ.answer.toUpperCase()));
    setSelectedLetters([]);
  };

  const handleFinish = () => {
    const score = Object.values(results).filter(Boolean).length + (getCurrentWord() === currentQ?.answer.toUpperCase() ? 1 : 0);
    const timeTaken = Math.floor((Date.now() - startTime) / 1000);
    onComplete(score, questions.length, timeTaken);
  };

  const word = getCurrentWord();
  const isComplete = word.length === currentQ?.answer.length;
  const justSubmitted = results[currentQuestion] !== undefined;

  return (
    <Card className="game-card max-w-2xl mx-auto animate-slide-up">
      <CardContent className="p-6">
        {/* Progress */}
        <div className="flex justify-between items-center mb-6">
          <h2 className={`text-xl font-fredoka ${colorClass}`}>Guess the Word</h2>
          <span className="text-sm text-muted-foreground">
            {currentQuestion + 1} / {questions.length}
          </span>
        </div>

        {/* Question */}
        <div className={`p-6 rounded-xl ${bgClass}/10 mb-6`}>
          <p className="text-lg text-center text-foreground">
            {currentQ?.question}
          </p>
        </div>

        {/* Answer display */}
        <div className="flex justify-center gap-1 mb-6">
          {currentQ?.answer.split("").map((_, i) => (
            <div
              key={i}
              className={`w-10 h-12 rounded-lg border-2 flex items-center justify-center font-mono font-bold text-xl ${
                justSubmitted
                  ? results[currentQuestion]
                    ? "border-success bg-success/10 text-success"
                    : "border-destructive bg-destructive/10 text-destructive"
                  : selectedLetters[i] !== undefined
                  ? `${bgClass} text-background border-transparent`
                  : "border-muted bg-muted/50"
              }`}
            >
              {selectedLetters[i] !== undefined ? shuffledLetters[selectedLetters[i]] : ""}
            </div>
          ))}
        </div>

        {/* Result feedback */}
        {justSubmitted && (
          <div className={`text-center mb-4 ${results[currentQuestion] ? "text-success" : "text-destructive"}`}>
            {results[currentQuestion] ? (
              <div className="flex items-center justify-center gap-2">
                <Check className="w-5 h-5" />
                <span>Correct!</span>
              </div>
            ) : (
              <div className="flex items-center justify-center gap-2">
                <X className="w-5 h-5" />
                <span>Answer: {currentQ?.answer}</span>
              </div>
            )}
          </div>
        )}

        {/* Scrambled letters */}
        {!justSubmitted && (
          <div className="flex flex-wrap justify-center gap-2 mb-6">
            {shuffledLetters.map((letter, index) => (
              <button
                key={index}
                onClick={() => handleLetterClick(index)}
                disabled={selectedLetters.includes(index)}
                className={`w-12 h-12 rounded-lg font-mono font-bold text-xl transition-all ${
                  selectedLetters.includes(index)
                    ? "bg-muted/30 text-muted-foreground opacity-50"
                    : `bg-muted hover:${bgClass} hover:text-background`
                }`}
              >
                {letter}
              </button>
            ))}
          </div>
        )}

        {/* Actions */}
        {!justSubmitted && (
          <div className="flex gap-3">
            <Button variant="outline" onClick={handleReset} className="flex-1">
              <RotateCcw className="w-4 h-4 mr-2" />
              Reset
            </Button>
            <Button 
              onClick={handleSubmit} 
              className={`flex-1 ${subjectColor === "yellow" ? "bg-gradient-primary" : "bg-gradient-secondary"}`}
              disabled={!isComplete}
            >
              Submit
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
