import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/hooks/useAuth";
import { subjects } from "@/data/curriculum";
import { LogOut, Beaker, Atom, BarChart3, Loader2 } from "lucide-react";

export default function Dashboard() {
  const navigate = useNavigate();
  const { user, profile, role, loading, signOut } = useAuth();

  useEffect(() => {
    if (!loading && !user) {
      navigate("/auth");
    }
  }, [user, loading, navigate]);

  const handleSignOut = async () => {
    await signOut();
    navigate("/auth");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-hero flex items-center justify-center">
        <Loader2 className="w-12 h-12 text-primary animate-spin" />
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gradient-hero">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Logo size="sm" />
          
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-foreground font-semibold">{profile?.nickname || "User"}</p>
              <p className="text-xs text-muted-foreground capitalize">{role || "Student"}</p>
            </div>
            <Button 
              variant="outline" 
              size="icon" 
              onClick={handleSignOut}
              className="border-border hover:bg-destructive hover:text-destructive-foreground hover:border-destructive"
            >
              <LogOut className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <div className="text-center mb-12 animate-slide-up">
          <Logo size="xl" />
          <p className="text-xl text-muted-foreground mt-4">
            {role === "teacher" 
              ? "Monitor student progress and performance" 
              : "Choose a subject to start learning!"}
          </p>
        </div>

        {/* Teacher Dashboard Link */}
        {role === "teacher" && (
          <div className="mb-8 animate-slide-up" style={{ animationDelay: "0.1s" }}>
            <Card 
              className="game-card cursor-pointer border-2 border-accent/50 hover:border-accent"
              onClick={() => navigate("/teacher")}
            >
              <CardContent className="flex items-center gap-4 p-6">
                <div className="w-16 h-16 rounded-xl bg-accent/20 flex items-center justify-center">
                  <BarChart3 className="w-8 h-8 text-accent" />
                </div>
                <div>
                  <h3 className="text-xl font-fredoka text-foreground">Teacher Dashboard</h3>
                  <p className="text-muted-foreground">View student performance and scores</p>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Subject Cards */}
        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {subjects.map((subject, index) => (
            <Card 
              key={subject.id}
              className={`game-card cursor-pointer border-2 transition-all duration-300 animate-slide-up ${
                subject.color === "yellow" 
                  ? "hover:border-primary hover:shadow-glow-yellow" 
                  : "hover:border-secondary hover:shadow-glow-blue"
              }`}
              style={{ animationDelay: `${0.2 + index * 0.1}s` }}
              onClick={() => navigate(`/subject/${subject.id}`)}
            >
              <CardHeader className="text-center pb-2">
                <div className={`w-24 h-24 mx-auto rounded-2xl flex items-center justify-center mb-4 ${
                  subject.color === "yellow" ? "bg-primary/20" : "bg-secondary/20"
                }`}>
                  {subject.color === "yellow" ? (
                    <Beaker className={`w-12 h-12 text-primary`} />
                  ) : (
                    <Atom className={`w-12 h-12 text-secondary`} />
                  )}
                </div>
                <CardTitle className={`text-2xl font-fredoka ${
                  subject.color === "yellow" ? "text-primary" : "text-secondary"
                }`}>
                  {subject.title}
                </CardTitle>
                <CardDescription className="text-muted-foreground">
                  {subject.units.length} Units • {subject.units.reduce((acc, u) => acc + u.lessons.length, 0)} Lessons
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <Button 
                  className={`font-fredoka ${
                    subject.color === "yellow" 
                      ? "bg-gradient-primary hover:opacity-90" 
                      : "bg-gradient-secondary hover:opacity-90"
                  }`}
                >
                  Start Learning
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}