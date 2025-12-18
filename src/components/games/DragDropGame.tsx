import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DragDropQuestion } from "@/data/gameQuestions";

interface Props {
  data: DragDropQuestion;
  onComplete: (score: number, maxScore: number, time: number) => void;
  subjectColor: "yellow" | "blue";
}

export default function DragDropGame({ data, onComplete, subjectColor }: Props) {
  const [placements, setPlacements] = useState<Record<string, string>>({});
  const [availableItems, setAvailableItems] = useState(data.items.map(i => i.text));
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [startTime] = useState(Date.now());
  const [submitted, setSubmitted] = useState(false);
  const [results, setResults] = useState<Record<string, boolean>>({});

  const colorClass = subjectColor === "yellow" ? "text-primary" : "text-secondary";
  const bgClass = subjectColor === "yellow" ? "bg-primary" : "bg-secondary";

  const handleDragStart = (item: string) => {
    setDraggedItem(item);
  };

  const handleDrop = (category: string) => {
    if (!draggedItem) return;
    
    setPlacements(prev => ({ ...prev, [draggedItem]: category }));
    setAvailableItems(prev => prev.filter(i => i !== draggedItem));
    setDraggedItem(null);
  };

  const handleRemove = (item: string) => {
    if (submitted) return;
    setPlacements(prev => {
      const newPlacements = { ...prev };
      delete newPlacements[item];
      return newPlacements;
    });
    setAvailableItems(prev => [...prev, item]);
  };

  const handleSubmit = () => {
    const newResults: Record<string, boolean> = {};
    
    data.items.forEach(item => {
      const placement = placements[item.text];
      newResults[item.text] = placement === item.category;
    });
    
    setResults(newResults);
    setSubmitted(true);
  };

  const handleFinish = () => {
    const score = Object.values(results).filter(Boolean).length;
    const timeTaken = Math.floor((Date.now() - startTime) / 1000);
    onComplete(score, data.items.length, timeTaken);
  };

  const getItemsInCategory = (category: string) => {
    return Object.entries(placements)
      .filter(([_, cat]) => cat === category)
      .map(([item]) => item);
  };

  return (
    <Card className="game-card max-w-4xl mx-auto animate-slide-up">
      <CardContent className="p-6">
        <h2 className={`text-2xl font-fredoka ${colorClass} mb-2 text-center`}>
          Drag and Drop
        </h2>
        <p className="text-muted-foreground text-center mb-6">
          Drag items to their correct categories
        </p>

        {/* Categories */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {data.categories.map(category => (
            <div
              key={category}
              onDragOver={(e) => e.preventDefault()}
              onDrop={() => handleDrop(category)}
              className={`min-h-40 p-4 rounded-xl border-2 border-dashed transition-all ${
                draggedItem ? "border-primary bg-primary/5" : "border-border"
              }`}
            >
              <h3 className={`font-fredoka ${colorClass} mb-3 text-center`}>{category}</h3>
              <div className="space-y-2">
                {getItemsInCategory(category).map(item => (
                  <div
                    key={item}
                    onClick={() => handleRemove(item)}
                    className={`p-2 rounded-lg text-sm text-center cursor-pointer transition-all ${
                      submitted
                        ? results[item]
                          ? "bg-success/20 border-success text-success"
                          : "bg-destructive/20 border-destructive text-destructive"
                        : `${bgClass}/20 hover:opacity-80`
                    }`}
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Available items */}
        {availableItems.length > 0 && (
          <div className="mb-6">
            <h4 className="text-sm text-muted-foreground mb-3 text-center">Available Items</h4>
            <div className="flex flex-wrap gap-2 justify-center">
              {availableItems.map(item => (
                <div
                  key={item}
                  draggable
                  onDragStart={() => handleDragStart(item)}
                  className={`px-4 py-2 rounded-lg cursor-grab active:cursor-grabbing ${bgClass} text-background text-sm font-medium transition-transform hover:scale-105`}
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        )}

        {!submitted ? (
          <Button 
            onClick={handleSubmit} 
            className={`w-full ${subjectColor === "yellow" ? "bg-gradient-primary" : "bg-gradient-secondary"}`}
            disabled={availableItems.length > 0}
          >
            {availableItems.length > 0 ? `Place ${availableItems.length} more items` : "Check Answers"}
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
