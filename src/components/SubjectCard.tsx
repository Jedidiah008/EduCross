import { motion } from 'framer-motion';
import { Atom, FlaskConical, Zap, Lightbulb } from 'lucide-react';
import { Link } from 'react-router-dom';

interface SubjectCardProps {
  title: string;
  subtitle: string;
  icon: 'chemistry1' | 'chemistry2' | 'physics1' | 'physics2';
  href: string;
  delay?: number;
}

const iconMap = {
  chemistry1: FlaskConical,
  chemistry2: Atom,
  physics1: Zap,
  physics2: Lightbulb,
};

const colorMap = {
  chemistry1: 'from-secondary to-secondary/60',
  chemistry2: 'from-secondary/80 to-game-blue-light',
  physics1: 'from-accent to-game-orange',
  physics2: 'from-accent/80 to-primary',
};

export function SubjectCard({ title, subtitle, icon, href, delay = 0 }: SubjectCardProps) {
  const Icon = iconMap[icon];
  const gradient = colorMap[icon];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
    >
      <Link to={href} className="block">
        <div className="subject-card group relative overflow-hidden">
          {/* Background glow */}
          <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-10 transition-opacity duration-300 group-hover:opacity-20`} />
          
          {/* Icon */}
          <div className={`mb-6 inline-flex rounded-2xl bg-gradient-to-br ${gradient} p-4 shadow-lg`}>
            <Icon size={40} className="text-primary-foreground" />
          </div>

          {/* Content */}
          <h3 className="mb-2 font-display text-2xl font-bold text-foreground">
            {title}
          </h3>
          <p className="text-muted-foreground font-body">
            {subtitle}
          </p>

          {/* Hover arrow */}
          <motion.div
            className="absolute bottom-6 right-6 flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground opacity-0 transition-opacity group-hover:opacity-100"
            initial={{ x: -10 }}
            whileHover={{ x: 0 }}
          >
            →
          </motion.div>

          {/* Decorative elements */}
          <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-gradient-to-br from-primary/5 to-transparent" />
          <div className="absolute -bottom-4 -left-4 h-24 w-24 rounded-full bg-gradient-to-tr from-secondary/5 to-transparent" />
        </div>
      </Link>
    </motion.div>
  );
}
