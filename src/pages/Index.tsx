import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { Loader2, Sparkles, Gamepad2, GraduationCap, Trophy } from "lucide-react";

export default function Index() {
  const navigate = useNavigate();
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading && user) {
      navigate("/dashboard");
    }
  }, [user, loading, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-hero flex items-center justify-center">
        <Loader2 className="w-12 h-12 text-primary animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-hero overflow-hidden">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16 min-h-screen flex flex-col items-center justify-center text-center">
        <div className="animate-float mb-8">
          <Logo size="xl" />
        </div>

        <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mb-8 animate-slide-up" style={{ animationDelay: "0.2s" }}>
          Learn Chemistry and Physics through fun, interactive games!
        </p>

        <div className="flex flex-col sm:flex-row gap-4 mb-16 animate-slide-up" style={{ animationDelay: "0.3s" }}>
          <Button 
            size="lg" 
            className="bg-gradient-primary hover:opacity-90 font-fredoka text-lg h-14 px-8"
            onClick={() => navigate("/auth")}
          >
            <Sparkles className="w-5 h-5 mr-2" />
            Get Started
          </Button>
          <Button 
            size="lg" 
            variant="outline"
            className="border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground font-fredoka text-lg h-14 px-8"
            onClick={() => navigate("/auth")}
          >
            Sign In
          </Button>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-6 max-w-4xl w-full">
          <div className="game-card p-6 text-center animate-slide-up" style={{ animationDelay: "0.4s" }}>
            <div className="w-16 h-16 mx-auto rounded-2xl bg-primary/20 flex items-center justify-center mb-4">
              <Gamepad2 className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-xl font-fredoka text-foreground mb-2">10 Game Types</h3>
            <p className="text-muted-foreground text-sm">
              Crossword, Word Search, Memory Flip, and more!
            </p>
          </div>

          <div className="game-card p-6 text-center animate-slide-up" style={{ animationDelay: "0.5s" }}>
            <div className="w-16 h-16 mx-auto rounded-2xl bg-secondary/20 flex items-center justify-center mb-4">
              <GraduationCap className="w-8 h-8 text-secondary" />
            </div>
            <h3 className="text-xl font-fredoka text-foreground mb-2">2 Subjects</h3>
            <p className="text-muted-foreground text-sm">
              General Chemistry 1 and General Physics 1
            </p>
          </div>

          <div className="game-card p-6 text-center animate-slide-up" style={{ animationDelay: "0.6s" }}>
            <div className="w-16 h-16 mx-auto rounded-2xl bg-accent/20 flex items-center justify-center mb-4">
              <Trophy className="w-8 h-8 text-accent" />
            </div>
            <h3 className="text-xl font-fredoka text-foreground mb-2">Track Progress</h3>
            <p className="text-muted-foreground text-sm">
              Teachers can monitor student performance
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}