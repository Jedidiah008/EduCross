import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getSubject, getUnit } from '@/data/subjects';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { 
  Joystick,
  Grid3X3,
  MousePointerClick,
  Puzzle,
  FileText,
  Layers,
  Link2,
  Swords,
  Shuffle,
  Lightbulb
} from 'lucide-react';

const games = [
  { id: 'snake', name: 'Snake Game', icon: Joystick, desc: 'Eat letters to spell answers', color: 'from-green-500 to-emerald-600' },
  { id: 'wordsearch', name: 'Word Search', icon: Grid3X3, desc: 'Find hidden words in the grid', color: 'from-blue-500 to-cyan-600' },
  { id: 'dragdrop', name: 'Drag and Drop', icon: MousePointerClick, desc: 'Sort answers into categories', color: 'from-purple-500 to-violet-600' },
  { id: 'jigsaw', name: 'Jigsaw Puzzle', icon: Puzzle, desc: 'Assemble pieces to form answers', color: 'from-orange-500 to-amber-600' },
  { id: 'fillblanks', name: 'Fill in the Blanks', icon: FileText, desc: 'Complete sentences before time runs out', color: 'from-pink-500 to-rose-600' },
  { id: 'memoryflip', name: 'Memory Flip', icon: Layers, desc: 'Match questions with answers', color: 'from-teal-500 to-cyan-600' },
  { id: 'matchit', name: 'Match It', icon: Link2, desc: 'Connect questions to correct answers', color: 'from-indigo-500 to-blue-600' },
  { id: 'fighttime', name: 'Fight the Time', icon: Swords, desc: 'Enumerate answers before time runs out', color: 'from-red-500 to-orange-600' },
  { id: 'guessword', name: 'Guess the Word', icon: Shuffle, desc: 'Unscramble letters to spell answers', color: 'from-yellow-500 to-amber-600' },
  { id: 'conceptpuzzle', name: 'Concept Puzzle', icon: Lightbulb, desc: 'Guess answers with hints', color: 'from-fuchsia-500 to-pink-600' },
];

export default function GameSelectionPage() {
  const { subjectId, unitId } = useParams<{ subjectId: string; unitId: string }>();
  const navigate = useNavigate();

  const subject = subjectId ? getSubject(subjectId) : undefined;
  const unit = subjectId && unitId ? getUnit(subjectId, unitId) : undefined;

  if (!subject || !unit) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-muted-foreground">Unit not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 sm:p-8">
      <div className="mx-auto max-w-5xl">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-8">
          <Button variant="ghost" onClick={() => navigate(`/subject/${subjectId}/unit/${unitId}`)}>
            <ArrowLeft size={20} className="mr-2" />
            Back to Lesson
          </Button>
          <h1 className="mt-4 font-display text-3xl font-bold text-foreground">Choose Your Game</h1>
          <p className="text-muted-foreground">
            Test your knowledge on: {unit.title}
          </p>
        </motion.div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {games.map((game, index) => (
            <motion.button
              key={game.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ scale: 1.02, y: -4 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate(`/game/${game.id}/${subjectId}/${unitId}`)}
              className="game-card group text-left transition-all hover:border-primary relative overflow-hidden"
            >
              <div className={`mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${game.color} shadow-lg`}>
                <game.icon size={32} className="text-white" />
              </div>
              <h3 className="font-display text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                {game.name}
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">{game.desc}</p>
              
              {/* Decorative glow */}
              <div className={`absolute -top-20 -right-20 h-40 w-40 rounded-full bg-gradient-to-br ${game.color} opacity-10 blur-3xl transition-opacity group-hover:opacity-20`} />
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
}
