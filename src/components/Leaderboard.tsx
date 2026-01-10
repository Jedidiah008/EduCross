import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { supabase } from '@/integrations/supabase/client';
import { Trophy, Medal, Award, Crown } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface LeaderboardEntry {
  user_id: string;
  full_name: string;
  nickname: string;
  section_id: string | null;
  section_name: string | null;
  total_score: number;
  games_played: number;
  average_percentage: number;
}

interface Section {
  id: string;
  name: string;
}

interface LeaderboardProps {
  userSectionId?: string | null;
  showAllSections?: boolean;
}

export function Leaderboard({ userSectionId, showAllSections = false }: LeaderboardProps) {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [sections, setSections] = useState<Section[]>([]);
  const [selectedSection, setSelectedSection] = useState<string>(userSectionId || 'all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSections();
  }, []);

  useEffect(() => {
    if (userSectionId && !showAllSections) {
      setSelectedSection(userSectionId);
    }
    fetchLeaderboard();
  }, [userSectionId, showAllSections, selectedSection]);

  const fetchSections = async () => {
    const { data } = await supabase.from('sections').select('*').order('name');
    if (data) setSections(data);
  };

  const fetchLeaderboard = async () => {
    setLoading(true);
    try {
      // Fetch all scores
      const { data: scores } = await supabase.from('game_scores').select('*');
      
      if (!scores || scores.length === 0) {
        setLeaderboard([]);
        setLoading(false);
        return;
      }

      // Fetch all profiles
      const userIds = [...new Set(scores.map(s => s.user_id))];
      const { data: profiles } = await supabase
        .from('profiles')
        .select('user_id, full_name, nickname, section_id')
        .in('user_id', userIds);

      const { data: sectionsData } = await supabase.from('sections').select('*');
      const sectionsMap = new Map(sectionsData?.map(s => [s.id, s.name]) || []);

      // Calculate leaderboard
      const userScores = new Map<string, { 
        total_score: number; 
        max_score: number;
        games_played: number; 
        profile: typeof profiles extends (infer T)[] ? T : never;
      }>();

      scores.forEach(score => {
        const profile = profiles?.find(p => p.user_id === score.user_id);
        if (!profile) return;

        const existing = userScores.get(score.user_id) || {
          total_score: 0,
          max_score: 0,
          games_played: 0,
          profile,
        };

        existing.total_score += score.score;
        existing.max_score += score.max_score;
        existing.games_played += 1;
        userScores.set(score.user_id, existing);
      });

      let entries: LeaderboardEntry[] = Array.from(userScores.entries()).map(([user_id, data]) => ({
        user_id,
        full_name: data.profile.full_name,
        nickname: data.profile.nickname,
        section_id: data.profile.section_id,
        section_name: data.profile.section_id ? sectionsMap.get(data.profile.section_id) || null : null,
        total_score: data.total_score,
        games_played: data.games_played,
        average_percentage: data.max_score > 0 ? Math.round((data.total_score / data.max_score) * 100) : 0,
      }));

      // Filter by section if needed
      if (selectedSection !== 'all') {
        entries = entries.filter(e => e.section_id === selectedSection);
      }

      // Sort by average percentage
      entries.sort((a, b) => b.average_percentage - a.average_percentage);

      setLeaderboard(entries.slice(0, 20));
    } catch (error) {
      console.error('Error fetching leaderboard:', error);
    } finally {
      setLoading(false);
    }
  };

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="h-5 w-5 text-yellow-500" />;
      case 2:
        return <Medal className="h-5 w-5 text-gray-400" />;
      case 3:
        return <Award className="h-5 w-5 text-amber-600" />;
      default:
        return <span className="font-display font-bold text-muted-foreground">{rank}</span>;
    }
  };

  const getRankColor = (rank: number) => {
    switch (rank) {
      case 1:
        return 'bg-gradient-to-r from-yellow-500/20 to-yellow-500/5 border-yellow-500/30';
      case 2:
        return 'bg-gradient-to-r from-gray-400/20 to-gray-400/5 border-gray-400/30';
      case 3:
        return 'bg-gradient-to-r from-amber-600/20 to-amber-600/5 border-amber-600/30';
      default:
        return 'bg-card border-border';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="bg-card rounded-xl border-2 border-border overflow-hidden">
      <div className="p-4 border-b border-border flex items-center justify-between flex-wrap gap-4">
        <h3 className="font-display font-bold text-lg flex items-center gap-2">
          <Trophy size={20} className="text-game-yellow" />
          Leaderboard
        </h3>
        
        {showAllSections && (
          <Tabs value={selectedSection} onValueChange={setSelectedSection}>
            <TabsList className="bg-muted/50">
              <TabsTrigger value="all">All</TabsTrigger>
              {sections.map(section => (
                <TabsTrigger key={section.id} value={section.id}>
                  {section.name}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        )}
      </div>

      {leaderboard.length === 0 ? (
        <div className="p-8 text-center text-muted-foreground">
          No scores yet. Be the first to play!
        </div>
      ) : (
        <div className="divide-y divide-border">
          {leaderboard.map((entry, index) => (
            <motion.div
              key={entry.user_id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className={`p-4 flex items-center gap-4 border-l-4 ${getRankColor(index + 1)}`}
            >
              <div className="w-8 flex justify-center">
                {getRankIcon(index + 1)}
              </div>
              
              <div className="flex-1 min-w-0">
                <p className="font-medium text-foreground truncate">{entry.full_name}</p>
                <p className="text-sm text-muted-foreground">
                  @{entry.nickname}
                  {showAllSections && entry.section_name && (
                    <span className="ml-2 px-2 py-0.5 rounded-full bg-secondary/20 text-secondary text-xs">
                      {entry.section_name}
                    </span>
                  )}
                </p>
              </div>

              <div className="text-right">
                <p className="font-display font-bold text-lg text-primary">
                  {entry.average_percentage}%
                </p>
                <p className="text-xs text-muted-foreground">
                  {entry.games_played} games
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
