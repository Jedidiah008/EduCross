import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useAuth } from "@/hooks/useAuth";
import { getSubjectById, getUnitById, getLessonById, gameTypes } from "@/data/curriculum";
import { getGameData } from "@/data/gameQuestions";
import { supabase } from "@/integrations/supabase/client";
import { ArrowLeft, Trophy, Loader2 } from "lucide-react";
import { toast } from "sonner";

// Import game components
import CrosswordGame from "@/components/games/CrosswordGame";
import WordSearchGame from "@/components/games/WordSearchGame";
import DragDropGame from "@/components/games/DragDropGame";
import JigsawGame from "@/components/games/JigsawGame";
import FillBlanksGame from "@/components/games/FillBlanksGame";
import MemoryFlipGame from "@/components/games/MemoryFlipGame";
import MatchItGame from "@/components/games/MatchItGame";
import FightTimeGame from "@/components/games/FightTimeGame";
import GuessWordGame from "@/components/games/GuessWordGame";
import ConceptPuzzleGame from "@/components/games/ConceptPuzzleGame";

export default function Game() {
  const navigate = useNavigate();
  const { subjectId, unitId, lessonId, gameId } = useParams<{ 
    subjectId: string; 
    unitId: string; 
    lessonId: string;
    gameId: string;
  }>();
  const { user, loading } = useAuth();
  const [gameComplete, setGameComplete] = useState(false);
  const [score, setScore] = useState(0);
  const [maxScore, setMaxScore] = useState(0);
  const [timeTaken, setTimeTaken] = useState(0);
  const [saving, setSaving] = useState(false);

  const subject = subjectId ? getSubjectById(subjectId) : undefined;
  const unit = subjectId && unitId ? getUnitById(subjectId, unitId) : undefined;
  const lesson = subjectId && unitId && lessonId ? getLessonById(subjectId, unitId, lessonId) : undefined;
  const gameType = gameTypes.find(g => g.id === gameId);
  const gameData = lessonId ? getGameData(lessonId) : null;

  useEffect(() => {
    if (!loading && !user) {
      navigate("/auth");
    }
  }, [user, loading, navigate]);

  const handleGameComplete = async (finalScore: number, totalScore: number, time: number) => {
    setScore(finalScore);
    setMaxScore(totalScore);
    setTimeTaken(time);
    setGameComplete(true);

    // Save score to database
    if (user && subject && unit && lesson && gameType) {
      setSaving(true);
      try {
        const { error } = await supabase.from("game_scores").insert({
          user_id: user.id,
          subject: subject.title,
          unit: unit.title,
          topic: lesson.title,
          game: gameType.title,
          score: finalScore,
          max_score: totalScore,
          time_taken: time,
        });
        
        if (error) throw error;
        toast.success("Score saved!");
      } catch (error) {
        console.error("Error saving score:", error);
        toast.error("Failed to save score");
      } finally {
        setSaving(false);
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-hero flex items-center justify-center">
        <Loader2 className="w-12 h-12 text-primary animate-spin" />
      </div>
    );
  }

  if (!user) return null;

  if (!subject || !unit || !lesson || !gameType || !gameData) {
    return (
      <div className="min-h-screen bg-gradient-hero flex items-center justify-center">
        <Card className="game-card p-8 text-center">
          <h2 className="text-2xl font-fredoka text-foreground mb-4">Game Not Found</h2>
          <Button onClick={() => navigate("/dashboard")} className="bg-gradient-primary">
            Go Back to Dashboard
          </Button>
        </Card>
      </div>
    );
  }

  const colorClass = subject.color === "yellow" ? "text-primary" : "text-secondary";
  const buttonClass = subject.color === "yellow" ? "bg-gradient-primary" : "bg-gradient-secondary";

  if (gameComplete) {
    const percentage = Math.round((score / maxScore) * 100);
    const isGreat = percentage >= 80;
    const isGood = percentage >= 60;

    return (
      <div className="min-h-screen bg-gradient-hero flex items-center justify-center p-4">
        <Card className="game-card w-full max-w-md animate-scale-up">
          <CardContent className="p-8 text-center">
            <div className={`w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center ${
              isGreat ? "bg-success/20" : isGood ? "bg-primary/20" : "bg-accent/20"
            }`}>
              <Trophy className={`w-10 h-10 ${
                isGreat ? "text-success" : isGood ? "text-primary" : "text-accent"
              }`} />
            </div>
            
            <h2 className="text-3xl font-fredoka text-foreground mb-2">
              {isGreat ? "Amazing!" : isGood ? "Good Job!" : "Keep Practicing!"}
            </h2>
            
            <p className="text-muted-foreground mb-6">
              You completed {gameType.title}
            </p>
            
            <div className="bg-card-foreground/5 rounded-xl p-6 mb-6">
              <div className="text-5xl font-fredoka mb-2">
                <span className={colorClass}>{score}</span>
                <span className="text-muted-foreground text-2xl">/{maxScore}</span>
              </div>
              <p className="text-sm text-muted-foreground">
                {percentage}% correct • {Math.floor(timeTaken / 60)}m {timeTaken % 60}s
              </p>
            </div>

            <div className="flex gap-3">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => navigate(`/subject/${subjectId}/unit/${unitId}/lesson/${lessonId}`)}
              >
                Back to Lesson
              </Button>
              <Button
                className={`flex-1 ${buttonClass}`}
                onClick={() => {
                  setGameComplete(false);
                  setScore(0);
                  setMaxScore(0);
                }}
                disabled={saving}
              >
                Play Again
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const renderGame = () => {
    const commonProps = {
      onComplete: handleGameComplete,
      subjectColor: subject.color,
    };

    switch (gameId) {
      case "crossword":
        return <CrosswordGame questions={gameData.crossword || []} {...commonProps} />;
      case "wordsearch":
        return <WordSearchGame questions={gameData.wordsearch || []} {...commonProps} />;
      case "dragdrop":
        return gameData.dragdrop ? <DragDropGame data={gameData.dragdrop} {...commonProps} /> : null;
      case "jigsaw":
        return <JigsawGame pieces={gameData.jigsaw || []} {...commonProps} />;
      case "fillblanks":
        return <FillBlanksGame questions={gameData.fillblanks || []} {...commonProps} />;
      case "memoryflip":
        return <MemoryFlipGame pairs={gameData.memoryflip || []} {...commonProps} />;
      case "matchit":
        return <MatchItGame questions={gameData.matchit || []} {...commonProps} />;
      case "fighttime":
        return <FightTimeGame questions={gameData.fighttime || []} {...commonProps} />;
      case "guessword":
        return <GuessWordGame questions={gameData.guessword || []} {...commonProps} />;
      case "conceptpuzzle":
        return <ConceptPuzzleGame questions={gameData.conceptpuzzle || []} {...commonProps} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-hero">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => navigate(`/subject/${subjectId}/unit/${unitId}/lesson/${lessonId}`)}
              className="text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <Logo size="sm" showText={false} />
          </div>
          <div className="text-center">
            <span className="text-3xl">{gameType.icon}</span>
            <h1 className="text-lg font-fredoka text-foreground">{gameType.title}</h1>
          </div>
          <div className="w-10" /> {/* Spacer */}
        </div>
      </header>

      {/* Game Content */}
      <main className="container mx-auto px-4 py-8">
        {renderGame()}
      </main>
    </div>
  );
}
