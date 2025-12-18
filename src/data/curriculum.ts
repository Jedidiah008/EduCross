export interface Lesson {
  id: string;
  title: string;
}

export interface Unit {
  id: string;
  title: string;
  lessons: Lesson[];
}

export interface Subject {
  id: string;
  title: string;
  shortTitle: string;
  color: "yellow" | "blue";
  units: Unit[];
}

export const subjects: Subject[] = [
  {
    id: "general-chemistry-1",
    title: "General Chemistry 1",
    shortTitle: "Chemistry",
    color: "yellow",
    units: [
      {
        id: "chem-unit-1",
        title: "Unit 1: Introduction to Chemistry",
        lessons: [
          { id: "chem-1-1", title: "Nature and Scope of Chemistry" },
          { id: "chem-1-2", title: "Branches of Chemistry" },
          { id: "chem-1-3", title: "Chemistry in Everyday Life" },
          { id: "chem-1-4", title: "Scientific Method" },
          { id: "chem-1-5", title: "Laboratory Safety and Proper Handling of Chemicals" },
        ],
      },
      {
        id: "chem-unit-2",
        title: "Unit 2: Measurement and Significant Figures",
        lessons: [
          { id: "chem-2-1", title: "SI Units and Prefixes" },
          { id: "chem-2-2", title: "Accuracy vs. Precision" },
          { id: "chem-2-3", title: "Significant Figures" },
          { id: "chem-2-4", title: "Dimensional Analysis" },
          { id: "chem-2-5", title: "Scientific Notation" },
        ],
      },
      {
        id: "chem-unit-3",
        title: "Unit 3: Matter and Its Properties",
        lessons: [
          { id: "chem-3-1", title: "Classification of Matter (Pure Substances and Mixtures)" },
          { id: "chem-3-2", title: "Physical Properties" },
          { id: "chem-3-3", title: "Chemical Properties" },
          { id: "chem-3-4", title: "Physical and Chemical Changes" },
          { id: "chem-3-5", title: "Separation of Mixtures" },
        ],
      },
      {
        id: "chem-unit-4",
        title: "Unit 4: Atomic Theory",
        lessons: [
          { id: "chem-4-1", title: "Historical Development of Atomic Models" },
          { id: "chem-4-2", title: "Dalton's Atomic Theory" },
          { id: "chem-4-3", title: "Modern Atomic Theory" },
          { id: "chem-4-4", title: "Subatomic Particles" },
          { id: "chem-4-5", title: "Atomic Number and Mass Number" },
        ],
      },
      {
        id: "chem-unit-5",
        title: "Unit 5: Electronic Structure of Atoms",
        lessons: [
          { id: "chem-5-1", title: "Electromagnetic Spectrum" },
          { id: "chem-5-2", title: "Atomic Emission Spectra" },
          { id: "chem-5-3", title: "Bohr Model" },
          { id: "chem-5-4", title: "Quantum Mechanical Model" },
          { id: "chem-5-5", title: "Orbitals and Electron Configuration" },
        ],
      },
      {
        id: "chem-unit-6",
        title: "Unit 6: Periodic Table and Periodic Trends",
        lessons: [
          { id: "chem-6-1", title: "Development of the Periodic Table" },
          { id: "chem-6-2", title: "Periodic Law" },
          { id: "chem-6-3", title: "Groups and Periods" },
          { id: "chem-6-4", title: "Atomic Radius" },
          { id: "chem-6-5", title: "Ionization Energy" },
          { id: "chem-6-6", title: "Electronegativity" },
          { id: "chem-6-7", title: "Electron Affinity" },
        ],
      },
      {
        id: "chem-unit-7",
        title: "Unit 7: Chemical Bonding",
        lessons: [
          { id: "chem-7-1", title: "Ionic Bonding" },
          { id: "chem-7-2", title: "Covalent Bonding" },
          { id: "chem-7-3", title: "Metallic Bonding" },
          { id: "chem-7-4", title: "Lewis Structures" },
          { id: "chem-7-5", title: "VSEPR Theory" },
          { id: "chem-7-6", title: "Polarity of Molecules" },
        ],
      },
      {
        id: "chem-unit-8",
        title: "Unit 8: Chemical Formulas and Nomenclature",
        lessons: [
          { id: "chem-8-1", title: "Types of Chemical Formulas" },
          { id: "chem-8-2", title: "Writing Chemical Formulas" },
          { id: "chem-8-3", title: "Naming Ionic Compounds" },
          { id: "chem-8-4", title: "Naming Covalent Compounds" },
          { id: "chem-8-5", title: "Naming Acids and Bases" },
        ],
      },
      {
        id: "chem-unit-9",
        title: "Unit 9: The Mole Concept",
        lessons: [
          { id: "chem-9-1", title: "Avogadro's Number" },
          { id: "chem-9-2", title: "Molar Mass" },
          { id: "chem-9-3", title: "Mole–Mass Conversions" },
          { id: "chem-9-4", title: "Percent Composition" },
          { id: "chem-9-5", title: "Empirical and Molecular Formulas" },
        ],
      },
      {
        id: "chem-unit-10",
        title: "Unit 10: Chemical Reactions",
        lessons: [
          { id: "chem-10-1", title: "Types of Chemical Reactions" },
          { id: "chem-10-2", title: "Writing and Balancing Chemical Equations" },
          { id: "chem-10-3", title: "Conservation of Mass" },
          { id: "chem-10-4", title: "Predicting Products of Reactions" },
        ],
      },
      {
        id: "chem-unit-11",
        title: "Unit 11: Stoichiometry",
        lessons: [
          { id: "chem-11-1", title: "Mole-to-Mole Calculations" },
          { id: "chem-11-2", title: "Mass-to-Mass Calculations" },
          { id: "chem-11-3", title: "Limiting Reactants" },
          { id: "chem-11-4", title: "Percent Yield" },
        ],
      },
      {
        id: "chem-unit-12",
        title: "Unit 12: States of Matter",
        lessons: [
          { id: "chem-12-1", title: "Properties of Solids, Liquids, and Gases" },
          { id: "chem-12-2", title: "Kinetic Molecular Theory" },
          { id: "chem-12-3", title: "Phase Changes" },
          { id: "chem-12-4", title: "Heating and Cooling Curves" },
        ],
      },
      {
        id: "chem-unit-13",
        title: "Unit 13: Gas Laws",
        lessons: [
          { id: "chem-13-1", title: "Boyle's Law" },
          { id: "chem-13-2", title: "Charles's Law" },
          { id: "chem-13-3", title: "Gay-Lussac's Law" },
          { id: "chem-13-4", title: "Combined Gas Law" },
          { id: "chem-13-5", title: "Ideal Gas Law" },
        ],
      },
      {
        id: "chem-unit-14",
        title: "Unit 14: Solutions",
        lessons: [
          { id: "chem-14-1", title: "Types of Solutions" },
          { id: "chem-14-2", title: "Solubility" },
          { id: "chem-14-3", title: "Concentration Units (Molarity, Percent by Mass/Volume)" },
          { id: "chem-14-4", title: "Dilution" },
        ],
      },
      {
        id: "chem-unit-15",
        title: "Unit 15: Acids, Bases, and Salts (Introductory)",
        lessons: [
          { id: "chem-15-1", title: "Properties of Acids and Bases" },
          { id: "chem-15-2", title: "Arrhenius Concept" },
          { id: "chem-15-3", title: "pH Scale" },
          { id: "chem-15-4", title: "Neutralization Reactions" },
        ],
      },
    ],
  },
  {
    id: "general-physics-1",
    title: "General Physics 1",
    shortTitle: "Physics",
    color: "blue",
    units: [
      {
        id: "phys-unit-1",
        title: "Unit 1: Introduction to Physics",
        lessons: [
          { id: "phys-1-1", title: "Nature and Scope of Physics" },
          { id: "phys-1-2", title: "Branches of Physics" },
          { id: "phys-1-3", title: "Physics in Everyday Life" },
          { id: "phys-1-4", title: "Scientific Method" },
          { id: "phys-1-5", title: "Safety in Physics Laboratory" },
        ],
      },
      {
        id: "phys-unit-2",
        title: "Unit 2: Measurement and Scientific Tools",
        lessons: [
          { id: "phys-2-1", title: "Physical Quantities" },
          { id: "phys-2-2", title: "SI Units and Prefixes" },
          { id: "phys-2-3", title: "Scalars and Vectors" },
          { id: "phys-2-4", title: "Accuracy and Precision" },
          { id: "phys-2-5", title: "Significant Figures" },
        ],
      },
      {
        id: "phys-unit-3",
        title: "Unit 3: Vectors",
        lessons: [
          { id: "phys-3-1", title: "Vector and Scalar Quantities" },
          { id: "phys-3-2", title: "Vector Representation" },
          { id: "phys-3-3", title: "Vector Addition and Subtraction" },
          { id: "phys-3-4", title: "Components of Vectors" },
        ],
      },
      {
        id: "phys-unit-4",
        title: "Unit 4: Motion in One Dimension",
        lessons: [
          { id: "phys-4-1", title: "Distance and Displacement" },
          { id: "phys-4-2", title: "Speed and Velocity" },
          { id: "phys-4-3", title: "Acceleration" },
          { id: "phys-4-4", title: "Motion Graphs" },
          { id: "phys-4-5", title: "Free Fall" },
        ],
      },
      {
        id: "phys-unit-5",
        title: "Unit 5: Motion in Two Dimensions",
        lessons: [
          { id: "phys-5-1", title: "Projectile Motion" },
          { id: "phys-5-2", title: "Horizontal and Vertical Components" },
          { id: "phys-5-3", title: "Relative Motion" },
        ],
      },
      {
        id: "phys-unit-6",
        title: "Unit 6: Newton's Laws of Motion",
        lessons: [
          { id: "phys-6-1", title: "First Law (Inertia)" },
          { id: "phys-6-2", title: "Second Law (F = ma)" },
          { id: "phys-6-3", title: "Third Law (Action–Reaction)" },
          { id: "phys-6-4", title: "Free-Body Diagrams" },
        ],
      },
      {
        id: "phys-unit-7",
        title: "Unit 7: Applications of Newton's Laws",
        lessons: [
          { id: "phys-7-1", title: "Friction" },
          { id: "phys-7-2", title: "Tension" },
          { id: "phys-7-3", title: "Normal Force" },
          { id: "phys-7-4", title: "Circular Motion" },
          { id: "phys-7-5", title: "Forces in Equilibrium" },
        ],
      },
      {
        id: "phys-unit-8",
        title: "Unit 8: Work, Energy, and Power",
        lessons: [
          { id: "phys-8-1", title: "Work" },
          { id: "phys-8-2", title: "Kinetic Energy" },
          { id: "phys-8-3", title: "Potential Energy" },
          { id: "phys-8-4", title: "Mechanical Energy" },
          { id: "phys-8-5", title: "Law of Conservation of Energy" },
          { id: "phys-8-6", title: "Power" },
        ],
      },
      {
        id: "phys-unit-9",
        title: "Unit 9: Momentum and Impulse",
        lessons: [
          { id: "phys-9-1", title: "Momentum" },
          { id: "phys-9-2", title: "Impulse" },
          { id: "phys-9-3", title: "Law of Conservation of Momentum" },
          { id: "phys-9-4", title: "Elastic and Inelastic Collisions" },
        ],
      },
      {
        id: "phys-unit-10",
        title: "Unit 10: Rotational Motion",
        lessons: [
          { id: "phys-10-1", title: "Angular Displacement" },
          { id: "phys-10-2", title: "Angular Velocity" },
          { id: "phys-10-3", title: "Angular Acceleration" },
          { id: "phys-10-4", title: "Torque" },
          { id: "phys-10-5", title: "Rotational Equilibrium" },
        ],
      },
      {
        id: "phys-unit-11",
        title: "Unit 11: Gravitation",
        lessons: [
          { id: "phys-11-1", title: "Law of Universal Gravitation" },
          { id: "phys-11-2", title: "Gravitational Force" },
          { id: "phys-11-3", title: "Weight vs. Mass" },
          { id: "phys-11-4", title: "Satellite Motion" },
        ],
      },
    ],
  },
];

export const gameTypes = [
  { id: "crossword", title: "Crossword Puzzle", icon: "🧩", description: "Solve word puzzles horizontally and vertically" },
  { id: "wordsearch", title: "Word Search", icon: "🔍", description: "Find hidden words in a grid" },
  { id: "dragdrop", title: "Drag and Drop", icon: "🎯", description: "Match answers to categories" },
  { id: "jigsaw", title: "Jigsaw", icon: "🧩", description: "Assemble puzzle pieces to form statements" },
  { id: "fillblanks", title: "Fill in the Blanks", icon: "✏️", description: "Complete sentences before time runs out" },
  { id: "memoryflip", title: "Memory Flip", icon: "🃏", description: "Match question and answer cards" },
  { id: "matchit", title: "Match It", icon: "🔗", description: "Connect questions with correct answers" },
  { id: "fighttime", title: "Fight the Time", icon: "⏱️", description: "Enumerate answers before time runs out" },
  { id: "guessword", title: "Guess the Word", icon: "🔤", description: "Unscramble letters to form answers" },
  { id: "conceptpuzzle", title: "Concept Puzzle", icon: "💡", description: "Guess answers with hints" },
];

export function getSubjectById(id: string): Subject | undefined {
  return subjects.find(s => s.id === id);
}

export function getUnitById(subjectId: string, unitId: string): Unit | undefined {
  const subject = getSubjectById(subjectId);
  return subject?.units.find(u => u.id === unitId);
}

export function getLessonById(subjectId: string, unitId: string, lessonId: string): Lesson | undefined {
  const unit = getUnitById(subjectId, unitId);
  return unit?.lessons.find(l => l.id === lessonId);
}