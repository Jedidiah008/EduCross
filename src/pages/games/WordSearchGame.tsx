import { useState, useEffect, useCallback, useMemo } from 'react';
import { motion } from 'framer-motion';
import { GameHeader } from '@/components/GameHeader';
import { GameResult } from '@/components/GameResult';
import { Button } from '@/components/ui/button';
import { useGameQuestions } from '@/hooks/useGameQuestions';

interface WordSearchGameProps {
  subjectId: string;
  unitId: string;
}

const GRID_SIZE = 12;

export default function WordSearchGame({ subjectId, unitId }: WordSearchGameProps) {
  const { wordsearch } = useGameQuestions(subjectId, unitId);
  const [grid, setGrid] = useState<string[][]>([]);
  const [selectedCells, setSelectedCells] = useState<{ row: number; col: number }[]>([]);
  const [foundWords, setFoundWords] = useState<string[]>([]);
  const [foundCells, setFoundCells] = useState<Set<string>>(new Set());
  const [isSelecting, setIsSelecting] = useState(false);
  const [startCell, setStartCell] = useState<{ row: number; col: number } | null>(null);
  const [gameComplete, setGameComplete] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);

  // Memoize words to prevent re-renders
  const words = useMemo(() => {
    return (wordsearch || []).map(w => w.word.toUpperCase().replace(/\s/g, ''));
  }, [wordsearch]);

  const generateGrid = useCallback(() => {
    const newGrid: string[][] = Array(GRID_SIZE).fill(null).map(() => 
      Array(GRID_SIZE).fill('')
    );

    const directions = [
      { dx: 1, dy: 0 },   // right
      { dx: 0, dy: 1 },   // down
      { dx: 1, dy: 1 },   // diagonal down-right
      { dx: -1, dy: 1 },  // diagonal down-left
    ];

    words.forEach(word => {
      let placed = false;
      let attempts = 0;

      while (!placed && attempts < 100) {
        const dir = directions[Math.floor(Math.random() * directions.length)];
        const startX = Math.floor(Math.random() * GRID_SIZE);
        const startY = Math.floor(Math.random() * GRID_SIZE);

        const endX = startX + dir.dx * (word.length - 1);
        const endY = startY + dir.dy * (word.length - 1);

        if (endX >= 0 && endX < GRID_SIZE && endY >= 0 && endY < GRID_SIZE) {
          let canPlace = true;
          for (let i = 0; i < word.length; i++) {
            const x = startX + dir.dx * i;
            const y = startY + dir.dy * i;
            if (newGrid[y][x] !== '' && newGrid[y][x] !== word[i]) {
              canPlace = false;
              break;
            }
          }

          if (canPlace) {
            for (let i = 0; i < word.length; i++) {
              const x = startX + dir.dx * i;
              const y = startY + dir.dy * i;
              newGrid[y][x] = word[i];
            }
            placed = true;
          }
        }
        attempts++;
      }
    });

    // Fill empty cells with random letters (seeded for stability)
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    for (let y = 0; y < GRID_SIZE; y++) {
      for (let x = 0; x < GRID_SIZE; x++) {
        if (newGrid[y][x] === '') {
          // Use position-based pseudo-random for stability
          const seed = (y * GRID_SIZE + x) * 7 + 13;
          newGrid[y][x] = alphabet[seed % alphabet.length];
        }
      }
    }

    return newGrid;
  }, [words]);

  useEffect(() => {
    if (gameStarted && words.length > 0 && grid.length === 0) {
      setGrid(generateGrid());
    }
  }, [gameStarted, words.length, grid.length, generateGrid]);

  const getCellsInLine = (start: { row: number; col: number }, end: { row: number; col: number }) => {
    const cells: { row: number; col: number }[] = [];
    const dx = Math.sign(end.col - start.col);
    const dy = Math.sign(end.row - start.row);
    
    // Only allow horizontal, vertical, or diagonal lines
    if (dx !== 0 && dy !== 0 && Math.abs(end.col - start.col) !== Math.abs(end.row - start.row)) {
      return [start];
    }

    let x = start.col;
    let y = start.row;
    
    while (true) {
      cells.push({ row: y, col: x });
      if (x === end.col && y === end.row) break;
      x += dx;
      y += dy;
      if (cells.length > GRID_SIZE) break;
    }

    return cells;
  };

  const locateWordPositions = (word: string) => {
    if (grid.length === 0) return null;
    const dirs = [
      { dx: 1, dy: 0 },
      { dx: 0, dy: 1 },
      { dx: 1, dy: 1 },
      { dx: -1, dy: 1 },
    ];

    for (let y = 0; y < GRID_SIZE; y++) {
      for (let x = 0; x < GRID_SIZE; x++) {
        for (const dir of dirs) {
          const endX = x + dir.dx * (word.length - 1);
          const endY = y + dir.dy * (word.length - 1);
          if (endX < 0 || endX >= GRID_SIZE || endY < 0 || endY >= GRID_SIZE) continue;

          let matchForward = true;
          for (let i = 0; i < word.length; i++) {
            const cx = x + dir.dx * i;
            const cy = y + dir.dy * i;
            if (grid[cy][cx] !== word[i]) { matchForward = false; break; }
          }
          if (matchForward) {
            const cells: { row: number; col: number }[] = [];
            for (let i = 0; i < word.length; i++) {
              cells.push({ row: y + dir.dy * i, col: x + dir.dx * i });
            }
            return cells;
          }

          // check reverse by comparing characters backwards
          let matchReverse = true;
          for (let i = 0; i < word.length; i++) {
            const cx = x + dir.dx * i;
            const cy = y + dir.dy * i;
            if (grid[cy][cx] !== word[word.length - 1 - i]) { matchReverse = false; break; }
          }
          if (matchReverse) {
            const cells: { row: number; col: number }[] = [];
            for (let i = 0; i < word.length; i++) {
              cells.push({ row: y + dir.dy * i, col: x + dir.dx * i });
            }
            return cells;
          }
        }
      }
    }
    return null;
  };

  const handleMouseDown = (row: number, col: number) => {
    setIsSelecting(true);
    setStartCell({ row, col });
    setSelectedCells([{ row, col }]);
  };

  const handleMouseEnter = (row: number, col: number) => {
    if (isSelecting && startCell) {
      const cells = getCellsInLine(startCell, { row, col });
      setSelectedCells(cells);
    }
  };

  const handleMouseUp = () => {
    if (selectedCells.length > 0 && grid.length > 0) {
      const selectedWord = selectedCells.map(c => grid[c.row]?.[c.col] || '').join('');
      const reversedWord = [...selectedWord].reverse().join('');

      const matchedWord = words.find(w => 
        (w === selectedWord || w === reversedWord) && !foundWords.includes(w)
      );

      if (matchedWord) {
        const newFoundWords = [...foundWords, matchedWord];
        setFoundWords(newFoundWords);

        // locate positions for the matched word and mark those cells as found
        const positions = locateWordPositions(matchedWord);
        if (positions && positions.length > 0) {
          setFoundCells(prev => {
            const next = new Set(prev);
            positions.forEach(p => next.add(`${p.row}-${p.col}`));
            return next;
          });
        }

        if (newFoundWords.length === words.length) {
          setGameComplete(true);
        }
      }
    }
    setIsSelecting(false);
    setStartCell(null);
    setSelectedCells([]);
  };

  const isCellSelected = (row: number, col: number) => {
    return selectedCells.some(c => c.row === row && c.col === col) || foundCells.has(`${row}-${col}`);
  };

  if (gameComplete) {
    return (
      <GameResult
        score={foundWords.length}
        maxScore={words.length}
        gameName="Word Search"
        subjectId={subjectId}
        unitId={unitId}
        onRetry={() => {
          setFoundWords([]);
          setGameComplete(false);
          setGameStarted(false);
          setGrid([]);
        }}
      />
    );
  }

  if (!gameStarted) {
    return (
      <div className="min-h-screen flex flex-col">
        <GameHeader title="Word Search" subjectId={subjectId} unitId={unitId} />
        <div className="flex-1 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-md"
          >
            <div className="text-6xl mb-4">🔍</div>
            <h2 className="font-display text-2xl font-bold mb-4">How to Play</h2>
            <p className="text-muted-foreground mb-6">
              Find hidden words in the grid. Click and drag to select letters in a line
              (horizontal, vertical, or diagonal).
            </p>
            <p className="text-sm text-muted-foreground mb-6">
              {words.length} words to find
            </p>
            <Button size="lg" onClick={() => setGameStarted(true)}>
              Start Game
            </Button>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <GameHeader
        title="Word Search"
        subjectId={subjectId}
        unitId={unitId}
        score={foundWords.length}
        maxScore={words.length}
      />

      <div className="flex-1 flex flex-col lg:flex-row items-center justify-center p-4 gap-8">
        <div
          className="grid gap-1 bg-card p-4 rounded-xl border-2 border-border select-none"
          style={{ gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)` }}
          onMouseLeave={handleMouseUp}
        >
          {grid.map((row, rowIndex) =>
            row.map((cell, colIndex) => (
              <div
                key={`${rowIndex}-${colIndex}`}
                className={`w-8 h-8 flex items-center justify-center font-bold text-lg rounded cursor-pointer transition-colors
                          ${isCellSelected(rowIndex, colIndex) ? 'bg-primary text-primary-foreground' : 'bg-muted hover:bg-muted/80'}`}
                onMouseDown={() => handleMouseDown(rowIndex, colIndex)}
                onMouseEnter={() => handleMouseEnter(rowIndex, colIndex)}
                onMouseUp={handleMouseUp}
              >
                {cell}
              </div>
            ))
          )}
        </div>

        <div className="bg-card p-6 rounded-xl border-2 border-border min-w-[200px]">
          <h3 className="font-display text-lg font-bold mb-4">Find these words:</h3>
          <div className="space-y-2">
            {words.map((word, i) => (
              <div
                key={i}
                className={`font-mono text-lg ${foundWords.includes(word) ? 'line-through text-muted-foreground' : 'text-foreground'}`}
              >
                {foundWords.includes(word) ? '✓ ' : '○ '}{word}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}