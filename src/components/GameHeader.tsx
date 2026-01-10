import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

interface GameHeaderProps {
  title: string;
  subjectId: string;
  unitId: string;
  score?: number;
  maxScore?: number;
  timeLeft?: number;
}

export function GameHeader({ title, subjectId, unitId, score, maxScore, timeLeft }: GameHeaderProps) {
  const navigate = useNavigate();

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex items-center justify-between p-4 bg-card/50 backdrop-blur-sm border-b border-border">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => navigate(`/subject/${subjectId}/unit/${unitId}/games`)}
        className="gap-2"
      >
        <ArrowLeft size={18} />
        Back
      </Button>

      <h1 className="font-display text-xl font-bold text-foreground">{title}</h1>

      <div className="flex items-center gap-4">
        {timeLeft !== undefined && (
          <div className={`font-mono text-lg font-bold ${timeLeft <= 10 ? 'text-game-red animate-pulse' : 'text-game-yellow'}`}>
            {formatTime(timeLeft)}
          </div>
        )}
        {score !== undefined && maxScore !== undefined && (
          <div className="font-display text-lg">
            <span className="text-primary">{score}</span>
            <span className="text-muted-foreground">/{maxScore}</span>
          </div>
        )}
      </div>
    </div>
  );
}
