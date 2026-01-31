import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { EduCrossLogo } from '@/components/EduCrossLogo';
import { Button } from '@/components/ui/button';
import { LogIn, UserPlus, Gamepad2, Trophy, Users } from 'lucide-react';

const Index = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center"
      >
        <EduCrossLogo size="xl" />
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mx-auto mt-6 max-w-md text-lg text-muted-foreground"
        >
          Master Chemistry and Physics through Educross's interactive games and engaging lessons
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center"
        >
          <Button asChild variant="game" size="xl">
            <Link to="/signup" className="flex items-center gap-3">
              <UserPlus size={24} />
              Get Started
            </Link>
          </Button>
          <Button asChild variant="outline" size="xl">
            <Link to="/login" className="flex items-center gap-3">
              <LogIn size={24} />
              Log In
            </Link>
          </Button>
        </motion.div>
      </motion.div>

      {/* Features */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mt-20 grid max-w-4xl gap-8 sm:grid-cols-3"
      >
        {[
          { icon: Gamepad2, title: '10+ Game Types', desc: 'Snake, Word Search, Puzzles & more' },
          { icon: Trophy, title: 'Track Progress', desc: 'See your scores and improve' },
          { icon: Users, title: 'Class Sections', desc: 'Learn with your classmates' },
        ].map((feature, i) => (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 + i * 0.1 }}
            className="flex flex-col items-center text-center"
          >
            <div className="mb-4 rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 p-4">
              <feature.icon size={32} className="text-primary" />
            </div>
            <h3 className="font-display text-lg font-bold text-foreground">{feature.title}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{feature.desc}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* Decorative elements */}
      <div className="fixed -left-32 -top-32 h-64 w-64 rounded-full bg-primary/5 blur-3xl" />
      <div className="fixed -bottom-32 -right-32 h-64 w-64 rounded-full bg-secondary/5 blur-3xl" />
    </div>
  );
};

export default Index;
