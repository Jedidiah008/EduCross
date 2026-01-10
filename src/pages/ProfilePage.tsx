import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '@/lib/auth';
import { supabase } from '@/integrations/supabase/client';
import { EduCrossLogo } from '@/components/EduCrossLogo';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { toast } from 'sonner';
import { 
  ArrowLeft, 
  Camera, 
  Edit2, 
  Save, 
  X, 
  Trophy, 
  Gamepad2, 
  BookOpen,
  TrendingUp,
  Clock,
  Target
} from 'lucide-react';
import { subjects } from '@/data/subjects';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface GameScore {
  id: string;
  score: number;
  max_score: number;
  game_type: string;
  subject: string;
  topic: string;
  played_at: string;
}

interface LessonView {
  id: string;
  subject_id: string;
  unit_id: string;
  viewed_at: string;
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

export default function ProfilePage() {
  const navigate = useNavigate();
  const { user, profile, refreshProfile, loading: authLoading } = useAuth();
  const [editing, setEditing] = useState(false);
  const [fullName, setFullName] = useState('');
  const [nickname, setNickname] = useState('');
  const [saving, setSaving] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [scores, setScores] = useState<GameScore[]>([]);
  const [lessonViews, setLessonViews] = useState<LessonView[]>([]);
  const [section, setSection] = useState<Section | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/login');
    }
  }, [user, authLoading, navigate]);

  useEffect(() => {
    if (profile) {
      setFullName(profile.full_name);
      setNickname(profile.nickname);
    }
  }, [profile]);

  useEffect(() => {
    if (user) {
      fetchProfileData();
    }
  }, [user]);

  const fetchProfileData = async () => {
    if (!user) return;
    setLoading(true);
    
    try {
      // Fetch avatar URL
      const { data: profileData } = await supabase
        .from('profiles')
        .select('avatar_url, section_id')
        .eq('user_id', user.id)
        .maybeSingle();
      
      if (profileData?.avatar_url) {
        setAvatarUrl(profileData.avatar_url);
      }

      // Fetch section name
      if (profileData?.section_id) {
        const { data: sectionData } = await supabase
          .from('sections')
          .select('*')
          .eq('id', profileData.section_id)
          .maybeSingle();
        
        if (sectionData) {
          setSection(sectionData);
        }
      }

      // Fetch game scores
      const { data: scoresData } = await supabase
        .from('game_scores')
        .select('*')
        .eq('user_id', user.id)
        .order('played_at', { ascending: false });
      
      if (scoresData) {
        setScores(scoresData);
      }

      // Fetch lesson views
      const { data: viewsData } = await supabase
        .from('lesson_views')
        .select('*')
        .eq('user_id', user.id)
        .order('viewed_at', { ascending: false });
      
      if (viewsData) {
        setLessonViews(viewsData);
      }
    } catch (error) {
      console.error('Error fetching profile data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!user) return;
    setSaving(true);

    try {
      const { error } = await supabase
        .from('profiles')
        .update({ full_name: fullName, nickname })
        .eq('user_id', user.id);

      if (error) throw error;

      await refreshProfile();
      setEditing(false);
      toast.success('Profile updated successfully!');
    } catch (error: any) {
      toast.error(error.message || 'Failed to update profile');
    } finally {
      setSaving(false);
    }
  };

  const handleAvatarUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !user) return;

    setUploading(true);
    try {
      const fileExt = file.name.split('.').pop();
      const filePath = `${user.id}/avatar.${fileExt}`;

      // Upload file
      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file, { upsert: true });

      if (uploadError) throw uploadError;

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('avatars')
        .getPublicUrl(filePath);

      // Update profile with avatar URL
      const { error: updateError } = await supabase
        .from('profiles')
        .update({ avatar_url: publicUrl })
        .eq('user_id', user.id);

      if (updateError) throw updateError;

      setAvatarUrl(publicUrl);
      toast.success('Profile picture updated!');
    } catch (error: any) {
      toast.error(error.message || 'Failed to upload avatar');
    } finally {
      setUploading(false);
    }
  };

  const getSubjectName = (subjectId: string) => {
    return subjects[subjectId]?.shortTitle || subjectId;
  };

  const getUnitName = (subjectId: string, unitId: string) => {
    const subject = subjects[subjectId];
    if (!subject) return unitId;
    const unit = subject.units.find(u => u.id === unitId);
    return unit?.title || unitId;
  };

  const getGameName = (gameId: string) => {
    return gameTypes.find(g => g.id === gameId)?.name || gameId;
  };

  // Calculate stats
  const totalGamesPlayed = scores.length;
  const averageScore = scores.length > 0
    ? Math.round(scores.reduce((acc, s) => acc + (s.score / s.max_score) * 100, 0) / scores.length)
    : 0;
  const totalLessonsViewed = new Set(lessonViews.map(v => `${v.subject_id}-${v.unit_id}`)).size;

  // Performance by game type
  const performanceByGame = gameTypes.map(game => {
    const gameScores = scores.filter(s => s.game_type === game.id);
    const avg = gameScores.length > 0
      ? Math.round(gameScores.reduce((acc, s) => acc + (s.score / s.max_score) * 100, 0) / gameScores.length)
      : 0;
    return { name: game.name.substring(0, 8), fullName: game.name, average: avg, count: gameScores.length };
  }).filter(g => g.count > 0);

  if (authLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
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
            <h1 className="font-display text-xl font-bold text-foreground">My Profile</h1>
            <div className="w-10" />
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-5xl">
        {/* Profile Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Card className="border-2 border-primary/20">
            <CardContent className="p-6">
              <div className="flex flex-col sm:flex-row items-center gap-6">
                {/* Avatar */}
                <div className="relative">
                  <Avatar className="h-24 w-24 border-4 border-primary/30">
                    <AvatarImage src={avatarUrl || undefined} />
                    <AvatarFallback className="bg-gradient-to-br from-primary to-accent text-2xl text-primary-foreground">
                      {profile?.full_name?.charAt(0) || 'U'}
                    </AvatarFallback>
                  </Avatar>
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    disabled={uploading}
                    className="absolute bottom-0 right-0 p-2 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
                  >
                    {uploading ? (
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                    ) : (
                      <Camera size={16} />
                    )}
                  </button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleAvatarUpload}
                    className="hidden"
                  />
                </div>

                {/* Profile Info */}
                <div className="flex-1 text-center sm:text-left">
                  {editing ? (
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="fullName">Full Name</Label>
                        <Input
                          id="fullName"
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                        />
                      </div>
                      <div>
                        <Label htmlFor="nickname">Nickname</Label>
                        <Input
                          id="nickname"
                          value={nickname}
                          onChange={(e) => setNickname(e.target.value)}
                        />
                      </div>
                      <div className="flex gap-2">
                        <Button onClick={handleSave} disabled={saving}>
                          {saving ? (
                            <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent mr-2" />
                          ) : (
                            <Save size={16} className="mr-2" />
                          )}
                          Save
                        </Button>
                        <Button variant="outline" onClick={() => setEditing(false)}>
                          <X size={16} className="mr-2" />
                          Cancel
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <h2 className="font-display text-2xl font-bold text-foreground">
                        {profile?.full_name}
                      </h2>
                      <p className="text-muted-foreground">@{profile?.nickname}</p>
                      {section && (
                        <span className="inline-block mt-2 px-3 py-1 rounded-full bg-secondary/20 text-secondary text-sm font-bold">
                          Section {section.name}
                        </span>
                      )}
                      <Button
                        variant="outline"
                        size="sm"
                        className="mt-4"
                        onClick={() => setEditing(true)}
                      >
                        <Edit2 size={16} className="mr-2" />
                        Edit Profile
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
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
            transition={{ delay: 0.2 }}
          >
            <Card className="border-2 border-game-green/20">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Average Score
                </CardTitle>
                <Target className="h-5 w-5 text-game-green" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-display font-bold">{averageScore}%</div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="border-2 border-primary/20">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Lessons Viewed
                </CardTitle>
                <BookOpen className="h-5 w-5 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-display font-bold">{totalLessonsViewed}</div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Performance Chart */}
        {performanceByGame.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mb-8 bg-card rounded-xl border-2 border-border p-4"
          >
            <h3 className="font-display font-bold text-lg mb-4 flex items-center gap-2">
              <TrendingUp size={20} className="text-primary" />
              Performance by Game Type
            </h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={performanceByGame}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                <XAxis dataKey="name" fontSize={12} />
                <YAxis fontSize={12} domain={[0, 100]} />
                <Tooltip 
                  formatter={(value, _, props) => [`${value}%`, props.payload.fullName]}
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))', 
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }} 
                />
                <Bar dataKey="average" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>
        )}

        {/* Recent Games */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mb-8 bg-card rounded-xl border-2 border-border overflow-hidden"
        >
          <div className="p-4 border-b border-border">
            <h3 className="font-display font-bold text-lg flex items-center gap-2">
              <Trophy size={20} className="text-game-yellow" />
              Recent Game Scores
            </h3>
          </div>
          {scores.length === 0 ? (
            <div className="p-8 text-center text-muted-foreground">
              No games played yet. Start playing to see your scores here!
            </div>
          ) : (
            <div className="divide-y divide-border">
              {scores.slice(0, 10).map((score) => (
                <div key={score.id} className="p-4 flex items-center justify-between">
                  <div>
                    <p className="font-medium text-foreground">{getGameName(score.game_type)}</p>
                    <p className="text-sm text-muted-foreground">
                      {getSubjectName(score.subject)} • {score.topic}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-display font-bold text-lg">
                      {score.score}/{score.max_score}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(score.played_at).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </motion.div>

        {/* Lesson History */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-card rounded-xl border-2 border-border overflow-hidden"
        >
          <div className="p-4 border-b border-border">
            <h3 className="font-display font-bold text-lg flex items-center gap-2">
              <Clock size={20} className="text-accent" />
              Lesson History
            </h3>
          </div>
          {lessonViews.length === 0 ? (
            <div className="p-8 text-center text-muted-foreground">
              No lessons viewed yet. Start learning to see your history here!
            </div>
          ) : (
            <div className="divide-y divide-border">
              {lessonViews.slice(0, 10).map((view) => (
                <div key={view.id} className="p-4 flex items-center justify-between">
                  <div>
                    <p className="font-medium text-foreground">
                      {getUnitName(view.subject_id, view.unit_id)}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {getSubjectName(view.subject_id)}
                    </p>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {new Date(view.viewed_at).toLocaleDateString()}
                  </p>
                </div>
              ))}
            </div>
          )}
        </motion.div>
      </main>
    </div>
  );
}
