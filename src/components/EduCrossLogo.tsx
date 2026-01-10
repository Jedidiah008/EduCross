import { motion } from 'framer-motion';
import { BookOpen, Sparkles } from 'lucide-react';

interface EduCrossLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  animate?: boolean;
}

export function EduCrossLogo({ size = 'lg', animate = true }: EduCrossLogoProps) {
  const sizeClasses = {
    sm: 'text-2xl',
    md: 'text-4xl',
    lg: 'text-6xl',
    xl: 'text-8xl',
  };

  const iconSizes = {
    sm: 24,
    md: 36,
    lg: 48,
    xl: 72,
  };

  return (
    <motion.div
      className="flex flex-col items-center gap-4"
      initial={animate ? { opacity: 0, scale: 0.8 } : undefined}
      animate={animate ? { opacity: 1, scale: 1 } : undefined}
      transition={animate ? { duration: 0.5 } : undefined}
    >
      <div className="relative">
        {animate && (
          <motion.div
            className="absolute -inset-8 rounded-full bg-primary/20 blur-2xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
            }}
          />
        )}
        <div className="relative flex items-center justify-center rounded-3xl bg-gradient-to-br from-primary via-accent to-primary p-6 shadow-lg">
          <BookOpen size={iconSizes[size]} className="text-primary-foreground" />
          {animate && (
            <motion.div
              className="absolute -right-2 -top-2"
              animate={{
                rotate: [0, 15, -15, 0],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
              }}
            >
              <Sparkles size={iconSizes[size] / 2} className="text-primary" />
            </motion.div>
          )}
        </div>
      </div>
      <div className="text-center">
        <h1 className={`font-display font-bold ${sizeClasses[size]}`}>
          <span className="text-primary">Edu</span>
          <span className="text-secondary">Cross</span>
        </h1>
        <p className="mt-2 text-muted-foreground font-body">
          Learn. Play. Excel.
        </p>
      </div>
    </motion.div>
  );
}
