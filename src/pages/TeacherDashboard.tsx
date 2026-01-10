import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '@/lib/auth';
import { supabase } from '@/integrations/supabase/client';
import { EduCrossLogo } from '@/components/EduCrossLogo';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { ArrowLeft, Trophy, Users, BookOpen, Gamepad2, TrendingUp, GraduationCap } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, PieChart, Pie, Cell } from 'recharts';
import { subjects } from '@/data/subjects';
import { SectionLeaderboard } from '@/components/SectionLeaderboard';
import { Leaderboard } from '@/components/Leaderboard';

interface ScoreWithProfile {
  id: string;
  user_id: string;
  score: number;
  max_score: number;
  game_type: string;
  subject: string;
  topic: string;
  played_at: string;
  profile: {
    full_name: string;
    nickname: string;
    section_id: string | null;
  } | null;
}

interface Section {
  id: string;
  name: string;
}

const gameTypes = [
  { id: 'snake', name: 'Snake Game' },
  { id: 'word-search', name: 'Word Search' },
  { id: 'drag-drop', name: 'Drag & Drop' },
  { id: 'jigsaw', name: 'Jigsaw Puzzle' },
  { id: 'fill-blanks', name: 'Fill in the Blanks' },
  { id: 'memory-flip', name: 'Memory Flip' },
  { id: 'match-it', name: 'Match It' },
  { id: 'fight-time', name: 'Fight Time' },
  { id: 'guess-word', name: 'Guess the Word' },
  { id: 'concept-puzzle', name: 'Concept Puzzle' },
];

export default function TeacherDashboard() {
  const navigate = useNavigate();
  const { user, profile, userRole, loading: authLoading } = useAuth();
  const isTeacher = userRole === 'teacher';
  const [scores, setScores] = useState<ScoreWithProfile[]>([]);
  const [sections, setSections] = useState<Section[]>([]);
  const [loading, setLoading] = useState(true);

  // Filters
  const [selectedSection, setSelectedSection] = useState<string>('all');
  const [selectedSubject, setSelectedSubject] = useState<string>('all');
  const [selectedGameType, setSelectedGameType] = useState<string>('all');

  useEffect(() => {
    if (!authLoading && (!user || !isTeacher)) {
      navigate('/dashboard');
    }
  }, [user, isTeacher, authLoading, navigate]);

  useEffect(() => {
    if (user && isTeacher) {
      fetchData();
    }
  }, [user, isTeacher]);

  const fetchData = async () => {
    setLoading(true);
    try {
      // Fetch sections
      const { data: sectionsData } = await supabase
        .from('sections')
        .select('*')
        .order('name');
      
      setSections(sectionsData || []);

      // Fetch all scores with profile info
      const { data: scoresData } = await supabase
        .from('game_scores')
        .select('*')
        .order('played_at', { ascending: false });

      if (scoresData) {
        // Fetch profiles for all unique user_ids
        const userIds = [...new Set(scoresData.map(s => s.user_id))];
        const { data: profilesData } = await supabase
          .from('profiles')
          .select('user_id, full_name, nickname, section_id')
          .in('user_id', userIds);

        const profilesMap = new Map(profilesData?.map(p => [p.user_id, p]) || []);

        const scoresWithProfiles: ScoreWithProfile[] = scoresData.map(score => ({
          ...score,
          profile: profilesMap.get(score.user_id) || null,
        }));

        setScores(scoresWithProfiles);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredScores = scores.filter(score => {
    if (selectedSection !== 'all' && score.profile?.section_id !== selectedSection) {
      return false;
    }
    if (selectedSubject !== 'all' && score.subject !== selectedSubject) {
      return false;
    }
    if (selectedGameType !== 'all' && score.game_type !== selectedGameType) {
      return false;
    }
    return true;
  });

  const getSubjectName = (subjectId: string) => {
    return subjects[subjectId]?.shortTitle || subjectId;
  };

  const getGameName = (gameId: string) => {
    return gameTypes.find(g => g.id === gameId)?.name || gameId;
  };

  const getSectionName = (sectionId: string | null) => {
    if (!sectionId) return 'No Section';
    return sections.find(s => s.id === sectionId)?.name || 'Unknown';
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  // Calculate stats
  const totalStudents = new Set(filteredScores.map(s => s.user_id)).size;
  const totalGamesPlayed = filteredScores.length;
  const averageScore = filteredScores.length > 0
    ? Math.round(filteredScores.reduce((acc, s) => acc + (s.score / s.max_score) * 100, 0) / filteredScores.length)
    : 0;

  // Score distribution data for chart
  const scoreDistribution = [
    { range: '0-20%', count: filteredScores.filter(s => (s.score / s.max_score) * 100 <= 20).length },
    { range: '21-40%', count: filteredScores.filter(s => { const p = (s.score / s.max_score) * 100; return p > 20 && p <= 40; }).length },
    { range: '41-60%', count: filteredScores.filter(s => { const p = (s.score / s.max_score) * 100; return p > 40 && p <= 60; }).length },
    { range: '61-80%', count: filteredScores.filter(s => { const p = (s.score / s.max_score) * 100; return p > 60 && p <= 80; }).length },
    { range: '81-100%', count: filteredScores.filter(s => (s.score / s.max_score) * 100 > 80).length },
  ];

  // Games played by type
  const gamesByType = gameTypes.map(game => ({
    name: game.name.substring(0, 10),
    fullName: game.name,
    count: filteredScores.filter(s => s.game_type === game.id).length,
  })).filter(g => g.count > 0);

  const COLORS = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD', '#98D8C8', '#F7DC6F'];

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!isTeacher) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" onClick={() => navigate('/dashboard')}>
                <ArrowLeft size={20} />
              </Button>
              <EduCrossLogo size="sm" />
            </div>
            <h1 className="font-display text-xl font-bold text-foreground">
              Teacher Dashboard
            </h1>
            <div className="w-10" />
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="border-2 border-primary/20">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Total Students
                </CardTitle>
                <Users className="h-5 w-5 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-display font-bold">{totalStudents}</div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="border-2 border-accent/20">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Games Played
                </CardTitle>
                <Gamepad2 className="h-5 w-5 text-accent" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-display font-bold">{totalGamesPlayed}</div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="border-2 border-game-green/20">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Average Score
                </CardTitle>
                <Trophy className="h-5 w-5 text-game-green" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-display font-bold">{averageScore}%</div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Score Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-card rounded-xl border-2 border-border p-4"
          >
            <h3 className="font-display font-bold text-lg mb-4 flex items-center gap-2">
              <TrendingUp size={20} className="text-primary" />
              Score Distribution
            </h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={scoreDistribution}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                <XAxis dataKey="range" fontSize={12} />
                <YAxis fontSize={12} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))', 
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }} 
                />
                <Bar dataKey="count" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-card rounded-xl border-2 border-border p-4"
          >
            <h3 className="font-display font-bold text-lg mb-4 flex items-center gap-2">
              <Gamepad2 size={20} className="text-accent" />
              Games Played by Type
            </h3>
            {gamesByType.length > 0 ? (
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={gamesByType}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="count"
                  >
                    {gamesByType.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value, _, props) => [value, props.payload.fullName]}
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))', 
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px'
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-[250px] flex items-center justify-center text-muted-foreground">
                No game data available
              </div>
            )}
          </motion.div>
        </div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-card rounded-xl border-2 border-border p-4 mb-6"
        >
          <h2 className="font-display font-bold text-lg mb-4 flex items-center gap-2">
            <BookOpen size={20} className="text-primary" />
            Filters
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="text-sm font-medium text-muted-foreground mb-2 block">
                Section
              </label>
              <Select value={selectedSection} onValueChange={setSelectedSection}>
                <SelectTrigger>
                  <SelectValue placeholder="All Sections" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Sections</SelectItem>
                  {sections.map(section => (
                    <SelectItem key={section.id} value={section.id}>
                      {section.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium text-muted-foreground mb-2 block">
                Subject
              </label>
              <Select value={selectedSubject} onValueChange={setSelectedSubject}>
                <SelectTrigger>
                  <SelectValue placeholder="All Subjects" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Subjects</SelectItem>
                  {Object.values(subjects).map(subject => (
                    <SelectItem key={subject.id} value={subject.id}>
                      {subject.shortTitle}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium text-muted-foreground mb-2 block">
                Game Type
              </label>
              <Select value={selectedGameType} onValueChange={setSelectedGameType}>
                <SelectTrigger>
                  <SelectValue placeholder="All Games" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Games</SelectItem>
                  {gameTypes.map(game => (
                    <SelectItem key={game.id} value={game.id}>
                      {game.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </motion.div>

        {/* Scores Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-card rounded-xl border-2 border-border overflow-hidden"
        >
          <div className="p-4 border-b border-border">
            <h2 className="font-display font-bold text-lg flex items-center gap-2">
              <Trophy size={20} className="text-game-yellow" />
              Student Scores ({filteredScores.length})
            </h2>
          </div>
          
          {filteredScores.length === 0 ? (
            <div className="p-8 text-center text-muted-foreground">
              No scores found matching the selected filters.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Student</TableHead>
                    <TableHead>Section</TableHead>
                    <TableHead>Subject</TableHead>
                    <TableHead>Game</TableHead>
                    <TableHead className="text-center">Score</TableHead>
                    <TableHead className="text-right">Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredScores.map((score, index) => (
                    <motion.tr
                      key={score.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.02 }}
                      className="border-b border-border hover:bg-muted/50"
                    >
                      <TableCell className="font-medium">
                        {score.profile?.full_name || 'Unknown'}
                        <div className="text-xs text-muted-foreground">
                          @{score.profile?.nickname || 'unknown'}
                        </div>
                      </TableCell>
                      <TableCell>{getSectionName(score.profile?.section_id || null)}</TableCell>
                      <TableCell>{getSubjectName(score.subject)}</TableCell>
                      <TableCell>{getGameName(score.game_type)}</TableCell>
                      <TableCell className="text-center">
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-sm font-medium ${
                          (score.score / score.max_score) >= 0.8
                            ? 'bg-game-green/20 text-game-green'
                            : (score.score / score.max_score) >= 0.6
                            ? 'bg-game-yellow/20 text-game-yellow'
                            : 'bg-game-red/20 text-game-red'
                        }`}>
                          {score.score}/{score.max_score}
                        </span>
                      </TableCell>
                      <TableCell className="text-right text-muted-foreground text-sm">
                        {formatDate(score.played_at)}
                      </TableCell>
                    </motion.tr>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </motion.div>

        {/* Section Rankings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-8"
        >
          <SectionLeaderboard />
        </motion.div>

        {/* Overall Leaderboard */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="mt-8"
        >
          <Leaderboard showAllSections={true} />
        </motion.div>
      </main>
    </div>
  );
}
