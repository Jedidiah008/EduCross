import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { WordSearchQuestion } from "@/data/gameQuestions";
import { Check, X } from "lucide-react";

interface Props {
  questions: WordSearchQuestion[];
  onComplete: (score: number, maxScore: number, time: number) => void;
  subjectColor: "yellow" | "blue";
}

const GRID_SIZE = 10;

function generateGrid(words: string[]): string[][] {
  const grid: string[][] = Array(GRID_SIZE).fill(null).map(() => Array(GRID_SIZE).fill(""));
  const directions = [
    [0, 1],   // right
    [1, 0],   // down
    [1, 1],   // diagonal
  ];

  words.forEach(word => {
    let placed = false;
    let attempts = 0;
    
    while (!placed && attempts < 100) {
      const dir = directions[Math.floor(Math.random() * directions.length)];
      const row = Math.floor(Math.random() * GRID_SIZE);
      const col = Math.floor(Math.random() * GRID_SIZE);
      
      if (canPlace(grid, word, row, col, dir)) {
        placeWord(grid, word, row, col, dir);
        placed = true;
      }
      attempts++;
    }
  });

  // Fill empty cells with random letters
  for (let i = 0; i < GRID_SIZE; i++) {
    for (let j = 0; j < GRID_SIZE; j++) {
      if (!grid[i][j]) {
        grid[i][j] = String.fromCharCode(65 + Math.floor(Math.random() * 26));
      }
    }
  }

  return grid;
}

function canPlace(grid: string[][], word: string, row: number, col: number, dir: number[]): boolean {
  for (let i = 0; i < word.length; i++) {
    const newRow = row + dir[0] * i;
    const newCol = col + dir[1] * i;
    
    if (newRow >= GRID_SIZE || newCol >= GRID_SIZE) return false;
    if (grid[newRow][newCol] && grid[newRow][newCol] !== word[i]) return false;
  }
  return true;
}

function placeWord(grid: string[][], word: string, row: number, col: number, dir: number[]): void {
  for (let i = 0; i < word.length; i++) {
    grid[row + dir[0] * i][col + dir[1] * i] = word[i];
  }
}

export default function WordSearchGame({ questions, onComplete, subjectColor }: Props) {
  const [grid] = useState(() => generateGrid(questions.map(q => q.word)));
  const [foundWords, setFoundWords] = useState<Set<string>>(new Set());
  const [selectedCells, setSelectedCells] = useState<Set<string>>(new Set());
  const [currentWord, setCurrentWord] = useState("");
  const [startTime] = useState(Date.now());

  const colorClass = subjectColor === "yellow" ? "text-primary" : "text-secondary";
  const bgClass = subjectColor === "yellow" ? "bg-primary" : "bg-secondary";

  const handleCellClick = (row: number, col: number) => {
    const key = `${row}-${col}`;
    const letter = grid[row][col];
    
    if (selectedCells.has(key)) {
      // Deselect
      const newSelected = new Set(selectedCells);
      newSelected.delete(key);
      setSelectedCells(newSelected);
      setCurrentWord(prev => prev.slice(0, -1));
    } else {
      // Select
      const newWord = currentWord + letter;
      setSelectedCells(new Set([...selectedCells, key]));
      setCurrentWord(newWord);
      
      // Check if word is found
      const matchingQuestion = questions.find(q => q.word === newWord);
      if (matchingQuestion) {
        setFoundWords(new Set([...foundWords, newWord]));
        setSelectedCells(new Set());
        setCurrentWord("");
      }
    }
  };

  const handleClear = () => {
    setSelectedCells(new Set());
    setCurrentWord("");
  };

  const handleFinish = () => {
    const timeTaken = Math.floor((Date.now() - startTime) / 1000);
    onComplete(foundWords.size, questions.length, timeTaken);
  };

  const allFound = foundWords.size === questions.length;

  return (
    <Card className="game-card max-w-3xl mx-auto animate-slide-up">
      <CardContent className="p-6">
        <h2 className={`text-2xl font-fredoka ${colorClass} mb-4 text-center`}>
          Word Search
        </h2>
        
        {/* Questions */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-6">
          {questions.map((q, index) => (
            <div 
              key={index}
              className={`flex items-center gap-2 p-2 rounded-lg ${
                foundWords.has(q.word) ? "bg-success/20" : "bg-muted/50"
              }`}
            >
              {foundWords.has(q.word) ? (
                <Check className="w-4 h-4 text-success" />
              ) : (
                <span className={`w-4 h-4 rounded-full ${bgClass} text-[10px] flex items-center justify-center text-background`}>
                  {index + 1}
                </span>
              )}
              <span className={`text-sm ${foundWords.has(q.word) ? "line-through text-muted-foreground" : ""}`}>
                {q.question}
              </span>
            </div>
          ))}
        </div>

        {/* Current word display */}
        {currentWord && (
          <div className="text-center mb-4">
            <span className={`text-xl font-fredoka ${colorClass}`}>{currentWord}</span>
            <Button variant="ghost" size="sm" onClick={handleClear} className="ml-2">
              <X className="w-4 h-4" />
            </Button>
          </div>
        )}

        {/* Grid */}
        <div className="grid grid-cols-10 gap-1 mb-6 mx-auto w-fit">
          {grid.map((row, rowIndex) =>
            row.map((cell, colIndex) => {
              const key = `${rowIndex}-${colIndex}`;
              const isSelected = selectedCells.has(key);
              
              return (
                <button
                  key={key}
                  onClick={() => handleCellClick(rowIndex, colIndex)}
                  className={`w-8 h-8 sm:w-10 sm:h-10 rounded-md font-mono font-bold text-sm sm:text-base transition-all ${
                    isSelected
                      ? `${bgClass} text-background scale-110`
                      : "bg-muted hover:bg-muted-foreground/20"
                  }`}
                >
                  {cell}
                </button>
              );
            })
          )}
        </div>

        <Button 
          onClick={handleFinish} 
          className={`w-full ${subjectColor === "yellow" ? "bg-gradient-primary" : "bg-gradient-secondary"}`}
          disabled={!allFound && foundWords.size === 0}
        >
          {allFound ? "Complete!" : `Found ${foundWords.size}/${questions.length} - Finish`}
        </Button>
      </CardContent>
    </Card>
  );
}
