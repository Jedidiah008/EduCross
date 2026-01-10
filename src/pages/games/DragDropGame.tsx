import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { GameHeader } from '@/components/GameHeader';
import { GameResult } from '@/components/GameResult';
import { Button } from '@/components/ui/button';
import { useGameQuestions } from '@/hooks/useGameQuestions';
import { Check, X } from 'lucide-react';

interface DragDropGameProps {
  subjectId: string;
  unitId: string;
}

interface DragItem {
  id: string;
  text: string;
  category: string;
}

export default function DragDropGame({ subjectId, unitId }: DragDropGameProps) {
  const { dragdrop } = useGameQuestions(subjectId, unitId);
  const [items, setItems] = useState<DragItem[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [categoryItems, setCategoryItems] = useState<Record<string, DragItem[]>>({});
  const [draggingItem, setDraggingItem] = useState<DragItem | null>(null);
  const [gameComplete, setGameComplete] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);

  useEffect(() => {
    if (gameStarted && dragdrop && dragdrop.categories && dragdrop.categories.length > 0) {
      const question = dragdrop;
      setCategories(question.categories);
      setItems(question.items.map((item, i) => ({
        id: `item-${i}`,
        text: item.text,
        category: item.category
      })).sort(() => Math.random() - 0.5));
      
      const initial: Record<string, DragItem[]> = {};
      question.categories.forEach(cat => {
        initial[cat] = [];
      });
      setCategoryItems(initial);
    }
  }, [gameStarted, dragdrop]);

  const handleDragStart = (item: DragItem) => {
    setDraggingItem(item);
  };

  const handleDrop = (category: string) => {
    if (draggingItem) {
      // Remove from items pool
      setItems(prev => prev.filter(i => i.id !== draggingItem.id));
      
      // Remove from any other category
      setCategoryItems(prev => {
        const updated = { ...prev };
        Object.keys(updated).forEach(cat => {
          updated[cat] = updated[cat].filter(i => i.id !== draggingItem.id);
        });
        updated[category] = [...updated[category], draggingItem];
        return updated;
      });
      
      setDraggingItem(null);
    }
  };

  const handleRemoveFromCategory = (item: DragItem, category: string) => {
    setCategoryItems(prev => ({
      ...prev,
      [category]: prev[category].filter(i => i.id !== item.id)
    }));
    setItems(prev => [...prev, item]);
  };

  const checkAnswers = () => {
    setShowResults(true);
    
    const allPlaced = items.length === 0;
    if (allPlaced) {
      setTimeout(() => setGameComplete(true), 2000);
    }
  };

  const getScore = () => {
    let correct = 0;
    let total = 0;
    
    Object.entries(categoryItems).forEach(([category, catItems]) => {
      catItems.forEach(item => {
        total++;
        if (item.category === category) {
          correct++;
        }
      });
    });
    
    return { correct, total };
  };

  const isItemCorrect = (item: DragItem, category: string) => {
    return item.category === category;
  };

  if (gameComplete) {
    const { correct, total } = getScore();
    return (
      <GameResult
        score={correct}
        maxScore={total}
        gameName="Drag and Drop"
        subjectId={subjectId}
        unitId={unitId}
        onRetry={() => {
          setGameComplete(false);
          setShowResults(false);
          setGameStarted(false);
        }}
      />
    );
  }

  if (!gameStarted || !dragdrop || !dragdrop.categories || dragdrop.categories.length === 0) {
    return (
      <div className="min-h-screen flex flex-col">
        <GameHeader title="Drag and Drop" subjectId={subjectId} unitId={unitId} />
        <div className="flex-1 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-md"
          >
            <div className="text-6xl mb-4">🎯</div>
            <h2 className="font-display text-2xl font-bold mb-4">How to Play</h2>
            <p className="text-muted-foreground mb-6">
              Drag items from the left side into the correct category boxes on the right.
              Categories turn red if they contain wrong answers.
            </p>
            {!dragdrop || dragdrop.categories.length === 0 ? (
              <p className="text-game-red">No category questions available for this unit.</p>
            ) : (
              <Button size="lg" onClick={() => setGameStarted(true)}>
                Start Game
              </Button>
            )}
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <GameHeader title="Drag and Drop" subjectId={subjectId} unitId={unitId} />

      <div className="flex-1 flex flex-col lg:flex-row p-4 gap-6">
        {/* Items Pool */}
        <div className="lg:w-1/3 bg-card p-4 rounded-xl border-2 border-border">
          <h3 className="font-display text-lg font-bold mb-4">Items to Sort</h3>
          <div className="space-y-2">
            {items.map(item => (
              <motion.div
                key={item.id}
                draggable
                onDragStart={() => handleDragStart(item)}
                className="p-3 bg-primary/20 border-2 border-primary rounded-lg cursor-grab active:cursor-grabbing font-medium"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {item.text}
              </motion.div>
            ))}
            {items.length === 0 && !showResults && (
              <p className="text-muted-foreground text-center py-4">All items placed!</p>
            )}
          </div>
        </div>

        {/* Categories */}
        <div className="lg:w-2/3 grid gap-4" style={{ gridTemplateColumns: `repeat(${Math.min(categories.length, 3)}, 1fr)` }}>
          {categories.map(category => {
            const catItems = categoryItems[category] || [];
            const hasWrong = showResults && catItems.some(item => !isItemCorrect(item, category));
            const allCorrect = showResults && catItems.length > 0 && catItems.every(item => isItemCorrect(item, category));
            
            return (
              <div
                key={category}
                onDragOver={(e) => e.preventDefault()}
                onDrop={() => handleDrop(category)}
                className={`p-4 rounded-xl border-2 min-h-[200px] transition-colors
                  ${hasWrong ? 'border-game-red bg-game-red/10' : 
                    allCorrect ? 'border-green-500 bg-green-500/10' : 
                    'border-border bg-card'}`}
              >
                <h4 className="font-display text-lg font-bold mb-4 text-center">{category}</h4>
                <div className="space-y-2">
                  {catItems.map(item => (
                    <motion.div
                      key={item.id}
                      className={`p-3 rounded-lg font-medium flex items-center justify-between
                        ${showResults ? 
                          (isItemCorrect(item, category) ? 'bg-green-500/20 border-2 border-green-500' : 'bg-game-red/20 border-2 border-game-red') : 
                          'bg-muted'}`}
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                    >
                      <span>{item.text}</span>
                      {showResults && (
                        isItemCorrect(item, category) ? 
                          <Check className="text-green-500" size={18} /> : 
                          <X className="text-game-red" size={18} />
                      )}
                      {!showResults && (
                        <button
                          onClick={() => handleRemoveFromCategory(item, category)}
                          className="text-muted-foreground hover:text-foreground"
                        >
                          ×
                        </button>
                      )}
                    </motion.div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {!showResults && items.length === 0 && (
        <div className="p-4 flex justify-center">
          <Button size="lg" onClick={checkAnswers}>
            Check Answers
          </Button>
        </div>
      )}

      {showResults && (
        <div className="p-4 flex justify-center">
          <Button size="lg" onClick={() => setGameComplete(true)}>
            Continue
          </Button>
        </div>
      )}
    </div>
  );
}
