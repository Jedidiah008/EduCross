import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { getSubject, getUnit } from '@/data/subjects';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight, ChevronLeft, ChevronRight, Gamepad2 } from 'lucide-react';

export default function LessonPage() {
  const { subjectId, unitId } = useParams<{ subjectId: string; unitId: string }>();
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);

  const subject = subjectId ? getSubject(subjectId) : undefined;
  const unit = subjectId && unitId ? getUnit(subjectId, unitId) : undefined;

  useEffect(() => {
    if (unit) {
      console.debug('[LessonPage] unit.slides.length =', unit.slides.length);
      console.debug('[LessonPage] slide titles =', unit.slides.map(s => s.title));
    }
  }, [unit]);

  if (!subject || !unit) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-muted-foreground">Lesson not found</p>
      </div>
    );
  }

  const slide = unit.slides[currentSlide];
  const isLastSlide = currentSlide === unit.slides.length - 1;

  const handleNext = () => {
    if (isLastSlide) {
      navigate(`/subject/${subjectId}/unit/${unitId}/games`);
    } else {
      setCurrentSlide(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentSlide > 0) setCurrentSlide(prev => prev - 1);
  };

  return (
    <div className="min-h-screen p-4 sm:p-8">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-6">
          <Button variant="ghost" onClick={() => navigate(`/subject/${subjectId}`)} className="mb-2">
            <ArrowLeft size={20} className="mr-2" />
            Back to Units
          </Button>
          <h2 className="font-display text-2xl font-bold text-foreground">
            Unit {unit.number}: {unit.title}
          </h2>
          <div className="mt-2 flex items-center gap-2">
            <div className="h-2 flex-1 overflow-hidden rounded-full bg-muted">
              <motion.div
                className="h-full bg-gradient-to-r from-primary to-accent"
                initial={{ width: 0 }}
                animate={{ width: `${((currentSlide + 1) / unit.slides.length) * 100}%` }}
              />
            </div>
            <span className="text-sm text-muted-foreground">
              {currentSlide + 1} / {unit.slides.length}
            </span>
          </div>
        </motion.div>

        {/* Slide Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="game-card min-h-[60vh]"
          >
            <h3 className="mb-6 font-display text-3xl font-bold text-primary">{slide.title}</h3>
            
            <div className="space-y-4 text-foreground">
              {slide.content.map((paragraph, i) => (
                <p key={i} className="leading-relaxed whitespace-pre-line">{paragraph}</p>
              ))}
            </div>

            {slide.formulas && slide.formulas.length > 0 && (
              <div className="mt-6 rounded-xl bg-secondary/20 p-4">
                <h4 className="mb-2 font-display font-bold text-secondary">Formulas</h4>
                {slide.formulas.map((formula, i) => (
                  <p key={i} className="font-mono text-lg text-foreground">{formula}</p>
                ))}
              </div>
            )}

            {slide.keyTerms && slide.keyTerms.length > 0 && (
              <div className="mt-6">
                <h4 className="mb-3 font-display font-bold text-accent">Key Terms</h4>
                <div className="space-y-2">
                  {slide.keyTerms.map((term, i) => (
                    <div key={i} className="rounded-lg bg-muted p-3">
                      <span className="font-bold text-primary">{term.term}:</span>{' '}
                      <span className="text-muted-foreground">{term.definition}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {slide.examples && slide.examples.length > 0 && (
              <div className="mt-6">
                <h4 className="mb-3 font-display font-bold text-success">Examples</h4>
                {slide.examples.map((ex, i) => (
                  <div key={i} className="rounded-xl border-2 border-success/30 bg-success/10 p-4">
                    <p className="font-bold text-foreground">Problem: {ex.problem}</p>
                    <p className="mt-2 whitespace-pre-line text-muted-foreground">Solution: {ex.solution}</p>
                  </div>
                ))}
              </div>
            )}

            {slide.people && slide.people.length > 0 && (
              <div className="mt-6">
                <h4 className="mb-3 font-display font-bold text-secondary">Key Scientists</h4>
                {slide.people.map((person, i) => (
                  <div key={i} className="rounded-lg bg-secondary/20 p-3">
                    <span className="font-bold text-secondary">{person.name}:</span>{' '}
                    <span className="text-muted-foreground">{person.contribution}</span>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <div className="mt-6 flex items-center justify-between">
          <Button variant="outline" onClick={handlePrev} disabled={currentSlide === 0}>
            <ChevronLeft size={20} className="mr-2" />
            Previous
          </Button>
          <Button variant="game" onClick={handleNext}>
            {isLastSlide ? (
              <>
                <Gamepad2 size={20} className="mr-2" />
                Play Games
              </>
            ) : (
              <>
                Next
                <ChevronRight size={20} className="ml-2" />
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
