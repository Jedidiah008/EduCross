import { subjects, getUnit } from './subjects';

export interface GameQuestion {
  question: string;
  answer: string;
  options?: string[];
  hints?: string[];
}

export interface EnumerationQuestion {
  question: string;
  answers: string[];
}

export interface CategoryQuestion {
  categories: string[];
  items: { text: string; category: string }[];
}

function generateFromUnit(subjectId: string, unitId: string) {
  const unit = getUnit(subjectId, unitId);

  const questions: GameQuestion[] = [];
  const enumerationQuestions: EnumerationQuestion[] = [];
  let categoryQuestions: CategoryQuestion[] = [];

  if (!unit) return { questions, enumerationQuestions, categoryQuestions };

  // questions (concept / puzzle style)
  unit.slides.forEach(slide => {
    if (slide.keyTerms) {
      slide.keyTerms.forEach(term => {
        const isChem1Unit1 = subjectId === 'chemistry-1' && unitId === 'chem1-unit1';
        const hintsBase = [
          `First letter: ${term.term[0]}`,
          `${term.term.length} letters`,
        ];
        if (!isChem1Unit1) {
          hintsBase.push(`Contains: ${term.term[Math.floor(term.term.length / 2)]}`);
        }

        questions.push({
          question: term.definition,
          answer: term.term,
          hints: hintsBase,
        });
      });
    }
  });

  // content-based questions (simple heuristic copied from hook)
  unit.slides.forEach(slide => {
    const contentStr = Array.isArray(slide.content) ? slide.content.join(' ') : slide.content;
    if (contentStr.length > 50) {
      const words = slide.title.split(' ').filter(w => w.length > 3);
      if (words.length > 0) {
        questions.push({
          question: `Topic: ${contentStr.substring(0, 100)}...`,
          answer: words[0],
          hints: [`Related to: ${slide.title}`, `First letter: ${words[0][0]}`],
        });
      }
    }
  });

  // limit questions (match original hook behavior)
  const qSlice = questions.slice(0, 10);

  // enumeration questions
  unit.slides.forEach(slide => {
    if (slide.keyTerms && slide.keyTerms.length >= 3) {
      enumerationQuestions.push({
        question: `Name the key terms related to: ${slide.title}`,
        answers: slide.keyTerms.slice(0, 5).map(t => t.term),
      });
    }
  });

  // category questions (simple categories from first 3 slides)
  const categories = unit.slides.slice(0, 3).map(s => s.title.split(' ').slice(0, 2).join(' '));
  const items: { text: string; category: string }[] = [];
  unit.slides.slice(0, 3).forEach((slide, idx) => {
    if (slide.keyTerms) {
      slide.keyTerms.slice(0, 3).forEach(term => {
        items.push({ text: term.term, category: categories[idx] });
      });
    }
  });
  if (items.length >= 6) categoryQuestions = [{ categories, items }];

  return { questions: qSlice, enumerationQuestions: enumerationQuestions.slice(0, 5), categoryQuestions };
}

export const allGameQuestions: Record<string, Record<string, ReturnType<typeof generateFromUnit>>> = {};

Object.keys(subjects).forEach(subjectId => {
  const subject = subjects[subjectId];
  allGameQuestions[subjectId] = {};
  subject.units.forEach(unit => {
    allGameQuestions[subjectId][unit.id] = generateFromUnit(subjectId, unit.id);
  });
});

export default allGameQuestions;
