import { useParams } from 'react-router-dom';
import { lazy, Suspense } from 'react';

const SnakeGame = lazy(() => import('./games/SnakeGame'));
const WordSearchGame = lazy(() => import('./games/WordSearchGame'));
const DragDropGame = lazy(() => import('./games/DragDropGame'));
const JigsawGame = lazy(() => import('./games/JigsawGame'));
const FillBlanksGame = lazy(() => import('./games/FillBlanksGame'));
const MemoryFlipGame = lazy(() => import('./games/MemoryFlipGame'));
const MatchItGame = lazy(() => import('./games/MatchItGame'));
const FightTimeGame = lazy(() => import('./games/FightTimeGame'));
const GuessWordGame = lazy(() => import('./games/GuessWordGame'));
const ConceptPuzzleGame = lazy(() => import('./games/ConceptPuzzleGame'));

const gameComponents: Record<string, React.ComponentType<{ subjectId: string; unitId: string }>> = {
  snake: SnakeGame,
  wordsearch: WordSearchGame,
  dragdrop: DragDropGame,
  jigsaw: JigsawGame,
  fillblanks: FillBlanksGame,
  memoryflip: MemoryFlipGame,
  matchit: MatchItGame,
  fighttime: FightTimeGame,
  guessword: GuessWordGame,
  conceptpuzzle: ConceptPuzzleGame,
};

export default function GamePage() {
  const { gameId, subjectId, unitId } = useParams<{ gameId: string; subjectId: string; unitId: string }>();

  if (!gameId || !subjectId || !unitId) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-muted-foreground">Invalid game parameters</p>
      </div>
    );
  }

  const GameComponent = gameComponents[gameId];

  if (!GameComponent) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-muted-foreground">Game not found</p>
      </div>
    );
  }

  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary" />
        </div>
      }
    >
      <GameComponent subjectId={subjectId} unitId={unitId} />
    </Suspense>
  );
}
