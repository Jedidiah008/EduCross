import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { EduCrossLogo } from '@/components/EduCrossLogo';
import { SubjectCard } from '@/components/SubjectCard';
import { Button } from '@/components/ui/button';
import { Leaderboard } from '@/components/Leaderboard';
import { useAuth } from '@/lib/auth';
import { supabase } from '@/integrations/supabase/client';
import { LogOut, User, BarChart3, UserCircle } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export default function Dashboard() {
  const { profile, userRole, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const subjects = [
    {
      title: 'General Chemistry 1',
      subtitle: 'Matter, Measurements, and Chemical Reactions',
      icon: 'chemistry1' as const,
      href: '/subject/chemistry-1',
    },
    {
      title: 'General Chemistry 2',
      subtitle: 'Solutions, Thermodynamics, and Equilibrium',
      icon: 'chemistry2' as const,
      href: '/subject/chemistry-2',
    },
    {
      title: 'General Physics 1',
      subtitle: 'Mechanics, Waves, and Thermodynamics',
      icon: 'physics1' as const,
      href: '/subject/physics-1',
    },
    {
      title: 'General Physics 2',
      subtitle: 'Electricity, Magnetism, and Modern Physics',
      icon: 'physics2' as const,
      href: '/subject/physics-2',
    },
  ];

  return (
    <div className="min-h-screen p-4 sm:p-8">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8 flex flex-wrap items-center justify-between gap-4"
      >
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate('/profile')}
            className="group flex items-center gap-3"
          >
            <Avatar className="h-12 w-12 border-2 border-primary/30 transition-all group-hover:border-primary">
              <AvatarImage src={profile?.avatar_url || undefined} />
              <AvatarFallback className="bg-gradient-to-br from-primary to-accent text-primary-foreground">
                {profile?.full_name?.charAt(0) || 'U'}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm text-muted-foreground">Welcome back,</p>
              <p className="font-display text-xl font-bold text-foreground">
                {profile?.full_name || 'User'}
              </p>
            </div>
          </button>
          <span className={`ml-2 rounded-full px-3 py-1 text-xs font-bold ${
            userRole === 'teacher' 
              ? 'bg-accent/20 text-accent' 
              : 'bg-secondary/20 text-secondary'
          }`}>
            {userRole === 'teacher' ? 'Teacher' : 'Student'}
          </span>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            onClick={() => navigate('/profile')}
            className="flex items-center gap-2"
          >
            <UserCircle size={20} />
            My Profile
          </Button>
          {userRole === 'teacher' && (
            <Button
              variant="gameSecondary"
              onClick={() => navigate('/teacher')}
              className="flex items-center gap-2"
            >
              <BarChart3 size={20} />
              Teacher Dashboard
            </Button>
          )}
          <Button
            variant="outline"
            onClick={handleSignOut}
            className="flex items-center gap-2"
          >
            <LogOut size={20} />
            Log Out
          </Button>
        </div>
      </motion.header>

      {/* Logo Section */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
        className="mb-12 flex justify-center"
      >
        <EduCrossLogo size="lg" />
      </motion.div>

      {/* Subjects Grid */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="mx-auto max-w-5xl"
      >
        <h2 className="mb-8 text-center font-display text-3xl font-bold text-foreground">
          Choose Your Subject
        </h2>

        <div className="grid gap-6 sm:grid-cols-2">
          {subjects.map((subject, index) => (
            <SubjectCard
              key={subject.href}
              {...subject}
              delay={0.5 + index * 0.1}
            />
          ))}
        </div>
      </motion.div>

      {/* Leaderboard for Students */}
      {userRole === 'student' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mx-auto max-w-5xl mt-12"
        >
          <h2 className="mb-6 text-center font-display text-2xl font-bold text-foreground">
            Section Leaderboard
          </h2>
          <Leaderboard userSectionId={profile?.section_id} />
        </motion.div>
      )}

      {/* Decorative elements */}
      <div className="fixed -left-32 -top-32 h-64 w-64 rounded-full bg-primary/5 blur-3xl" />
      <div className="fixed -bottom-32 -right-32 h-64 w-64 rounded-full bg-secondary/5 blur-3xl" />
    </div>
  );
}
