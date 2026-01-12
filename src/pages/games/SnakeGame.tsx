import { useState, useEffect, useCallback, useRef } from 'react';
import { motion } from 'framer-motion';
import { GameHeader } from '@/components/GameHeader';
import { GameResult } from '@/components/GameResult';
import { Button } from '@/components/ui/button';
import { useGameQuestions } from '@/hooks/useGameQuestions';
import { Minus, Plus } from 'lucide-react';

type Position = { x: number; y: number };

interface SnakeGameProps {
  subjectId: string;
  unitId: string;
}

const GRID_SIZE = 15;
const CELL_SIZE = 28;

export default function SnakeGame({ subjectId, unitId }: SnakeGameProps) {
  const { snake: snakeQuestions } = useGameQuestions(subjectId, unitId);
  const [currentLevel, setCurrentLevel] = useState(0);
  const [snake, setSnake] = useState<Position[]>([{ x: 7, y: 7 }]);
  const [direction, setDirection] = useState<Position>({ x: 1, y: 0 });
  const [letters, setLetters] = useState<{ pos: Position; char: string }[]>([]);
  const [collectedLetters, setCollectedLetters] = useState('');
  const [gameOver, setGameOver] = useState(false);
  const [won, setWon] = useState(false);
  const [score, setScore] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [previewMode, setPreviewMode] = useState(false);
  const [speed, setSpeed] = useState(200);
  const gameLoopRef = useRef<number | undefined>(undefined);
  const directionRef = useRef(direction);

  const currentQuestion = snakeQuestions[currentLevel];
  const targetAnswer = (currentQuestion?.answer || '').toUpperCase();

  const generateLettersFor = (ans?: string) => {
    const target = (ans || targetAnswer || '').toUpperCase();
    if (!target) return;
    const newLetters: { pos: Position; char: string }[] = [];
    const used = new Set<string>();
    used.add('7,7');

    for (const ch of target.split('')) {
      let pos: Position;
      do {
        pos = { x: Math.floor(Math.random() * GRID_SIZE), y: Math.floor(Math.random() * GRID_SIZE) };
      } while (used.has(`${pos.x},${pos.y}`));
      used.add(`${pos.x},${pos.y}`);
      newLetters.push({ pos, char: ch });
    }

    const lettersPool = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    for (let i = 0; i < 8; i++) {
      let pos: Position;
      do {
        pos = { x: Math.floor(Math.random() * GRID_SIZE), y: Math.floor(Math.random() * GRID_SIZE) };
      } while (used.has(`${pos.x},${pos.y}`));
      used.add(`${pos.x},${pos.y}`);
      newLetters.push({ pos, char: lettersPool[Math.floor(Math.random() * lettersPool.length)] });
    }

    setLetters(newLetters);
  };

  const resetLevel = useCallback(() => {
    setSnake([{ x: 7, y: 7 }]);
    setDirection({ x: 1, y: 0 });
    directionRef.current = { x: 1, y: 0 };
    setCollectedLetters('');
    setGameOver(false);
    setLetters([]);
  }, []);

  const startPreviewForLevel = (levelIndex: number) => {
    const idx = Math.max(0, Math.min(levelIndex, snakeQuestions.length - 1));
    setCurrentLevel(idx);
    setSnake([{ x: 7, y: 7 }]);
    setDirection({ x: 1, y: 0 });
    directionRef.current = { x: 1, y: 0 };
    setCollectedLetters('');
    setGameOver(false);
    setGameStarted(false);
    setPreviewMode(true);
    const ans = (snakeQuestions[idx]?.answer || '').toUpperCase();
    generateLettersFor(ans);
  };

  

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (!gameStarted || gameOver) return;
      const dir = { ...directionRef.current };
      switch (e.key) {
        case 'ArrowUp':
        case 'w':
        case 'W':
          if (directionRef.current.y !== 1) { dir.x = 0; dir.y = -1; }
          break;
        case 'ArrowDown':
        case 's':
        case 'S':
          if (directionRef.current.y !== -1) { dir.x = 0; dir.y = 1; }
          break;
        case 'ArrowLeft':
        case 'a':
        case 'A':
          if (directionRef.current.x !== 1) { dir.x = -1; dir.y = 0; }
          break;
        case 'ArrowRight':
        case 'd':
        case 'D':
          if (directionRef.current.x !== -1) { dir.x = 1; dir.y = 0; }
          break;
      }
      directionRef.current = dir;
      setDirection(dir);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [gameStarted, gameOver]);

  useEffect(() => {
    if (!gameStarted || gameOver || won) return;
    const tick = () => {
      setSnake(prev => {
        const head = prev[0];
        const newHead = { x: head.x + directionRef.current.x, y: head.y + directionRef.current.y };
        if (newHead.x < 0 || newHead.x >= GRID_SIZE || newHead.y < 0 || newHead.y >= GRID_SIZE) { setGameOver(true); return prev; }
        if (prev.some(p => p.x === newHead.x && p.y === newHead.y)) { setGameOver(true); return prev; }

        const li = letters.findIndex(l => l.pos.x === newHead.x && l.pos.y === newHead.y);
        if (li !== -1) {
          const l = letters[li];
          const newCollected = collectedLetters + l.char;
          setCollectedLetters(newCollected);
          setLetters(s => s.filter((_, i) => i !== li));
          if (!targetAnswer.startsWith(newCollected)) { setGameOver(true); return prev; }
          if (newCollected === targetAnswer) {
            setScore(s => s + 1);
            if (currentLevel + 1 >= snakeQuestions.length) {
              setWon(true);
            } else {
              setTimeout(() => {
                const nextIndex = currentLevel + 1;
                startPreviewForLevel(nextIndex);
              }, 500);
            }
          }
          return [newHead, ...prev];
        }
        return [newHead, ...prev.slice(0, -1)];
      });
    };
    gameLoopRef.current = window.setInterval(tick, speed);
    return () => { if (gameLoopRef.current) clearInterval(gameLoopRef.current); };
  }, [gameStarted, gameOver, won, letters, collectedLetters, targetAnswer, currentLevel, snakeQuestions.length, resetLevel, speed]);

  const increaseSpeed = () => setSpeed(s => Math.max(50, s - 25));
  const decreaseSpeed = () => setSpeed(s => Math.min(400, s + 25));
  const getSpeedLabel = () => (speed <= 100 ? 'Very Fast' : speed <= 150 ? 'Fast' : speed <= 200 ? 'Normal' : speed <= 300 ? 'Slow' : 'Very Slow');

  if (won) {
    return (
      <GameResult score={score} maxScore={snakeQuestions.length} gameName="Snake Game" subjectId={subjectId} unitId={unitId}
        onRetry={() => { setCurrentLevel(0); setScore(0); setWon(false); setGameStarted(false); }} />
    );
  }

  // Pre-start screen (how to play)
  if (!gameStarted && !previewMode) {
    return (
      <div className="min-h-screen flex flex-col">
        <GameHeader title="Snake Game" subjectId={subjectId} unitId={unitId} />
        <div className="flex-1 flex items-center justify-center p-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center max-w-md">
            <div className="text-6xl mb-4">🐍</div>
            <h2 className="font-display text-2xl font-bold mb-4">How to Play</h2>
            <p className="text-muted-foreground mb-6">Read the instructions, then click Start Level to preview the board and question. Use arrow keys to control the snake. Eat letters in order to spell the answer. Don't hit the walls or eat wrong letters!</p>
            <p className="text-sm text-muted-foreground mb-6">{snakeQuestions.length} levels to complete</p>
            <Button size="lg" onClick={() => { startPreviewForLevel(0); }}>Start Level</Button>
          </motion.div>
        </div>
      </div>
    );
  }

  // Main game / preview layout
  return (
    <div className="min-h-screen flex flex-col">
      <GameHeader title="Snake Game" subjectId={subjectId} unitId={unitId} score={score} maxScore={snakeQuestions.length} />
      <div className="flex-1 flex items-center justify-center p-4 gap-6">
        <div className="flex flex-col items-center gap-4">
          <div className="text-center mb-4">
            <p className="text-sm text-muted-foreground mb-2">Level {currentLevel + 1}</p>
            {previewMode ? (
              <p className="text-lg font-medium">(Preview) {currentQuestion?.question}</p>
            ) : (
              <p className="text-lg font-medium">{currentQuestion?.question}</p>
            )}
            <p className="font-mono text-2xl text-primary mt-2 tracking-widest">{collectedLetters.padEnd(targetAnswer.length, '_').split('').join(' ')}</p>
          </div>

          <div className="relative bg-card border-2 border-border rounded-lg overflow-hidden" style={{ width: GRID_SIZE * CELL_SIZE, height: GRID_SIZE * CELL_SIZE }}>
            <div className="absolute inset-0 grid" style={{ gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)` }}>
              {Array.from({ length: GRID_SIZE * GRID_SIZE }).map((_, i) => <div key={i} className="border border-border/20" />)}
            </div>

            {letters.map((letter, i) => (
              <div key={i} className="absolute flex items-center justify-center font-bold text-lg bg-game-yellow text-game-navy rounded" style={{ left: letter.pos.x * CELL_SIZE, top: letter.pos.y * CELL_SIZE, width: CELL_SIZE, height: CELL_SIZE }}>{letter.char}</div>
            ))}

            {snake.map((seg, i) => (
              <motion.div key={i} className={`absolute rounded ${i === 0 ? 'bg-green-600' : 'bg-green-500/70'}`} style={{ left: seg.x * CELL_SIZE + 2, top: seg.y * CELL_SIZE + 2, width: CELL_SIZE - 4, height: CELL_SIZE - 4 }} initial={false} animate={{ scale: i === 0 ? 1 : 0.9 }} />
            ))}
          </div>

          {gameOver && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center">
              <p className="text-game-red font-bold text-xl mb-4">Game Over!</p>
              <p className="text-muted-foreground mb-4">Correct answer: {targetAnswer}</p>
              <Button onClick={() => { startPreviewForLevel(currentLevel); }}>Try Again</Button>
            </motion.div>
          )}

          <p className="text-sm text-muted-foreground">Use arrow keys ← ↑ → ↓ to move</p>
        </div>

        <div className="flex flex-col items-center gap-4">
          {previewMode && !gameStarted && (
            <div className="w-full flex justify-center">
              <Button size="lg" onClick={() => { setGameStarted(true); setPreviewMode(false); }}>Start</Button>
            </div>
          )}

          <div className="bg-card border-2 border-border rounded-xl p-4 min-w-[160px]">
            <h3 className="font-display font-bold text-center mb-4">Speed Settings</h3>
            <div className="flex flex-col items-center gap-3">
              <Button variant="outline" size="icon" onClick={increaseSpeed} disabled={speed <= 50} className="w-10 h-10"><Plus size={20} /></Button>
              <div className="text-center"><p className="font-bold text-lg">{getSpeedLabel()}</p><p className="text-xs text-muted-foreground">{speed}ms</p></div>
              <Button variant="outline" size="icon" onClick={decreaseSpeed} disabled={speed >= 400} className="w-10 h-10"><Minus size={20} /></Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}