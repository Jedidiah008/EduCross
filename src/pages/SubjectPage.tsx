import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getSubject } from '@/data/subjects';
import { Button } from '@/components/ui/button';
import { ArrowLeft, BookOpen, Play } from 'lucide-react';

export default function SubjectPage() {
  const { subjectId } = useParams<{ subjectId: string }>();
  const navigate = useNavigate();
  const subject = subjectId ? getSubject(subjectId) : undefined;

  if (!subject) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-muted-foreground">Subject not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 sm:p-8">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <Button variant="ghost" onClick={() => navigate('/dashboard')} className="mb-4">
          <ArrowLeft size={20} className="mr-2" />
          Back to Dashboard
        </Button>
        <h1 className="font-display text-4xl font-bold text-foreground">{subject.title}</h1>
        <p className="mt-2 text-muted-foreground">{subject.description}</p>
      </motion.div>

      <div className="mx-auto max-w-4xl space-y-4">
        {subject.units.map((unit, index) => (
          <motion.div
            key={unit.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Link to={`/subject/${subjectId}/unit/${unit.id}`}>
              <div className="game-card group flex items-center gap-6 hover:border-primary">
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-accent text-2xl font-bold text-primary-foreground">
                  {unit.number}
                </div>
                <div className="flex-1">
                  <h3 className="font-display text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                    Unit {unit.number}: {unit.title}
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {unit.objectives.length} learning objectives • {unit.slides.length} slides
                  </p>
                </div>
                <div className="flex items-center gap-2 text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                  <Play size={20} />
                  <span className="font-bold">Start</span>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
