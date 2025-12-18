import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useAuth } from "@/hooks/useAuth";
import { getSubjectById, getUnitById, getLessonById, gameTypes } from "@/data/curriculum";
import { getLessonContent } from "@/data/lessonContent";
import { ArrowLeft, ArrowRight, ChevronLeft, ChevronRight, Gamepad2, Loader2 } from "lucide-react";

export default function Lesson() {
  const navigate = useNavigate();
  const { subjectId, unitId, lessonId } = useParams<{ subjectId: string; unitId: string; lessonId: string }>();
  const { user, loading } = useAuth();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showGames, setShowGames] = useState(false);

  const subject = subjectId ? getSubjectById(subjectId) : undefined;
  const unit = subjectId && unitId ? getUnitById(subjectId, unitId) : undefined;
  const lesson = subjectId && unitId && lessonId ? getLessonById(subjectId, unitId, lessonId) : undefined;
  const lessonContent = lessonId ? getLessonContent(lessonId) : null;

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

  if (!subject || !unit || !lesson || !lessonContent) {
    return (
      <div className="min-h-screen bg-gradient-hero flex items-center justify-center">
        <Card className="game-card p-8 text-center">
          <h2 className="text-2xl font-fredoka text-foreground mb-4">Lesson Not Found</h2>
          <Button onClick={() => navigate("/dashboard")} className="bg-gradient-primary">
            Go Back to Dashboard
          </Button>
        </Card>
      </div>
    );
  }

  const colorClass = subject.color === "yellow" ? "text-primary" : "text-secondary";
  const bgColorClass = subject.color === "yellow" ? "bg-primary/20" : "bg-secondary/20";
  const buttonClass = subject.color === "yellow" ? "bg-gradient-primary" : "bg-gradient-secondary";
  const borderColorClass = subject.color === "yellow" ? "border-primary" : "border-secondary";

  const totalSlides = lessonContent.slides.length;
  const isLastSlide = currentSlide === totalSlides - 1;

  const handleNext = () => {
    if (isLastSlide) {
      setShowGames(true);
    } else {
      setCurrentSlide(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentSlide > 0) {
      setCurrentSlide(prev => prev - 1);
    }
  };

  if (showGames) {
    return (
      <div className="min-h-screen bg-gradient-hero">
        {/* Header */}
        <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => setShowGames(false)}
                className="text-muted-foreground hover:text-foreground"
              >
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <Logo size="sm" showText={false} />
            </div>
            <h1 className="text-lg font-fredoka text-foreground">Choose a Game</h1>
          </div>
        </header>

        <main className="container mx-auto px-4 py-8">
          <div className="text-center mb-8 animate-slide-up">
            <Gamepad2 className={`w-16 h-16 mx-auto mb-4 ${colorClass}`} />
            <h2 className={`text-3xl font-fredoka ${colorClass} mb-2`}>Test Your Knowledge!</h2>
            <p className="text-muted-foreground">Choose a game to practice what you've learned</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
            {gameTypes.map((game, index) => (
              <Card 
                key={game.id}
                className={`game-card cursor-pointer border-2 hover:${borderColorClass} animate-slide-up`}
                style={{ animationDelay: `${index * 0.05}s` }}
                onClick={() => navigate(`/subject/${subjectId}/unit/${unitId}/lesson/${lessonId}/game/${game.id}`)}
              >
                <CardContent className="p-6 text-center">
                  <span className="text-4xl mb-3 block">{game.icon}</span>
                  <h3 className="text-lg font-fredoka text-foreground mb-2">{game.title}</h3>
                  <p className="text-sm text-muted-foreground">{game.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-hero">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => navigate(`/subject/${subjectId}/unit/${unitId}`)}
              className="text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <Logo size="sm" showText={false} />
          </div>
          <div className="text-right">
            <p className={`text-sm ${colorClass}`}>{unit.title}</p>
            <h1 className="text-lg font-fredoka text-foreground truncate max-w-[200px]">{lesson.title}</h1>
          </div>
        </div>
      </header>

      {/* Slide Content */}
      <main className="container mx-auto px-4 py-8">
        <Card className="game-card max-w-4xl mx-auto animate-slide-up">
          <CardContent className="p-8">
            {/* Slide indicator */}
            <div className="flex justify-center gap-2 mb-6">
              {lessonContent.slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    index === currentSlide 
                      ? `${subject.color === "yellow" ? "bg-primary" : "bg-secondary"} scale-125` 
                      : "bg-muted hover:bg-muted-foreground"
                  }`}
                />
              ))}
            </div>

            {/* Slide content */}
            <div className="text-center mb-8">
              <div className={`inline-block px-4 py-1 rounded-full ${bgColorClass} mb-4`}>
                <span className={`text-sm font-semibold ${colorClass}`}>
                  Slide {currentSlide + 1} of {totalSlides}
                </span>
              </div>
              <h2 className={`text-3xl font-fredoka ${colorClass} mb-6`}>
                {lessonContent.slides[currentSlide].title}
              </h2>
              <p className="text-lg text-foreground leading-relaxed max-w-2xl mx-auto">
                {lessonContent.slides[currentSlide].content}
              </p>
            </div>

            {/* Navigation */}
            <div className="flex justify-between items-center">
              <Button
                variant="outline"
                onClick={handlePrev}
                disabled={currentSlide === 0}
                className="border-border text-foreground disabled:opacity-50"
              >
                <ChevronLeft className="w-4 h-4 mr-2" />
                Previous
              </Button>

              <Button
                onClick={handleNext}
                className={`${buttonClass} hover:opacity-90`}
              >
                {isLastSlide ? (
                  <>
                    Play Games
                    <Gamepad2 className="w-4 h-4 ml-2" />
                  </>
                ) : (
                  <>
                    Next
                    <ChevronRight className="w-4 h-4 ml-2" />
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}