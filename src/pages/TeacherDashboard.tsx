import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { ArrowLeft, Loader2, Users, Trophy, Clock, BookOpen } from "lucide-react";
import { format } from "date-fns";

interface GameScore {
  id: string;
  subject: string;
  unit: string;
  topic: string;
  game: string;
  score: number;
  max_score: number;
  time_taken: number | null;
  played_at: string;
  profiles: {
    full_name: string;
    nickname: string;
  } | null;
}

export default function TeacherDashboard() {
  const navigate = useNavigate();
  const { user, role, loading } = useAuth();
  const [scores, setScores] = useState<GameScore[]>([]);
  const [loadingScores, setLoadingScores] = useState(true);

  useEffect(() => {
    if (!loading && !user) {
      navigate("/auth");
      return;
    }

    if (!loading && role !== "teacher") {
      navigate("/dashboard");
      return;
    }
  }, [user, role, loading, navigate]);

  useEffect(() => {
    if (user && role === "teacher") {
      fetchScores();
    }
  }, [user, role]);

  async function fetchScores() {
    try {
      const { data, error } = await supabase
        .from("game_scores")
        .select(`
          *,
          profiles:user_id (
            full_name,
            nickname
          )
        `)
        .order("played_at", { ascending: false })
        .limit(100);

      if (error) throw error;
      setScores(data as unknown as GameScore[]);
    } catch (error) {
      console.error("Error fetching scores:", error);
    } finally {
      setLoadingScores(false);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-hero flex items-center justify-center">
        <Loader2 className="w-12 h-12 text-primary animate-spin" />
      </div>
    );
  }

  if (!user || role !== "teacher") return null;

  // Calculate stats
  const totalStudents = new Set(scores.map(s => s.profiles?.nickname)).size;
  const totalGamesPlayed = scores.length;
  const avgScore = scores.length > 0 
    ? Math.round(scores.reduce((acc, s) => acc + (s.score / s.max_score) * 100, 0) / scores.length) 
    : 0;

  return (
    <div className="min-h-screen bg-gradient-hero">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => navigate("/dashboard")}
              className="text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <Logo size="sm" showText={false} />
          </div>
          <h1 className="text-xl font-fredoka text-accent">Teacher Dashboard</h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid sm:grid-cols-3 gap-4 mb-8">
          <Card className="game-card">
            <CardContent className="flex items-center gap-4 p-6">
              <div className="w-14 h-14 rounded-xl bg-secondary/20 flex items-center justify-center">
                <Users className="w-7 h-7 text-secondary" />
              </div>
              <div>
                <p className="text-3xl font-fredoka text-foreground">{totalStudents}</p>
                <p className="text-muted-foreground">Active Students</p>
              </div>
            </CardContent>
          </Card>

          <Card className="game-card">
            <CardContent className="flex items-center gap-4 p-6">
              <div className="w-14 h-14 rounded-xl bg-primary/20 flex items-center justify-center">
                <BookOpen className="w-7 h-7 text-primary" />
              </div>
              <div>
                <p className="text-3xl font-fredoka text-foreground">{totalGamesPlayed}</p>
                <p className="text-muted-foreground">Games Played</p>
              </div>
            </CardContent>
          </Card>

          <Card className="game-card">
            <CardContent className="flex items-center gap-4 p-6">
              <div className="w-14 h-14 rounded-xl bg-accent/20 flex items-center justify-center">
                <Trophy className="w-7 h-7 text-accent" />
              </div>
              <div>
                <p className="text-3xl font-fredoka text-foreground">{avgScore}%</p>
                <p className="text-muted-foreground">Average Score</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Scores Table */}
        <Card className="game-card">
          <CardHeader>
            <CardTitle className="font-fredoka text-foreground">Student Performance</CardTitle>
          </CardHeader>
          <CardContent>
            {loadingScores ? (
              <div className="flex justify-center py-8">
                <Loader2 className="w-8 h-8 text-primary animate-spin" />
              </div>
            ) : scores.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <BookOpen className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>No game scores yet. Students will appear here after they play games.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="border-border">
                      <TableHead className="text-muted-foreground">Student</TableHead>
                      <TableHead className="text-muted-foreground">Subject</TableHead>
                      <TableHead className="text-muted-foreground">Topic</TableHead>
                      <TableHead className="text-muted-foreground">Game</TableHead>
                      <TableHead className="text-muted-foreground">Score</TableHead>
                      <TableHead className="text-muted-foreground">Time</TableHead>
                      <TableHead className="text-muted-foreground">Finished At</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {scores.map((score) => (
                      <TableRow key={score.id} className="border-border">
                        <TableCell className="font-medium text-foreground">
                          {score.profiles?.full_name || "Unknown"}
                        </TableCell>
                        <TableCell className="text-foreground">{score.subject}</TableCell>
                        <TableCell className="text-foreground">{score.topic}</TableCell>
                        <TableCell className="text-foreground">{score.game}</TableCell>
                        <TableCell>
                          <span className={`font-semibold ${
                            (score.score / score.max_score) >= 0.7 
                              ? "text-success" 
                              : (score.score / score.max_score) >= 0.4 
                                ? "text-primary" 
                                : "text-destructive"
                          }`}>
                            {score.score}/{score.max_score}
                          </span>
                        </TableCell>
                        <TableCell className="text-muted-foreground">
                          {score.time_taken ? `${score.time_taken}s` : "-"}
                        </TableCell>
                        <TableCell className="text-muted-foreground">
                          {format(new Date(score.played_at), "MMM d, yyyy, p")}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
}