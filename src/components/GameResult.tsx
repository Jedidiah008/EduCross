import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Trophy, RotateCcw, Home, Gamepad2 } from 'lucide-react';
import { useAuth } from '@/lib/auth';
import { supabase } from '@/integrations/supabase/client';
import { useEffect, useState } from 'react';

interface GameResultProps {
  score: number;
  maxScore: number;
  gameName: string;
  subjectId: string;
  unitId: string;
  onRetry: () => void;
}

export function GameResult({ score, maxScore, gameName, subjectId, unitId, onRetry }: GameResultProps) {
  const navigate = useNavigate();
  const { user, profile } = useAuth();
  const [saved, setSaved] = useState(false);
  const percentage = Math.round((score / maxScore) * 100);

  useEffect(() => {
    const saveScore = async () => {
      if (user && profile && !saved) {
        try {
          await supabase.from('game_scores').insert([{
            user_id: user.id,
            subject: subjectId,
            topic: unitId,
            game_type: gameName,
            score,
            max_score: maxScore,
          }]);
          setSaved(true);
        } catch (error) {
          console.error('Failed to save score:', error);
        }
      }
    };
    saveScore();
  }, [user, profile, score, maxScore, gameName, subjectId, unitId, saved]);

  const getMessage = () => {
    if (percentage === 100) return "Perfect Score! 🎉";
    if (percentage >= 80) return "Excellent Work! 🌟";
    if (percentage >= 60) return "Good Job! 👍";
    if (percentage >= 40) return "Keep Practicing! 💪";
    return "Try Again! 📚";
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50"
    >
      <motion.div
        initial={{ y: 50 }}
        animate={{ y: 0 }}
        className="bg-card p-10 rounded-3xl border-2 border-primary shadow-game max-w-2xl w-full mx-4 text-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring' }}
          className="w-28 h-28 mx-auto mb-6 rounded-full bg-gradient-to-br from-game-yellow to-game-orange flex items-center justify-center"
        >
          <Trophy size={56} className="text-white" />
        </motion.div>

        <h2 className="font-display text-3xl font-bold text-foreground mb-2">
          {getMessage()}
        </h2>

        <div className="my-6">
          <div className="text-6xl font-display font-bold text-primary mb-2">
            {score}/{maxScore}
          </div>
          <div className="text-xl text-muted-foreground">
            {percentage}% Correct
          </div>
        </div>

        <div className="w-full bg-muted rounded-full h-4 mb-8 overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${percentage}%` }}
            transition={{ delay: 0.5, duration: 1 }}
            className="h-full bg-gradient-to-r from-primary to-accent rounded-full"
          />
        </div>

        <div className="flex gap-4">
          <Button onClick={onRetry} variant="outline" className="flex-1 gap-2">
            <RotateCcw size={18} />
            Retry
          </Button>
          <Button onClick={() => navigate(`/subject/${subjectId}/unit/${unitId}/games`)} variant="secondary" className="flex-1 gap-2">
            <Gamepad2 size={18} />
            Back to Games
          </Button>
          <Button onClick={() => navigate('/dashboard')} className="flex-1 gap-2">
            <Home size={18} />
            Dashboard
          </Button>
        </div>
      </motion.div>
    </motion.div>
  );
}
