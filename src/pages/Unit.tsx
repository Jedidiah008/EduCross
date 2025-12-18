import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useAuth } from "@/hooks/useAuth";
import { getSubjectById, getUnitById } from "@/data/curriculum";
import { ArrowLeft, FileText, Loader2 } from "lucide-react";

export default function Unit() {
  const navigate = useNavigate();
  const { subjectId, unitId } = useParams<{ subjectId: string; unitId: string }>();
  const { user, loading } = useAuth();

  const subject = subjectId ? getSubjectById(subjectId) : undefined;
  const unit = subjectId && unitId ? getUnitById(subjectId, unitId) : undefined;

  useEffect(() => {
    if (!loading && !user) {
      navigate("/auth");
    }
  }, [user, loading, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-hero flex items-center justify-center">
        <Loader2 className="w-12 h-12 text-primary animate-spin" />
      </div>
    );
  }

  if (!user) return null;

  if (!subject || !unit) {
    return (
      <div className="min-h-screen bg-gradient-hero flex items-center justify-center">
        <Card className="game-card p-8 text-center">
          <h2 className="text-2xl font-fredoka text-foreground mb-4">Unit Not Found</h2>
          <Button onClick={() => navigate("/dashboard")} className="bg-gradient-primary">
            Go Back to Dashboard
          </Button>
        </Card>
      </div>
    );
  }

  const colorClass = subject.color === "yellow" ? "text-primary" : "text-secondary";
  const bgColorClass = subject.color === "yellow" ? "bg-primary/20" : "bg-secondary/20";
  const borderColorClass = subject.color === "yellow" ? "hover:border-primary" : "hover:border-secondary";
  const shadowClass = subject.color === "yellow" ? "hover:shadow-glow-yellow" : "hover:shadow-glow-blue";
  const buttonClass = subject.color === "yellow" ? "bg-gradient-primary" : "bg-gradient-secondary";

  return (
    <div className="min-h-screen bg-gradient-hero">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => navigate(`/subject/${subjectId}`)}
              className="text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <Logo size="sm" showText={false} />
          </div>
          <div className="text-right">
            <p className={`text-sm ${colorClass}`}>{subject.shortTitle}</p>
            <h1 className="text-lg font-fredoka text-foreground">{unit.title}</h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-8 animate-slide-up">
          <h2 className={`text-3xl font-fredoka ${colorClass} mb-2`}>Choose a Lesson</h2>
          <p className="text-muted-foreground">Select a lesson to start learning</p>
        </div>

        <div className="grid gap-4 max-w-3xl mx-auto">
          {unit.lessons.map((lesson, index) => (
            <Card 
              key={lesson.id}
              className={`game-card cursor-pointer border-2 ${borderColorClass} ${shadowClass} animate-slide-up`}
              style={{ animationDelay: `${index * 0.05}s` }}
              onClick={() => navigate(`/subject/${subjectId}/unit/${unitId}/lesson/${lesson.id}`)}
            >
              <CardContent className="flex items-center gap-4 p-5">
                <div className={`w-12 h-12 rounded-xl ${bgColorClass} flex items-center justify-center shrink-0`}>
                  <FileText className={`w-6 h-6 ${colorClass}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-fredoka text-foreground">{lesson.title}</h3>
                </div>
                <Button size="sm" className={`${buttonClass} hover:opacity-90 shrink-0`}>
                  Start
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}