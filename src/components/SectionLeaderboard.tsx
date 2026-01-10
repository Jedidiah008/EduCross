import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { supabase } from '@/integrations/supabase/client';
import { Trophy, Users, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface SectionStats {
  id: string;
  name: string;
  total_students: number;
  total_games: number;
  average_score: number;
  top_scorer: {
    name: string;
    score: number;
  } | null;
}

export function SectionLeaderboard() {
  const [sections, setSections] = useState<SectionStats[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSectionStats();
  }, []);

  const fetchSectionStats = async () => {
    setLoading(true);
    try {
      // Fetch all sections
      const { data: sectionsData } = await supabase.from('sections').select('*').order('name');
      if (!sectionsData) return;

      // Fetch all profiles with sections
      const { data: profiles } = await supabase.from('profiles').select('user_id, full_name, section_id');
      
      // Fetch all scores
      const { data: scores } = await supabase.from('game_scores').select('*');

      const sectionStats: SectionStats[] = sectionsData.map(section => {
        const sectionProfiles = profiles?.filter(p => p.section_id === section.id) || [];
        const sectionUserIds = sectionProfiles.map(p => p.user_id);
        const sectionScores = scores?.filter(s => sectionUserIds.includes(s.user_id)) || [];

        // Calculate average
        const avgScore = sectionScores.length > 0
          ? Math.round(sectionScores.reduce((acc, s) => acc + (s.score / s.max_score) * 100, 0) / sectionScores.length)
          : 0;

        // Find top scorer
        const userTotals = new Map<string, { total: number; max: number; name: string }>();
        sectionScores.forEach(score => {
          const profile = sectionProfiles.find(p => p.user_id === score.user_id);
          if (!profile) return;
          
          const existing = userTotals.get(score.user_id) || { total: 0, max: 0, name: profile.full_name };
          existing.total += score.score;
          existing.max += score.max_score;
          userTotals.set(score.user_id, existing);
        });

        let topScorer: SectionStats['top_scorer'] = null;
        let highestAvg = 0;
        userTotals.forEach((data) => {
          const avg = data.max > 0 ? (data.total / data.max) * 100 : 0;
          if (avg > highestAvg) {
            highestAvg = avg;
            topScorer = { name: data.name, score: Math.round(avg) };
          }
        });

        return {
          id: section.id,
          name: section.name,
          total_students: sectionProfiles.length,
          total_games: sectionScores.length,
          average_score: avgScore,
          top_scorer: topScorer,
        };
      });

      // Sort by average score
      sectionStats.sort((a, b) => b.average_score - a.average_score);
      setSections(sectionStats);
    } catch (error) {
      console.error('Error fetching section stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const getRankColor = (rank: number) => {
    switch (rank) {
      case 1:
        return 'from-yellow-500 to-yellow-600';
      case 2:
        return 'from-gray-400 to-gray-500';
      case 3:
        return 'from-amber-600 to-amber-700';
      default:
        return 'from-primary to-accent';
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
    <div className="space-y-4">
      <h3 className="font-display font-bold text-xl flex items-center gap-2">
        <Users size={24} className="text-primary" />
        Section Rankings
      </h3>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {sections.map((section, index) => (
          <motion.div
            key={section.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className={`border-2 overflow-hidden ${index < 3 ? 'border-primary/30' : 'border-border'}`}>
              <div className={`h-2 bg-gradient-to-r ${getRankColor(index + 1)}`} />
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="font-display text-lg">
                    Section {section.name}
                  </CardTitle>
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-muted font-display font-bold">
                    {index + 1}
                  </span>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground flex items-center gap-2">
                    <TrendingUp size={14} />
                    Average Score
                  </span>
                  <span className="font-display font-bold text-primary text-xl">
                    {section.average_score}%
                  </span>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Students</span>
                  <span className="font-medium">{section.total_students}</span>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Games Played</span>
                  <span className="font-medium">{section.total_games}</span>
                </div>

                {section.top_scorer && (
                  <div className="pt-2 border-t border-border">
                    <div className="flex items-center gap-2">
                      <Trophy size={14} className="text-game-yellow" />
                      <span className="text-xs text-muted-foreground">Top Scorer</span>
                    </div>
                    <p className="text-sm font-medium mt-1">
                      {section.top_scorer.name} ({section.top_scorer.score}%)
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
