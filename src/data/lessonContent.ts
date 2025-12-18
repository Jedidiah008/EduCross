export interface LessonSlide {
  title: string;
  content: string;
}

export interface LessonContent {
  slides: LessonSlide[];
}

export const lessonContents: Record<string, LessonContent> = {
  // ==================== CHEMISTRY LESSONS ====================
  
  // Unit 1: Introduction to Chemistry
  "chem-1-1": {
    slides: [
      {
        title: "What is Chemistry?",
        content: " Chemistry is the scientific study of matter, its properties, composition, structure, and the changes it undergoes during chemical reactions. Often called the 'central science,' chemistry bridges physics and biology, helping us understand everything from the air we breathe to the medicines that heal us. It explains why ice floats, how plants produce oxygen, and what makes fireworks colorful. At its core, chemistry explores atoms and molecules—the building blocks of matter—and how they interact to form the substances that make up our world. This lesson introduces Chemistry as the central science, defined as the study of matter and the changes it undergoes. We will explore the fundamental concepts of matter, its composition, structure, properties, and the energy changes accompanying its transformations. We will learn how chemistry bridges physics and biology, making it essential for understanding the natural world."
      },
      {
        title: "The Scope of Chemistry",
        content: "Chemistry encompasses the study of atoms and molecules, chemical bonds, reactions, and energy changes. It includes understanding how substances interact at the molecular level. The scope ranges from analyzing single atoms to studying complex biological molecules like DNA. Chemists investigate matter at scales from nanometers to industrial processes producing millions of tons of materials annually. Key areas include organic chemistry (carbon compounds), inorganic chemistry (non-carbon compounds), physical chemistry (energy changes), analytical chemistry (composition analysis), and biochemistry (chemical processes in living organisms). Chemistry's broad scope makes it vital for advancements in medicine, materials science, environmental science, and technology."
      },
      {
        title: "Examples in Real Life",
        content: "Chemistry is everywhere! When you cook an egg, proteins denature and change structure. Baking uses chemical reactions between baking soda and acids to make bread rise. Batteries convert chemical energy to electrical energy. Soaps work by having molecules with water-loving and oil-loving ends. Even the rust on iron is a chemical reaction called oxidation."
      }
    ]
  },
  "chem-1-2": {
    slides: [
      {
        title: "Major Branches of Chemistry",
        content: "Chemistry is divided into five main branches: Organic Chemistry studies carbon-containing compounds and living organisms. Inorganic Chemistry focuses on minerals and non-carbon compounds. Physical Chemistry applies physics principles to chemical systems. Analytical Chemistry identifies and measures chemical compositions. Biochemistry explores chemical processes in living organisms."
      },
      {
        title: "Specialized Fields",
        content: "Beyond the main branches, specialized fields have emerged. Environmental Chemistry studies pollutants and their effects. Medicinal Chemistry develops pharmaceutical drugs. Polymer Chemistry creates plastics and synthetic materials. Nuclear Chemistry investigates radioactive substances. Materials Science designs new compounds with specific properties for technology applications."
      },
      {
        title: "Career Applications",
        content: "Organic chemists develop new medications and plastics. Inorganic chemists create catalysts for industry. Analytical chemists work in forensic labs solving crimes. Biochemists study diseases and develop vaccines. Environmental chemists monitor air and water quality. Food chemists ensure our food is safe and nutritious. Each branch offers unique career opportunities."
      }
    ]
  },
  "chem-1-3": {
    slides: [
      {
        title: "Chemistry at Home",
        content: "Your home is a chemistry laboratory! Cleaning products use surfactants to remove dirt. Cooking involves chemical reactions like caramelization and Maillard browning. Refrigerators use phase changes and heat transfer. Batteries power devices through redox reactions. Even the plastic containers, ceramic dishes, and metal utensils were created through chemical processes."
      },
      {
        title: "Chemistry in Your Body",
        content: "Your body runs on chemistry! Digestion breaks down food using enzymes and acids. Hemoglobin in blood carries oxygen through iron-oxygen bonds. Neurons communicate using chemical neurotransmitters. Your immune system fights pathogens with antibodies. DNA replication, muscle contraction, and energy production all involve precise chemical reactions occurring every second."
      },
      {
        title: "Chemistry in Society",
        content: "Chemistry shapes modern society. Agriculture uses fertilizers and pesticides for food production. Medicine relies on synthesized drugs and diagnostic tests. Energy comes from burning fossil fuels or nuclear reactions. Electronics use semiconductors and lithium batteries. Water treatment makes drinking water safe. Plastics, textiles, and construction materials all come from chemistry."
      }
    ]
  },
  "chem-1-4": {
    slides: [
      {
        title: "The Scientific Method",
        content: "The scientific method is a systematic approach to understanding the natural world. It begins with observation—noticing something interesting. Then comes questioning—asking why or how something happens. Scientists form hypotheses—educated guesses that can be tested. This logical process has led to all major scientific discoveries throughout history."
      },
      {
        title: "Steps of the Scientific Method",
        content: "The process includes: 1) Observation and research about a phenomenon. 2) Forming a testable hypothesis. 3) Designing and conducting experiments with controlled variables. 4) Collecting and analyzing data objectively. 5) Drawing conclusions based on evidence. 6) Communicating results for peer review. 7) Repeating experiments to verify results."
      },
      {
        title: "Examples in Chemistry",
        content: "Lavoisier used the scientific method to disprove phlogiston theory and discover oxygen's role in combustion. Mendeleev's hypothesis about periodic patterns led to the periodic table. Marie Curie's systematic experiments discovered radioactivity. Today, chemists use this method to develop new drugs, materials, and solutions to environmental problems."
      }
    ]
  },
  "chem-1-5": {
    slides: [
      {
        title: "Laboratory Safety Basics",
        content: "Laboratory safety protects you and others from harm. Always wear appropriate Personal Protective Equipment (PPE): safety goggles protect eyes from splashes, lab coats shield skin and clothing, and gloves prevent chemical contact. Closed-toe shoes are mandatory. Never work alone, and always know the locations of safety equipment like eyewash stations and fire extinguishers."
      },
      {
        title: "Handling Chemicals Safely",
        content: "Read all labels and Safety Data Sheets (SDS) before using chemicals. Never taste or directly smell chemicals—use the wafting technique. Always add acid to water, never water to acid. Keep flammable substances away from flames. Never pour chemicals back into original containers. Dispose of chemicals properly in designated waste containers, not down the drain."
      },
      {
        title: "Emergency Procedures",
        content: "Know what to do in emergencies. For chemical spills: alert others, contain small spills with appropriate materials, evacuate for large spills. For fires: use RACE (Rescue, Alarm, Contain, Evacuate) and appropriate fire extinguisher. For chemical contact: flush with water for 15+ minutes. Report all accidents immediately, no matter how minor they seem."
      }
    ]
  },

  // Unit 2: Measurement and Significant Figures
  "chem-2-1": {
    slides: [
      {
        title: "The SI System",
        content: "The International System of Units (SI) provides standardized measurements for science worldwide. The seven base units are: meter (length), kilogram (mass), second (time), ampere (electric current), kelvin (temperature), mole (amount of substance), and candela (luminous intensity). All other units are derived from these fundamental measurements."
      },
      {
        title: "Common SI Prefixes",
        content: "Prefixes modify base units for convenience. Large quantities use: kilo (k) = 10³, mega (M) = 10⁶, giga (G) = 10⁹. Small quantities use: milli (m) = 10⁻³, micro (μ) = 10⁻⁶, nano (n) = 10⁻⁹. For example, 1 kilometer = 1000 meters, 1 milligram = 0.001 grams, and 1 nanosecond = 0.000000001 seconds."
      },
      {
        title: "Using SI Units in Chemistry",
        content: "Chemistry commonly uses: liters and milliliters for volume (1 L = 1000 mL), grams for mass (1 kg = 1000 g), and Celsius or Kelvin for temperature. Concentration uses mol/L (molarity). Pressure is measured in Pascals or atmospheres. Converting between units requires multiplying by conversion factors while keeping track of prefixes."
      }
    ]
  },
  "chem-2-2": {
    slides: [
      {
        title: "Understanding Accuracy",
        content: "Accuracy describes how close a measurement is to the true or accepted value. An accurate measurement hits the 'bullseye' of what you're trying to measure. For example, if a sample's true mass is 10.00 g and you measure 10.02 g, your measurement is highly accurate. Accuracy depends on proper calibration of instruments and correct technique."
      },
      {
        title: "Understanding Precision",
        content: "Precision refers to how close repeated measurements are to each other, regardless of whether they're accurate. Precise measurements are reproducible and consistent. If you measure a sample three times and get 9.52 g, 9.53 g, and 9.52 g, your measurements are precise even if the true value is 10.00 g. Precision relates to the instrument's resolution."
      },
      {
        title: "Accuracy vs. Precision in Practice",
        content: "The ideal is both high accuracy and high precision. Imagine darts: accurate throws hit near the bullseye, precise throws cluster together. You can be precise but not accurate (cluster away from center), accurate on average but not precise (scattered around center), or both. Good experimental technique aims for measurements that are both accurate and precise."
      }
    ]
  },
  "chem-2-3": {
    slides: [
      {
        title: "What Are Significant Figures?",
        content: "Significant figures (sig figs) are the digits in a measurement that carry meaning about its precision. They include all certain digits plus one estimated digit. For example, if a ruler shows a length between 2.3 and 2.4 cm, you might record 2.35 cm—three significant figures. More sig figs indicate more precise measurements."
      },
      {
        title: "Rules for Counting Sig Figs",
        content: "Key rules: 1) All non-zero digits are significant (234 has 3). 2) Zeros between non-zeros are significant (205 has 3). 3) Leading zeros are not significant (0.025 has 2). 4) Trailing zeros after a decimal are significant (2.50 has 3). 5) Trailing zeros without a decimal may or may not be significant (2500 is ambiguous—use scientific notation)."
      },
      {
        title: "Calculations with Sig Figs",
        content: "For multiplication/division: the answer has the same number of sig figs as the measurement with fewest sig figs. Example: 2.5 × 3.42 = 8.55, rounded to 8.6 (2 sig figs). For addition/subtraction: the answer has the same decimal places as the measurement with fewest decimal places. Example: 12.11 + 0.3 = 12.41, rounded to 12.4."
      }
    ]
  },
  "chem-2-4": {
    slides: [
      {
        title: "What is Dimensional Analysis?",
        content: "Dimensional analysis is a problem-solving method using conversion factors to change units. A conversion factor is a ratio equal to 1 (like 1 km/1000 m). By multiplying by conversion factors, units cancel out algebraically, leaving the desired unit. This technique prevents errors and works for simple or complex multi-step conversions."
      },
      {
        title: "Setting Up Conversions",
        content: "Steps: 1) Identify starting and ending units. 2) Find conversion factors connecting them. 3) Arrange factors so unwanted units cancel. 4) Multiply numbers and check that only desired units remain. Example: Convert 5.0 km to meters: 5.0 km × (1000 m / 1 km) = 5000 m. The 'km' cancels, leaving 'm'."
      },
      {
        title: "Multi-Step Conversions",
        content: "Complex problems chain multiple conversion factors. Convert 2.5 hours to seconds: 2.5 hr × (60 min/1 hr) × (60 s/1 min) = 9000 s. Each factor cancels the previous unit. This method works for chemistry problems like converting moles to grams to molecules, or liters to milliliters to drops."
      }
    ]
  },
  "chem-2-5": {
    slides: [
      {
        title: "What is Scientific Notation?",
        content: "Scientific notation expresses very large or small numbers compactly as a coefficient times a power of 10. The coefficient is between 1 and 10, and the exponent shows decimal place movement. For example, 6,020,000,000,000,000,000,000,000 (Avogadro's number) becomes 6.02 × 10²³. This makes calculations and comparisons easier."
      },
      {
        title: "Converting to Scientific Notation",
        content: "To convert: move the decimal point until only one non-zero digit is left of it. Count the places moved—this is the exponent. Moving left gives positive exponents (large numbers), moving right gives negative (small numbers). Examples: 4500 = 4.5 × 10³ (moved 3 left), 0.00032 = 3.2 × 10⁻⁴ (moved 4 right)."
      },
      {
        title: "Calculations in Scientific Notation",
        content: "Multiplication: multiply coefficients, add exponents. (2 × 10³) × (3 × 10⁴) = 6 × 10⁷. Division: divide coefficients, subtract exponents. (8 × 10⁵) ÷ (2 × 10²) = 4 × 10³. Addition/subtraction: make exponents equal first, then add/subtract coefficients. Adjust final answer to proper form if needed."
      }
    ]
  },

  // Unit 3: Matter and Its Properties
  "chem-3-1": {
    slides: [
      {
        title: "Classification of Matter",
        content: "All matter is classified as either pure substances or mixtures. Pure substances have constant composition and properties—they're either elements (one type of atom) or compounds (atoms chemically bonded in fixed ratios). Mixtures contain two or more substances physically combined in variable proportions, retaining their individual properties."
      },
      {
        title: "Types of Pure Substances",
        content: "Elements are the simplest pure substances, made of only one type of atom. Gold, oxygen, and carbon are elements. Compounds are pure substances made of two or more elements chemically combined in fixed ratios. Water (H₂O) always has 2 hydrogen atoms per oxygen atom. Table salt (NaCl) always has equal sodium and chlorine atoms."
      },
      {
        title: "Types of Mixtures",
        content: "Homogeneous mixtures (solutions) have uniform composition throughout—you can't see separate components. Examples: salt water, air, alloys like bronze. Heterogeneous mixtures have visible, uneven distribution of components. Examples: salad, granite, oil and water. Suspensions and colloids are intermediate types with particles of different sizes."
      }
    ]
  },
  "chem-3-2": {
    slides: [
      {
        title: "What Are Physical Properties?",
        content: "Physical properties can be observed or measured without changing the substance's chemical identity. They describe how matter looks and behaves physically. Common physical properties include color, odor, density, melting point, boiling point, hardness, and electrical conductivity. These properties help identify substances without destroying them."
      },
      {
        title: "Intensive vs. Extensive Properties",
        content: "Intensive properties don't depend on amount of substance. Density, temperature, color, and melting point remain the same whether you have 1 gram or 1 kilogram. Extensive properties depend on amount: mass, volume, length, and energy. A larger sample has more mass and volume but the same density and melting point."
      },
      {
        title: "Using Physical Properties",
        content: "Physical properties identify unknown substances. Gold's density (19.3 g/mL) distinguishes it from fool's gold (5.0 g/mL). Water's unique properties (high boiling point, expands when freezing) make it essential for life. Materials are selected based on properties: copper for wiring (conductivity), diamond for cutting (hardness), helium for balloons (low density)."
      }
    ]
  },
  "chem-3-3": {
    slides: [
      {
        title: "What Are Chemical Properties?",
        content: "Chemical properties describe a substance's ability to undergo chemical changes and form new substances. Unlike physical properties, observing chemical properties requires changing the substance's identity. Examples include flammability, reactivity with acids, toxicity, and oxidation tendency. These properties determine how substances interact chemically."
      },
      {
        title: "Common Chemical Properties",
        content: "Flammability is ability to burn in oxygen. Reactivity describes tendency to combine with other substances. Oxidation state indicates electron loss potential. Acidity/basicity shows behavior in acid-base reactions. Stability refers to resistance to decomposition. Toxicity describes harmful effects on living organisms. Each property reflects molecular structure."
      },
      {
        title: "Chemical Properties in Action",
        content: "Iron rusts because of its reactivity with oxygen and water. Sodium explodes in water due to extreme reactivity. Wood burns because it's flammable. Antacids neutralize stomach acid based on basic properties. Hydrogen peroxide decomposes into water and oxygen due to instability. Understanding chemical properties helps predict behavior and applications."
      }
    ]
  },
  "chem-3-4": {
    slides: [
      {
        title: "Physical Changes",
        content: "Physical changes alter appearance without changing chemical composition. The substance remains the same at the molecular level. Examples: ice melting to water (still H₂O), cutting paper, dissolving sugar in water, crushing a can. These changes are often reversible—water can freeze back to ice, dissolved sugar can be recovered by evaporation."
      },
      {
        title: "Chemical Changes",
        content: "Chemical changes produce new substances with different properties. Bonds break and new bonds form, creating different molecules. Evidence of chemical change includes: color change, gas production (bubbles), precipitate formation, energy release or absorption (heat, light), and irreversibility. Burning wood produces ash, carbon dioxide, and water—completely different from wood."
      },
      {
        title: "Distinguishing Changes",
        content: "Key question: Is the original substance still present? Melting butter is physical (still butter). Burning butter is chemical (produces new substances). Mixing baking soda and vinegar is chemical (produces CO₂ gas). Mixing salt and water is physical (salt dissolved but unchanged). Sometimes distinguishing is tricky—rusting looks like a coating but is actually chemical."
      }
    ]
  },
  "chem-3-5": {
    slides: [
      {
        title: "Why Separate Mixtures?",
        content: "Separating mixtures isolates pure substances for use. We purify drinking water, extract metals from ores, and separate components of crude oil. Separation exploits differences in physical properties between components: size, density, boiling point, solubility, or magnetic properties. The method chosen depends on the mixture type and component properties."
      },
      {
        title: "Common Separation Methods",
        content: "Filtration separates solids from liquids using a barrier (filter paper). Evaporation removes liquid to leave dissolved solid behind. Distillation separates liquids by different boiling points—heating vaporizes lower-boiling liquid first. Chromatography separates by different affinities for a stationary phase. Magnetism separates magnetic from non-magnetic materials."
      },
      {
        title: "Separation Techniques in Practice",
        content: "Water treatment plants use filtration and chemical treatment. Oil refineries use fractional distillation to produce gasoline, diesel, and kerosene. Coffee makers filter grounds from liquid. Salt is obtained by evaporating seawater. Crime labs use chromatography to analyze ink or blood. Recycling centers use magnets to separate iron from other materials."
      }
    ]
  },

  // Unit 4: Atomic Theory
  "chem-4-1": {
    slides: [
      {
        title: "Ancient Ideas About Atoms",
        content: "Around 400 BCE, Greek philosopher Democritus proposed that matter consists of tiny, indivisible particles called 'atomos' (uncuttable). However, Aristotle's competing theory—that matter was continuous and made of earth, water, air, and fire—dominated for nearly 2000 years. Scientific atomic theory wouldn't emerge until the early 1800s."
      },
      {
        title: "Evolution of Atomic Models",
        content: "John Dalton (1803) proposed atoms as solid spheres. J.J. Thomson (1897) discovered electrons and proposed the 'plum pudding' model—electrons embedded in positive material. Ernest Rutherford (1911) discovered the nucleus through his gold foil experiment. Niels Bohr (1913) placed electrons in specific orbits around the nucleus."
      },
      {
        title: "Modern Atomic Understanding",
        content: "The quantum mechanical model (1920s) replaced Bohr's orbits with probability clouds called orbitals. Electrons exist in regions of space, not fixed paths. Schrödinger's wave equation describes electron behavior mathematically. This model accurately predicts chemical properties and spectral lines. Atoms are now understood as mostly empty space with dense nuclei."
      }
    ]
  },
  "chem-4-2": {
    slides: [
      {
        title: "Dalton's Atomic Theory",
        content: "In 1803, John Dalton proposed: 1) All matter is made of indivisible atoms. 2) Atoms of the same element are identical in mass and properties. 3) Atoms of different elements have different masses and properties. 4) Atoms combine in simple whole-number ratios to form compounds. 5) Chemical reactions rearrange atoms but don't create or destroy them."
      },
      {
        title: "Evidence Supporting Dalton",
        content: "Dalton's theory explained known laws. The Law of Conservation of Mass (Lavoisier): mass is conserved in reactions because atoms are rearranged, not destroyed. The Law of Definite Proportions (Proust): compounds have fixed compositions because atoms combine in fixed ratios. The Law of Multiple Proportions: different compounds of same elements have small whole-number mass ratios."
      },
      {
        title: "Modifications to Dalton's Theory",
        content: "Modern science revised some of Dalton's ideas. Atoms are divisible into subatomic particles (protons, neutrons, electrons). Atoms of the same element can have different masses (isotopes). Nuclear reactions can convert atoms of one element to another. However, Dalton's fundamental concept—that atoms are the basic units of chemical behavior—remains foundational to chemistry."
      }
    ]
  },
  "chem-4-3": {
    slides: [
      {
        title: "Modern Atomic Theory Principles",
        content: "Modern atomic theory builds on Dalton's foundation with quantum mechanics. Key principles: 1) Atoms have a dense nucleus containing protons and neutrons. 2) Electrons occupy regions called orbitals around the nucleus. 3) Electrons have wave-particle duality. 4) The exact position of an electron cannot be determined—only probabilities. 5) Electron configuration determines chemical properties."
      },
      {
        title: "Wave-Particle Duality",
        content: "Electrons behave as both particles and waves. De Broglie proposed that all matter has wave properties, with wavelength inversely proportional to momentum. This explains why electrons don't spiral into the nucleus—standing wave patterns only allow certain energy levels. This duality is fundamental to understanding atomic structure and chemical bonding."
      },
      {
        title: "Implications for Chemistry",
        content: "Modern atomic theory explains periodic trends, chemical bonding, and spectroscopy. Electron configurations determine how atoms bond. Energy level transitions produce characteristic spectra. Orbital shapes explain molecular geometry. Understanding atomic structure at the quantum level enables technologies like lasers, semiconductors, and MRI machines."
      }
    ]
  },
  "chem-4-4": {
    slides: [
      {
        title: "The Three Subatomic Particles",
        content: "Atoms contain three main subatomic particles. Protons are positively charged (+1), located in the nucleus, with mass of about 1 amu (atomic mass unit). Neutrons are neutral (no charge), also in the nucleus, with mass of about 1 amu. Electrons are negatively charged (-1), orbit the nucleus, and have negligible mass (1/1836 of a proton)."
      },
      {
        title: "Particle Properties and Location",
        content: "The nucleus is tiny but contains nearly all atomic mass (protons + neutrons). It's held together by the strong nuclear force. Electrons occupy the vast space around the nucleus in orbitals. An atom's diameter is about 100,000 times its nucleus diameter—like a marble in a football stadium. Electrons are attracted to the positive nucleus by electromagnetic force."
      },
      {
        title: "Atomic Identity and Charge",
        content: "The number of protons defines the element (atomic number). All carbon atoms have 6 protons; all gold atoms have 79. Neutral atoms have equal protons and electrons. Ions form when atoms gain or lose electrons—cations are positive (lost electrons), anions are negative (gained electrons). Isotopes of an element have different neutron numbers."
      }
    ]
  },
  "chem-4-5": {
    slides: [
      {
        title: "Atomic Number (Z)",
        content: "The atomic number (Z) equals the number of protons in an atom's nucleus. It defines the element's identity and position on the periodic table. All atoms of an element have the same atomic number. Hydrogen has Z=1 (1 proton), carbon has Z=6 (6 protons), uranium has Z=92 (92 protons). The atomic number never changes for a given element."
      },
      {
        title: "Mass Number (A)",
        content: "The mass number (A) equals protons plus neutrons in the nucleus. Since protons and neutrons each have mass of approximately 1 amu, mass number closely approximates atomic mass. Mass number varies among isotopes of the same element. Carbon-12 has 6 protons + 6 neutrons = mass number 12. Carbon-14 has 6 protons + 8 neutrons = mass number 14."
      },
      {
        title: "Isotope Notation",
        content: "Isotopes are written as: Element-Mass Number (Carbon-12) or with nuclear notation showing mass number above and atomic number below the element symbol. Number of neutrons = mass number - atomic number. For Carbon-14: neutrons = 14 - 6 = 8. Isotopes have identical chemical properties but different physical properties and stability."
      }
    ]
  },

  // Unit 5: Electronic Structure of Atoms
  "chem-5-1": {
    slides: [
      {
        title: "What is the Electromagnetic Spectrum?",
        content: "The electromagnetic spectrum encompasses all types of electromagnetic radiation, from radio waves to gamma rays. All electromagnetic waves travel at the speed of light (3 × 10⁸ m/s) but differ in wavelength and frequency. The visible spectrum—red, orange, yellow, green, blue, violet—is a tiny portion of the full spectrum, representing wavelengths our eyes can detect."
      },
      {
        title: "Properties of Electromagnetic Radiation",
        content: "Key relationships: wavelength (λ) times frequency (ν) equals speed of light (c = λν). Higher frequency means shorter wavelength and higher energy. Radio waves have long wavelengths, low frequencies, and low energy. Gamma rays have short wavelengths, high frequencies, and high energy. Energy is quantized in packets called photons: E = hν, where h is Planck's constant."
      },
      {
        title: "Spectrum Applications",
        content: "Different regions have different uses. Radio waves transmit communications. Microwaves heat food by exciting water molecules. Infrared is thermal radiation. Visible light enables vision and photosynthesis. Ultraviolet causes sunburns but also kills bacteria. X-rays image bones by penetrating soft tissue. Gamma rays treat cancer by destroying cells."
      }
    ]
  },
  "chem-5-2": {
    slides: [
      {
        title: "What is an Emission Spectrum?",
        content: "When elements are heated or electrified, their atoms emit light at specific wavelengths, creating an emission spectrum. Unlike white light's continuous rainbow, atomic emission spectra show distinct colored lines against a dark background. Each element produces a unique pattern of lines—a 'fingerprint' that identifies the element. This phenomenon puzzled classical physics."
      },
      {
        title: "Origin of Emission Lines",
        content: "Electrons in atoms exist at specific energy levels. When an atom absorbs energy, electrons 'jump' to higher energy levels (excited state). This state is unstable, so electrons quickly 'fall' back to lower levels, releasing the energy difference as a photon of light. The wavelength of light corresponds exactly to the energy difference between levels."
      },
      {
        title: "Applications of Atomic Spectra",
        content: "Emission spectra identify elements in unknown samples (qualitative analysis). Astronomers use stellar spectra to determine star compositions—helium was discovered in the sun before Earth! Neon signs glow with characteristic colors when electricity excites neon atoms. Flame tests use emission colors to identify metals: sodium burns yellow, copper burns green, potassium burns violet."
      }
    ]
  },
  "chem-5-3": {
    slides: [
      {
        title: "Bohr's Revolutionary Model",
        content: "In 1913, Niels Bohr proposed that electrons orbit the nucleus in specific, quantized energy levels (shells), not anywhere they want. Electrons can only exist in these fixed orbits without radiating energy. When an electron jumps between levels, it absorbs or emits a photon with energy exactly matching the level difference. This explained atomic emission spectra."
      },
      {
        title: "Energy Levels in the Bohr Model",
        content: "Energy levels are numbered n = 1, 2, 3... (principal quantum number). Level 1 (closest to nucleus) has lowest energy—the ground state. Higher levels have higher energy. Energy increases as 1/n², so jumps between higher levels release less energy than those between lower levels. For hydrogen, Bohr calculated energy levels matching observed spectral lines perfectly."
      },
      {
        title: "Limitations of the Bohr Model",
        content: "The Bohr model works perfectly for hydrogen but fails for multi-electron atoms. It can't explain fine structure in spectra, the Zeeman effect (spectral splitting in magnetic fields), or chemical bonding. Electrons don't move in circular orbits—they exist in probability clouds. Despite limitations, Bohr's quantization concept remains fundamental to modern quantum mechanics."
      }
    ]
  },
  "chem-5-4": {
    slides: [
      {
        title: "The Quantum Mechanical Model",
        content: "The quantum mechanical model, developed in the 1920s by Schrödinger, Heisenberg, and others, replaces Bohr's orbits with orbitals—three-dimensional regions where electrons are likely to be found. The model treats electrons as waves described by wave functions. Squaring the wave function gives probability density—higher values indicate greater likelihood of finding the electron."
      },
      {
        title: "Quantum Numbers",
        content: "Four quantum numbers describe each electron. Principal (n = 1, 2, 3...) indicates energy level and size. Angular momentum (l = 0 to n-1) indicates orbital shape (s, p, d, f). Magnetic (ml = -l to +l) indicates orbital orientation in space. Spin (ms = +½ or -½) indicates electron spin direction. No two electrons can have identical sets of all four numbers (Pauli Exclusion Principle)."
      },
      {
        title: "Electron Probability and Orbitals",
        content: "Unlike Bohr's definite paths, quantum mechanics gives only probabilities. The Heisenberg Uncertainty Principle states we cannot simultaneously know an electron's exact position and momentum. Orbital diagrams show 90% probability boundaries—electrons might be anywhere but are most likely within the orbital shape. This probabilistic nature is fundamental to atomic behavior."
      }
    ]
  },
  "chem-5-5": {
    slides: [
      {
        title: "Orbital Shapes",
        content: "Orbitals have characteristic shapes based on angular momentum quantum number (l). s orbitals (l=0) are spherical. p orbitals (l=1) are dumbbell-shaped with two lobes, three orientations (px, py, pz). d orbitals (l=2) have complex four-lobed or dumbbell-with-ring shapes, five orientations. f orbitals (l=3) are even more complex with seven orientations."
      },
      {
        title: "Writing Electron Configurations",
        content: "Electron configuration shows how electrons fill orbitals following three rules. Aufbau Principle: fill lowest energy orbitals first (1s, 2s, 2p, 3s, 3p, 4s, 3d...). Pauli Exclusion: maximum 2 electrons per orbital with opposite spins. Hund's Rule: electrons fill orbitals of same sublevel singly before pairing. Example: oxygen (8 electrons) is 1s² 2s² 2p⁴."
      },
      {
        title: "Configurations and Properties",
        content: "Electron configuration determines chemical behavior. Elements in the same group have similar outer electron configurations, explaining similar properties. Noble gases have full outer shells (stable). Alkali metals have one outer electron (easily lost). Halogens need one electron to complete their shell (highly reactive). Configuration explains periodic trends and bonding patterns."
      }
    ]
  },

  // Unit 6: Periodic Table and Periodic Trends
  "chem-6-1": {
    slides: [
      {
        title: "Early Attempts at Organization",
        content: "Scientists sought patterns among elements long before the modern periodic table. Döbereiner's Triads (1829) grouped elements in threes with similar properties. Newlands' Law of Octaves (1864) noted that every eighth element had similar properties when arranged by atomic mass. These early attempts recognized periodicity but had significant gaps and inconsistencies."
      },
      {
        title: "Mendeleev's Breakthrough",
        content: "In 1869, Dmitri Mendeleev arranged 63 known elements by increasing atomic mass and grouped those with similar properties. He left gaps for undiscovered elements, predicting their properties with remarkable accuracy. When gallium, germanium, and scandium were discovered, their properties matched Mendeleev's predictions, validating his table as a powerful predictive tool."
      },
      {
        title: "The Modern Periodic Table",
        content: "Henry Moseley (1913) discovered that atomic number, not atomic mass, determines element properties. This resolved anomalies in Mendeleev's arrangement (like Te before I). Today's table has 118 confirmed elements arranged by increasing atomic number. The table's structure reflects electron configuration—periods correspond to shells, groups to similar outer electron arrangements."
      }
    ]
  },
  "chem-6-2": {
    slides: [
      {
        title: "What is the Periodic Law?",
        content: "The modern periodic law states: when elements are arranged by increasing atomic number, their physical and chemical properties show a periodic (repeating) pattern. This periodicity results from the repeating pattern of electron configurations. Each row (period) represents adding electrons to a new energy level. Elements in the same column (group) have similar properties because of similar outer electron configurations."
      },
      {
        title: "Periodicity of Properties",
        content: "Many properties vary predictably across periods and down groups. Atomic radius generally decreases across periods and increases down groups. Ionization energy increases across periods and decreases down groups. Electronegativity follows similar trends. Metallic character decreases across periods and increases down groups. These trends are explained by nuclear charge and electron shielding."
      },
      {
        title: "Significance of Periodic Law",
        content: "The periodic law enables predictions about element behavior without direct experimentation. Scientists predicted properties of synthetic elements before creating them. Chemists can predict reaction products, compound stability, and material properties based on periodic position. The law demonstrates the fundamental order underlying matter's diversity and guides research in chemistry and materials science."
      }
    ]
  },
  "chem-6-3": {
    slides: [
      {
        title: "Understanding Periods",
        content: "Periods are horizontal rows on the periodic table, numbered 1-7. Each period represents a new principal energy level being filled. Period 1 fills the 1s orbital (2 elements). Period 2 fills 2s and 2p (8 elements). Period 3 fills 3s and 3p (8 elements). Periods 4-7 include d and f orbitals, resulting in more elements. Properties change systematically across each period."
      },
      {
        title: "Understanding Groups",
        content: "Groups (families) are vertical columns, traditionally numbered 1-8 or 1-18 in modern notation. Elements in the same group have the same number of valence (outer) electrons, giving them similar chemical properties. Group 1 (alkali metals) all have one valence electron and are highly reactive. Group 18 (noble gases) all have full outer shells and are extremely stable."
      },
      {
        title: "Major Groups and Their Properties",
        content: "Group 1 (alkali metals): soft, reactive metals, form +1 ions. Group 2 (alkaline earth metals): harder, less reactive, form +2 ions. Groups 3-12 (transition metals): variable properties, colored compounds. Group 17 (halogens): reactive nonmetals, form -1 ions. Group 18 (noble gases): inert, full outer shells. These family characteristics guide chemical predictions."
      }
    ]
  },
  "chem-6-4": {
    slides: [
      {
        title: "What is Atomic Radius?",
        content: "Atomic radius is half the distance between the nuclei of two identical atoms bonded together. It measures atom 'size,' though atoms don't have sharp boundaries. Atomic radii range from about 30 pm (helium) to over 260 pm (cesium). Covalent radius refers to atoms in covalent bonds; metallic radius applies to metals; van der Waals radius measures non-bonded atoms."
      },
      {
        title: "Periodic Trends in Atomic Radius",
        content: "Across a period (left to right): atomic radius DECREASES. More protons pull electrons closer despite adding electrons to the same shell. Effective nuclear charge increases. Down a group: atomic radius INCREASES. Each period adds a new electron shell, placing outer electrons farther from the nucleus. The new shell also shields outer electrons from nuclear attraction."
      },
      {
        title: "Applications of Atomic Size",
        content: "Atomic size affects bonding and reactivity. Larger atoms form weaker bonds due to less orbital overlap. Smaller atoms can fit into tighter spaces in crystals and molecules. Ion sizes differ from atomic sizes—cations are smaller (lost electrons), anions are larger (gained electrons). Size trends help predict molecular shapes, lattice energies, and physical properties."
      }
    ]
  },
  "chem-6-5": {
    slides: [
      {
        title: "What is Ionization Energy?",
        content: "Ionization energy (IE) is the energy required to remove an electron from a gaseous atom, converting it to a positive ion: X(g) → X⁺(g) + e⁻. First ionization energy removes the outermost electron. Higher ionization energies exist for removing additional electrons. IE is always positive (endothermic)—energy must be added to overcome electron-nucleus attraction."
      },
      {
        title: "Periodic Trends in Ionization Energy",
        content: "Across a period (left to right): IE INCREASES. Smaller radius means electrons are closer to a more positive nucleus, harder to remove. Down a group: IE DECREASES. Larger radius means valence electrons are farther from the nucleus and better shielded by inner electrons, easier to remove. Noble gases have highest IE in each period (stable full shells)."
      },
      {
        title: "Ionization Energy and Reactivity",
        content: "Low IE metals (like Na, K) easily lose electrons, making them highly reactive—they form ionic compounds readily. High IE nonmetals hold electrons tightly, preferring to gain rather than lose. Successive ionization energies reveal electron configuration—large jumps occur when removing core electrons (Li: 1st IE 520 kJ/mol, 2nd IE 7,300 kJ/mol after full shell exposed)."
      }
    ]
  },
  "chem-6-6": {
    slides: [
      {
        title: "What is Electronegativity?",
        content: "Electronegativity measures an atom's ability to attract shared electrons in a chemical bond. It's a relative scale, not a measurable quantity. Linus Pauling developed the most common scale, ranging from 0.7 (francium) to 4.0 (fluorine). Electronegativity differences between bonded atoms determine bond polarity—whether electrons are shared equally or pulled toward one atom."
      },
      {
        title: "Periodic Trends in Electronegativity",
        content: "Across a period (left to right): electronegativity INCREASES. Smaller atoms with higher nuclear charge attract electrons more strongly. Down a group: electronegativity DECREASES. Larger atoms with more electron shielding attract bonding electrons less effectively. The most electronegative elements (F, O, N, Cl) are in the upper right. Noble gases typically aren't assigned values (don't bond)."
      },
      {
        title: "Electronegativity and Bonding",
        content: "Electronegativity differences predict bond type. Large difference (>1.7): ionic bond—electrons transfer completely. Medium difference (0.4-1.7): polar covalent—electrons shared unequally. Small difference (<0.4): nonpolar covalent—electrons shared equally. Water is polar because oxygen (3.5) attracts electrons more than hydrogen (2.1). This polarity explains water's unique properties."
      }
    ]
  },
  "chem-6-7": {
    slides: [
      {
        title: "What is Electron Affinity?",
        content: "Electron affinity (EA) is the energy change when a gaseous atom gains an electron: X(g) + e⁻ → X⁻(g). Negative EA means energy is released (exothermic)—the atom 'wants' the electron. Positive EA means energy must be added (endothermic). Most nonmetals have negative EA; they gain electrons readily. Metals and noble gases typically have positive or near-zero EA."
      },
      {
        title: "Periodic Trends in Electron Affinity",
        content: "Across a period (left to right): EA generally becomes MORE NEGATIVE (more energy released). Smaller atoms with higher nuclear charge attract additional electrons more strongly. Down a group: EA generally becomes LESS NEGATIVE. The added electron is farther from the nucleus and more shielded. Halogens have the most negative EA—they need just one electron for a full shell."
      },
      {
        title: "Electron Affinity Exceptions",
        content: "Nitrogen has unexpectedly low EA because its half-filled p subshell is particularly stable—adding an electron disrupts this. Noble gases have positive EA—their full shells resist additional electrons. Second electron affinities are always positive (adding electrons to already negative ions requires energy to overcome repulsion). EA helps predict compound formation and stability."
      }
    ]
  },

  // Unit 7: Chemical Bonding
  "chem-7-1": {
    slides: [
      {
        title: "What is Ionic Bonding?",
        content: "Ionic bonding occurs when electrons transfer completely from one atom to another, creating oppositely charged ions that attract. Typically, metals lose electrons to become positive cations, while nonmetals gain electrons to become negative anions. The electrostatic attraction between these oppositely charged ions holds them together in a crystal lattice structure."
      },
      {
        title: "Formation of Ionic Bonds",
        content: "Sodium (Na) has one valence electron and low ionization energy—it easily loses this electron to become Na⁺. Chlorine (Cl) has seven valence electrons and high electron affinity—it readily gains one electron to become Cl⁻. The transfer creates both ions with stable noble gas configurations. The Na⁺ and Cl⁻ attract, forming sodium chloride (NaCl)."
      },
      {
        title: "Properties of Ionic Compounds",
        content: "Ionic compounds form crystalline solids with high melting points due to strong electrostatic forces. They're brittle—when layers shift, like charges align and repel, causing fracture. They conduct electricity when molten or dissolved (mobile ions) but not as solids (fixed ions). They're often water-soluble because polar water molecules can separate and stabilize the ions."
      }
    ]
  },
  "chem-7-2": {
    slides: [
      {
        title: "What is Covalent Bonding?",
        content: "Covalent bonding occurs when atoms share electrons to achieve stable electron configurations. This typically happens between nonmetals with similar electronegativities. Neither atom gains or loses electrons completely—they share pairs of electrons, with each atom counting the shared electrons toward its octet. Shared electron pairs are attracted to both nuclei simultaneously."
      },
      {
        title: "Types of Covalent Bonds",
        content: "Single bonds share one electron pair (one line in Lewis structures). Double bonds share two pairs (two lines)—stronger and shorter than single bonds. Triple bonds share three pairs (three lines)—strongest and shortest. Examples: H₂ has single bond, O₂ has double bond, N₂ has triple bond. More bonds between atoms means greater bond strength and shorter bond length."
      },
      {
        title: "Properties of Covalent Compounds",
        content: "Covalent compounds form molecules rather than crystal lattices. They typically have lower melting/boiling points than ionic compounds because intermolecular forces (between molecules) are weaker than ionic bonds. They don't conduct electricity (no free ions). Many are gases or liquids at room temperature. They may be polar or nonpolar depending on molecular structure and electronegativity differences."
      }
    ]
  },
  "chem-7-3": {
    slides: [
      {
        title: "What is Metallic Bonding?",
        content: "Metallic bonding occurs in metals and alloys. Metal atoms release their valence electrons into a shared 'sea of electrons' that flows freely throughout the metal structure. Positive metal cations are embedded in this electron sea. The attraction between positive cations and the mobile electron cloud holds the metal together and gives metals their characteristic properties."
      },
      {
        title: "The Electron Sea Model",
        content: "In the electron sea model, valence electrons are delocalized—not bound to specific atoms. They can move freely through the metal lattice. This explains electrical conductivity: electrons flow easily when voltage is applied. Thermal conductivity results from electrons transferring kinetic energy rapidly. The model is simplified but explains most metallic properties effectively."
      },
      {
        title: "Properties of Metals",
        content: "Metallic bonding explains metal properties. Conductivity: free electrons carry current and heat. Malleability and ductility: atoms can slide past each other without breaking bonds—the electron sea 'flows' along. Luster: free electrons absorb and re-emit light. High melting points: strong overall bonding (especially in transition metals with more delocalized electrons)."
      }
    ]
  },
  "chem-7-4": {
    slides: [
      {
        title: "What Are Lewis Structures?",
        content: "Lewis structures (electron dot diagrams) represent valence electrons in atoms and molecules. Dots represent valence electrons; lines represent shared pairs (bonds). They show how atoms achieve octets (or duets for hydrogen). Lewis structures help visualize bonding, predict molecular shapes, and identify lone pairs. They're named after Gilbert Lewis, who developed them in 1916."
      },
      {
        title: "Drawing Lewis Structures",
        content: "Steps: 1) Count total valence electrons. 2) Draw skeleton structure (least electronegative atom usually central). 3) Place bonding pairs between atoms. 4) Distribute remaining electrons as lone pairs to complete octets. 5) If atoms lack octets, convert lone pairs to multiple bonds. Check that total electrons match the count. For ions, add/subtract electrons for charge."
      },
      {
        title: "Lewis Structure Examples",
        content: "Water (H₂O): 8 valence electrons; O in center bonded to two H's; two lone pairs on O. Carbon dioxide (CO₂): 16 electrons; C double-bonded to each O; each O has two lone pairs. Some molecules require resonance structures—multiple valid Lewis structures where the actual structure is a hybrid. Lewis structures are simplified but useful for predicting properties."
      }
    ]
  },
  "chem-7-5": {
    slides: [
      {
        title: "What is VSEPR Theory?",
        content: "VSEPR (Valence Shell Electron Pair Repulsion) theory predicts molecular shapes based on the idea that electron pairs around a central atom repel each other and arrange themselves to minimize repulsion. Both bonding pairs and lone pairs count. The resulting arrangement determines molecular geometry. VSEPR uses Lewis structures as the starting point for shape prediction."
      },
      {
        title: "Common Molecular Geometries",
        content: "With no lone pairs: 2 electron domains = linear (180°). 3 domains = trigonal planar (120°). 4 domains = tetrahedral (109.5°). 5 domains = trigonal bipyramidal. 6 domains = octahedral. Lone pairs take more space than bonding pairs, compressing bond angles. 4 domains with 1 lone pair = trigonal pyramidal (107°). 4 domains with 2 lone pairs = bent (104.5°)."
      },
      {
        title: "Applying VSEPR Theory",
        content: "Example: Water has 4 electron domains (2 bonds + 2 lone pairs) with bent geometry. Ammonia (NH₃) has 4 domains (3 bonds + 1 lone pair) with trigonal pyramidal geometry. Carbon dioxide (CO₂) has 2 domains with linear geometry. Methane (CH₄) has 4 domains with tetrahedral geometry. Molecular shape affects polarity, reactivity, and biological function."
      }
    ]
  },
  "chem-7-6": {
    slides: [
      {
        title: "What is Molecular Polarity?",
        content: "Molecular polarity describes uneven charge distribution in a molecule. Polar molecules have a net dipole moment—a positive end and a negative end. This occurs when polar bonds don't cancel due to molecular geometry. Polarity affects physical properties like boiling point, solubility, and intermolecular forces. 'Like dissolves like'—polar solvents dissolve polar solutes."
      },
      {
        title: "Determining Molecular Polarity",
        content: "Two conditions create polar molecules: 1) Polar bonds (electronegativity difference > 0.4) and 2) Asymmetric geometry where bond dipoles don't cancel. CO₂ has polar C=O bonds but linear geometry—dipoles cancel, nonpolar. H₂O has polar O-H bonds and bent geometry—dipoles don't cancel, polar. Symmetric molecules like CH₄ and CCl₄ are nonpolar despite polar bonds."
      },
      {
        title: "Effects of Polarity",
        content: "Polar molecules have stronger intermolecular forces, leading to higher boiling points (water boils at 100°C vs. methane at -164°C despite similar masses). Polar substances dissolve in polar solvents—salt dissolves in water, not oil. Polarity affects chemical reactivity—polar regions are targets for reactions. Biological membranes are organized by polarity—nonpolar fatty acid tails, polar heads."
      }
    ]
  },

  // Unit 8: Chemical Formulas and Nomenclature
  "chem-8-1": {
    slides: [
      {
        title: "Types of Chemical Formulas",
        content: "Chemical formulas represent compound composition in different ways. Empirical formulas show the simplest whole-number ratio of atoms (CH₂O for glucose). Molecular formulas show actual numbers of each atom in a molecule (C₆H₁₂O₆ for glucose). Structural formulas show how atoms are connected. Condensed formulas abbreviate structural formulas (CH₃CH₂OH for ethanol)."
      },
      {
        title: "Empirical vs. Molecular Formulas",
        content: "The empirical formula is the molecular formula reduced to lowest terms. Glucose (C₆H₁₂O₆) has empirical formula CH₂O. Multiple compounds can share the same empirical formula—acetic acid (C₂H₄O₂) also reduces to CH₂O. To find molecular formula from empirical, multiply by n where n = molecular mass ÷ empirical formula mass."
      },
      {
        title: "Using Different Formula Types",
        content: "Empirical formulas come from percent composition data. Molecular formulas require knowing molar mass. Structural formulas distinguish isomers—different compounds with the same molecular formula. For example, C₂H₆O can be ethanol (CH₃CH₂OH) or dimethyl ether (CH₃OCH₃)—same atoms, different arrangements, different properties."
      }
    ]
  },
  "chem-8-2": {
    slides: [
      {
        title: "Writing Formulas for Ionic Compounds",
        content: "Ionic compound formulas must be electrically neutral—total positive charges equal total negative charges. Determine ion charges from periodic table position: Group 1 = +1, Group 2 = +2, Group 17 = -1, Group 16 = -2. Transition metals may have variable charges indicated by Roman numerals. Combine ions in the ratio that achieves neutrality."
      },
      {
        title: "The Criss-Cross Method",
        content: "A quick method: write ion symbols with charges, then 'criss-cross' the charge numbers to become subscripts. For aluminum oxide: Al³⁺ and O²⁻ criss-cross to Al₂O₃. Check that charges balance: 2(+3) + 3(-2) = 0. Reduce to lowest terms if needed. This method works because it mathematically ensures charge balance."
      },
      {
        title: "Polyatomic Ions in Formulas",
        content: "Polyatomic ions are groups of atoms bonded together with an overall charge. Common examples: sulfate (SO₄²⁻), nitrate (NO₃⁻), hydroxide (OH⁻), ammonium (NH₄⁺). In formulas, enclose polyatomic ions in parentheses when using subscripts: calcium nitrate is Ca(NO₃)₂, not CaNO₃₂. The parentheses indicate all atoms in the ion are multiplied."
      }
    ]
  },
  "chem-8-3": {
    slides: [
      {
        title: "Naming Binary Ionic Compounds",
        content: "For simple ionic compounds with one metal and one nonmetal: name the metal first (unchanged), then the nonmetal with -ide suffix. NaCl is sodium chloride. MgO is magnesium oxide. CaBr₂ is calcium bromide. The subscripts indicate ratio but aren't part of the name. For metals with variable charges, use Roman numerals: FeCl₂ is iron(II) chloride, FeCl₃ is iron(III) chloride."
      },
      {
        title: "Roman Numeral Notation",
        content: "Many transition metals form ions with different charges. The Roman numeral in parentheses shows the charge on the metal ion in that compound. Copper can be Cu⁺ or Cu²⁺, so CuCl is copper(I) chloride and CuCl₂ is copper(II) chloride. Calculate the metal charge from the total anion charge needed for neutrality."
      },
      {
        title: "Naming Compounds with Polyatomic Ions",
        content: "Name the cation, then the polyatomic anion using its established name. NaOH is sodium hydroxide. Ca(NO₃)₂ is calcium nitrate. Fe₂(SO₄)₃ is iron(III) sulfate. When the cation is polyatomic (like ammonium NH₄⁺), treat it like a metal: NH₄Cl is ammonium chloride. Memorize common polyatomic ion names and formulas."
      }
    ]
  },
  "chem-8-4": {
    slides: [
      {
        title: "Naming Binary Covalent Compounds",
        content: "Covalent compounds use Greek prefixes to indicate atom counts. Name the less electronegative element first (no prefix for mono- on first element), then the more electronegative with -ide suffix. Prefixes: mono(1), di(2), tri(3), tetra(4), penta(5), hexa(6), hepta(7), octa(8), nona(9), deca(10). CO₂ is carbon dioxide. N₂O₅ is dinitrogen pentoxide."
      },
      {
        title: "Greek Prefix Rules",
        content: "Drop the 'o' or 'a' from prefix when the element name starts with a vowel for easier pronunciation: monoxide (not monooxide), pentoxide (not pentaoxide). Don't use mono- for the first element: CO is carbon monoxide, not monocarbon monoxide. These rules apply only to covalent compounds, not ionic compounds."
      },
      {
        title: "Common Covalent Compound Names",
        content: "Some covalent compounds have common names used instead of systematic names. H₂O is water (not dihydrogen monoxide). NH₃ is ammonia. CH₄ is methane. Learn both systematic and common names: dinitrogen monoxide (N₂O) is also called nitrous oxide or laughing gas. For most compounds, use systematic naming."
      }
    ]
  },
  "chem-8-5": {
    slides: [
      {
        title: "Naming Binary Acids",
        content: "Binary acids contain hydrogen and one other element (usually a halogen). Naming format: 'hydro-' + element root + '-ic acid.' HCl is hydrochloric acid (hydrogen + chlorine). HBr is hydrobromic acid. HF is hydrofluoric acid. H₂S is hydrosulfuric acid. The 'hydro' prefix distinguishes binary acids from oxyacids and indicates no oxygen is present."
      },
      {
        title: "Naming Oxyacids",
        content: "Oxyacids contain hydrogen, oxygen, and another element. Naming depends on the oxyanion's name. If oxyanion ends in -ate, acid ends in -ic acid: nitrate (NO₃⁻) → nitric acid (HNO₃). If oxyanion ends in -ite, acid ends in -ous acid: nitrite (NO₂⁻) → nitrous acid (HNO₂). Sulfate → sulfuric acid; sulfite → sulfurous acid."
      },
      {
        title: "Naming Bases",
        content: "Most common bases are ionic hydroxides. Name using standard ionic compound rules: metal + hydroxide. NaOH is sodium hydroxide. Ca(OH)₂ is calcium hydroxide. KOH is potassium hydroxide. Some molecular compounds are also bases: ammonia (NH₃) acts as a base by accepting H⁺. Organic amines (like methylamine, CH₃NH₂) are also bases."
      }
    ]
  },

  // Unit 9: The Mole Concept
  "chem-9-1": {
    slides: [
      {
        title: "What is Avogadro's Number?",
        content: "Avogadro's number (Nₐ) is 6.022 × 10²³—the number of particles in one mole of any substance. Just as a 'dozen' always means 12, a 'mole' always means this specific number of particles. This enormous number is chosen because it connects the atomic mass scale to practical, measurable quantities in the laboratory. It bridges the atomic and macroscopic worlds."
      },
      {
        title: "Why Avogadro's Number?",
        content: "Atoms are too small to count individually. Avogadro's number is defined so that one mole of any element has a mass in grams equal to its atomic mass in amu. One carbon-12 atom has mass 12 amu; one mole of carbon-12 has mass 12 grams. This makes the connection between atomic masses and laboratory masses simple and practical."
      },
      {
        title: "Using Avogadro's Number",
        content: "Convert between moles and particles using Nₐ as a conversion factor. Particles = moles × (6.022 × 10²³ particles/mol). Moles = particles ÷ (6.022 × 10²³). How many molecules in 0.5 mol of water? 0.5 × 6.022 × 10²³ = 3.011 × 10²³ molecules. How many moles is 1.204 × 10²⁴ atoms? 1.204 × 10²⁴ ÷ 6.022 × 10²³ = 2 moles."
      }
    ]
  },
  "chem-9-2": {
    slides: [
      {
        title: "What is Molar Mass?",
        content: "Molar mass is the mass of one mole of a substance, expressed in grams per mole (g/mol). For elements, molar mass numerically equals atomic mass from the periodic table. Carbon's atomic mass is 12.01 amu, so its molar mass is 12.01 g/mol. One mole of carbon atoms has mass 12.01 grams and contains 6.022 × 10²³ carbon atoms."
      },
      {
        title: "Calculating Molar Mass of Compounds",
        content: "Add up the molar masses of all atoms in the formula. For H₂O: 2(1.01) + 1(16.00) = 18.02 g/mol. For Ca(OH)₂: 40.08 + 2(16.00) + 2(1.01) = 74.10 g/mol. For glucose C₆H₁₂O₆: 6(12.01) + 12(1.01) + 6(16.00) = 180.18 g/mol. Always use the molar mass with proper significant figures."
      },
      {
        title: "Using Molar Mass in Calculations",
        content: "Molar mass converts between grams and moles. Moles = mass (g) ÷ molar mass (g/mol). Mass = moles × molar mass. How many moles in 36.04 g of water? 36.04 g ÷ 18.02 g/mol = 2.00 mol. What is the mass of 0.50 mol of NaCl (58.44 g/mol)? 0.50 mol × 58.44 g/mol = 29.22 g."
      }
    ]
  },
  "chem-9-3": {
    slides: [
      {
        title: "Converting Moles to Mass",
        content: "To find mass from moles, multiply by molar mass. Formula: mass (g) = moles × molar mass (g/mol). Example: Find the mass of 2.5 moles of sulfuric acid (H₂SO₄). Molar mass = 2(1.01) + 32.07 + 4(16.00) = 98.09 g/mol. Mass = 2.5 mol × 98.09 g/mol = 245 g."
      },
      {
        title: "Converting Mass to Moles",
        content: "To find moles from mass, divide by molar mass. Formula: moles = mass (g) ÷ molar mass (g/mol). Example: How many moles are in 180 g of glucose (C₆H₁₂O₆)? Molar mass = 180.18 g/mol. Moles = 180 g ÷ 180.18 g/mol = 0.999 mol ≈ 1.00 mol."
      },
      {
        title: "Multi-Step Conversions",
        content: "Combine conversions to relate mass, moles, and particles. Example: How many molecules are in 9.0 g of water? Step 1: Find moles: 9.0 g ÷ 18.02 g/mol = 0.50 mol. Step 2: Find molecules: 0.50 mol × 6.022 × 10²³ = 3.0 × 10²³ molecules. These chain calculations use dimensional analysis throughout."
      }
    ]
  },
  "chem-9-4": {
    slides: [
      {
        title: "What is Percent Composition?",
        content: "Percent composition gives the mass percentage of each element in a compound. Formula: % element = (mass of element in 1 mol compound ÷ molar mass of compound) × 100%. This tells you what fraction of the compound's mass comes from each element. For water: % H = (2.02 ÷ 18.02) × 100% = 11.2%. % O = (16.00 ÷ 18.02) × 100% = 88.8%."
      },
      {
        title: "Calculating Percent Composition",
        content: "Example: Find percent composition of glucose C₆H₁₂O₆ (molar mass 180.18 g/mol). Carbon: 6(12.01) = 72.06 g; % C = (72.06/180.18) × 100% = 40.00%. Hydrogen: 12(1.01) = 12.12 g; % H = (12.12/180.18) × 100% = 6.73%. Oxygen: 6(16.00) = 96.00 g; % O = (96.00/180.18) × 100% = 53.27%. Percentages should sum to 100%."
      },
      {
        title: "Using Percent Composition",
        content: "Percent composition helps verify compound identity and purity. If you analyze a sample and find 40.0% carbon, 6.7% hydrogen, and 53.3% oxygen, it matches glucose's composition. Industry uses this for quality control. Percent composition data can also be used to find empirical formulas of unknown compounds."
      }
    ]
  },
  "chem-9-5": {
    slides: [
      {
        title: "Finding Empirical Formulas",
        content: "The empirical formula shows the simplest whole-number ratio of atoms. From percent composition: 1) Assume 100 g sample (percentages become grams). 2) Convert grams to moles for each element. 3) Divide all mole values by the smallest to get the ratio. 4) Multiply to get whole numbers if needed. Example: 40% C, 6.7% H, 53.3% O → CH₂O."
      },
      {
        title: "Empirical Formula Example",
        content: "A compound is 71.65% Cl, 24.27% C, 4.07% H. Assume 100 g: 71.65 g Cl, 24.27 g C, 4.07 g H. Convert to moles: Cl = 71.65/35.45 = 2.02 mol; C = 24.27/12.01 = 2.02 mol; H = 4.07/1.01 = 4.03 mol. Divide by smallest (2.02): Cl:C:H = 1:1:2. Empirical formula: CHCl or better written as CH₂Cl₂."
      },
      {
        title: "Finding Molecular Formulas",
        content: "Molecular formula = n × empirical formula, where n is a whole number. Find n by dividing molecular mass by empirical formula mass. Example: Empirical formula CH₂O (mass 30 g/mol), molecular mass is 180 g/mol. n = 180/30 = 6. Molecular formula = (CH₂O)₆ = C₆H₁₂O₆ (glucose)."
      }
    ]
  },

  // Unit 10: Chemical Reactions
  "chem-10-1": {
    slides: [
      {
        title: "Five Types of Chemical Reactions",
        content: "Chemical reactions are classified into five main types: Synthesis (A + B → AB)—elements or compounds combine. Decomposition (AB → A + B)—compounds break apart. Single Replacement (A + BC → AC + B)—one element replaces another. Double Replacement (AB + CD → AD + CB)—ions exchange partners. Combustion—substances react with oxygen, producing heat and light."
      },
      {
        title: "Synthesis and Decomposition",
        content: "Synthesis reactions build larger molecules from smaller ones. 2H₂ + O₂ → 2H₂O (water synthesis). 2Na + Cl₂ → 2NaCl (salt synthesis). Decomposition reactions break compounds into simpler substances. 2H₂O → 2H₂ + O₂ (electrolysis). CaCO₃ → CaO + CO₂ (limestone decomposition). These are reverse processes of each other."
      },
      {
        title: "Replacement and Combustion",
        content: "Single replacement: Zn + CuSO₄ → ZnSO₄ + Cu (zinc displaces copper). Activity series predicts which metals replace others. Double replacement: AgNO₃ + NaCl → AgCl↓ + NaNO₃ (precipitate forms). Common in precipitation and neutralization. Combustion: CH₄ + 2O₂ → CO₂ + 2H₂O (burning methane). Hydrocarbons combust to form CO₂ and H₂O."
      }
    ]
  },
  "chem-10-2": {
    slides: [
      {
        title: "Writing Chemical Equations",
        content: "Chemical equations use symbols to represent reactions. Reactants appear on the left, products on the right, separated by an arrow (→). Coefficients show the ratio of particles. State symbols indicate physical states: (s) solid, (l) liquid, (g) gas, (aq) aqueous solution. Catalysts are written above or below the arrow. Example: 2H₂(g) + O₂(g) → 2H₂O(l)."
      },
      {
        title: "Balancing Chemical Equations",
        content: "Balanced equations have equal atoms of each element on both sides (Law of Conservation of Mass). Steps: 1) Write the unbalanced equation. 2) Count atoms of each element on both sides. 3) Add coefficients to balance one element at a time. 4) Check all elements are balanced. 5) Reduce coefficients to lowest whole numbers. Never change subscripts—that changes the substance!"
      },
      {
        title: "Balancing Example",
        content: "Balance: Fe + O₂ → Fe₂O₃. Left: 1 Fe, 2 O. Right: 2 Fe, 3 O. Start with Fe: 2Fe + O₂ → Fe₂O₃ (2 Fe each side). Now oxygen: 2Fe + O₂ → Fe₂O₃ has 2 O left, 3 O right. Use fractional coefficient: 2Fe + 1.5O₂ → Fe₂O₃. Multiply all by 2: 4Fe + 3O₂ → 2Fe₂O₃. Final: 4 Fe, 6 O each side. Balanced!"
      }
    ]
  },
  "chem-10-3": {
    slides: [
      {
        title: "The Law of Conservation of Mass",
        content: "The Law of Conservation of Mass states that matter cannot be created or destroyed in a chemical reaction. The total mass of reactants equals the total mass of products. Atoms are rearranged during reactions, but no atoms appear or disappear. This fundamental law, established by Lavoisier in 1789, is the basis for balancing chemical equations."
      },
      {
        title: "Evidence for Conservation of Mass",
        content: "Early chemists noticed that burning substances in closed containers showed no mass change. When lead oxide was reduced with carbon, the mass of lead plus gas produced equaled the starting mass. In any reaction where all products are captured and measured, mass is conserved precisely. Nuclear reactions are the only exception (E = mc²)."
      },
      {
        title: "Applying Conservation of Mass",
        content: "Example: If 4.0 g hydrogen reacts with 32.0 g oxygen to form water, how much water forms? Total mass of reactants = 4.0 + 32.0 = 36.0 g. By conservation of mass, mass of products = 36.0 g of water. This principle helps calculate unknown quantities and verify experimental results. Balanced equations respect conservation of mass."
      }
    ]
  },
  "chem-10-4": {
    slides: [
      {
        title: "Predicting Products of Synthesis",
        content: "Synthesis: two or more substances combine to form one product. Metal + oxygen → metal oxide: 4Na + O₂ → 2Na₂O. Metal + nonmetal → ionic compound: 2K + Cl₂ → 2KCl. Metal oxide + water → metal hydroxide (base): CaO + H₂O → Ca(OH)₂. Nonmetal oxide + water → acid: SO₃ + H₂O → H₂SO₄."
      },
      {
        title: "Predicting Products of Decomposition",
        content: "Decomposition: one compound breaks into simpler substances. Metal carbonates → metal oxide + CO₂: CaCO₃ → CaO + CO₂. Metal hydroxides → metal oxide + water: Ca(OH)₂ → CaO + H₂O. Certain metal chlorates → metal chloride + O₂: 2KClO₃ → 2KCl + 3O₂. Electrolysis of water: 2H₂O → 2H₂ + O₂."
      },
      {
        title: "Predicting Products of Replacement",
        content: "Single replacement: check activity series—more active element replaces less active. Zn + CuSO₄ → ZnSO₄ + Cu (zinc more active than copper). Double replacement products are a new combination of cation-anion pairs. Reaction proceeds if precipitate, gas, or water forms. NaOH + HCl → NaCl + H₂O (neutralization). AgNO₃ + NaCl → AgCl↓ + NaNO₃ (precipitate)."
      }
    ]
  },

  // Unit 11: Stoichiometry
  "chem-11-1": {
    slides: [
      {
        title: "What is Stoichiometry?",
        content: "Stoichiometry is the calculation of quantities in chemical reactions based on the mole ratio from balanced equations. The coefficients in balanced equations represent mole ratios. For 2H₂ + O₂ → 2H₂O, the ratio is 2:1:2—two moles of hydrogen react with one mole of oxygen to produce two moles of water. These ratios are conversion factors."
      },
      {
        title: "Mole-to-Mole Calculations",
        content: "Use coefficients as conversion factors between moles of different substances. Example: How many moles of O₂ react with 4.0 mol H₂? From 2H₂ + O₂ → 2H₂O, ratio is 2 mol H₂ : 1 mol O₂. 4.0 mol H₂ × (1 mol O₂ / 2 mol H₂) = 2.0 mol O₂."
      },
      {
        title: "More Mole-to-Mole Examples",
        content: "For 4Fe + 3O₂ → 2Fe₂O₃: How many moles of Fe₂O₃ form from 6.0 mol Fe? 6.0 mol Fe × (2 mol Fe₂O₃ / 4 mol Fe) = 3.0 mol Fe₂O₃. How many moles of O₂ needed? 6.0 mol Fe × (3 mol O₂ / 4 mol Fe) = 4.5 mol O₂. Always start with the balanced equation and use mole ratios."
      }
    ]
  },
  "chem-11-2": {
    slides: [
      {
        title: "Mass-to-Mass Stoichiometry",
        content: "Most problems involve mass, not moles. The conversion path is: given mass → moles of given → moles of unknown → mass of unknown. Use molar mass to convert between mass and moles. Use mole ratio from balanced equation to convert between substances. This three-step process solves most stoichiometry problems."
      },
      {
        title: "Mass-to-Mass Example",
        content: "How many grams of CO₂ form from burning 24 g of carbon? C + O₂ → CO₂. Step 1: 24 g C ÷ 12 g/mol = 2.0 mol C. Step 2: 2.0 mol C × (1 mol CO₂ / 1 mol C) = 2.0 mol CO₂. Step 3: 2.0 mol CO₂ × 44 g/mol = 88 g CO₂."
      },
      {
        title: "Complex Mass-to-Mass Problems",
        content: "Example: How many grams of water form from 100 g of hydrogen? 2H₂ + O₂ → 2H₂O. 100 g H₂ ÷ 2.02 g/mol = 49.5 mol H₂. 49.5 mol H₂ × (2 mol H₂O / 2 mol H₂) = 49.5 mol H₂O. 49.5 mol × 18.02 g/mol = 892 g H₂O. Always check units cancel properly through the calculation."
      }
    ]
  },
  "chem-11-3": {
    slides: [
      {
        title: "What is a Limiting Reactant?",
        content: "The limiting reactant is the substance that runs out first, stopping the reaction and determining the amount of product formed. Other reactants are 'in excess'—some remains unreacted. Like making sandwiches: with 10 bread slices and 3 cheese slices, cheese limits you to 3 sandwiches despite having bread for 5."
      },
      {
        title: "Finding the Limiting Reactant",
        content: "Method 1: Calculate how much product each reactant could make if it were limiting. The reactant producing less product is limiting. Method 2: Calculate moles of each reactant, then divide each by its coefficient. The smaller result indicates the limiting reactant. Method 2 is often faster for multiple product problems."
      },
      {
        title: "Limiting Reactant Example",
        content: "10 g H₂ and 80 g O₂ react: 2H₂ + O₂ → 2H₂O. How much water forms? H₂: 10 g ÷ 2.02 g/mol = 4.95 mol; could make 4.95 mol H₂O. O₂: 80 g ÷ 32 g/mol = 2.5 mol; could make 5.0 mol H₂O. H₂ produces less → H₂ is limiting. Product = 4.95 mol H₂O = 89 g H₂O. Excess O₂ = 2.5 - 2.48 = 0.02 mol."
      }
    ]
  },
  "chem-11-4": {
    slides: [
      {
        title: "Theoretical vs. Actual Yield",
        content: "Theoretical yield is the maximum amount of product calculated from stoichiometry assuming the limiting reactant is 100% converted. Actual yield is the amount actually obtained in an experiment—always less than or equal to theoretical. Losses occur due to incomplete reactions, side reactions, purification losses, and measurement errors."
      },
      {
        title: "Calculating Percent Yield",
        content: "Percent yield = (actual yield / theoretical yield) × 100%. This measures reaction efficiency. Example: Theoretical yield is 50.0 g, actual yield is 42.5 g. Percent yield = (42.5 / 50.0) × 100% = 85.0%. Higher percent yields indicate more efficient reactions. Industrial processes aim for high percent yields to reduce waste and cost."
      },
      {
        title: "Factors Affecting Yield",
        content: "Incomplete reactions: equilibrium may favor reactants, or reaction may be slow. Side reactions: reactants form undesired products. Loss during transfer: product left in containers, filters, etc. Impure reactants: less actual reactant than measured. Experimental technique and conditions affect yield. Chemists optimize conditions to maximize percent yield."
      }
    ]
  },

  // Unit 12: States of Matter
  "chem-12-1": {
    slides: [
      {
        title: "Properties of Solids",
        content: "Solids have definite shape and volume. Particles are closely packed in fixed positions, vibrating but not moving past each other. Strong intermolecular forces maintain structure. Crystalline solids have ordered arrangements (salt, diamond); amorphous solids lack long-range order (glass, plastic). Solids are incompressible and have high density."
      },
      {
        title: "Properties of Liquids",
        content: "Liquids have definite volume but take the shape of their container. Particles are close together but can move past each other. Intermolecular forces are weaker than in solids. Liquids flow, can be poured, and have a surface tension due to cohesive forces. They're nearly incompressible. Viscosity measures resistance to flow—honey is more viscous than water."
      },
      {
        title: "Properties of Gases",
        content: "Gases have no definite shape or volume—they expand to fill their container. Particles are far apart and move freely at high speeds. Intermolecular forces are negligible except during collisions. Gases are easily compressed and have low density. Gas pressure results from particles colliding with container walls. Gases diffuse rapidly to fill available space uniformly."
      }
    ]
  },
  "chem-12-2": {
    slides: [
      {
        title: "The Kinetic Molecular Theory",
        content: "The Kinetic Molecular Theory (KMT) explains gas behavior using several postulates: 1) Gases consist of particles in constant random motion. 2) Particle volume is negligible compared to container volume. 3) Particles exert no attractive or repulsive forces on each other. 4) Collisions are perfectly elastic (no energy loss). 5) Average kinetic energy is proportional to temperature."
      },
      {
        title: "Temperature and Kinetic Energy",
        content: "Temperature measures average kinetic energy of particles. Higher temperature means faster average particle motion. At absolute zero (0 K or -273°C), theoretical particle motion stops (though quantum effects prevent complete cessation). KE = ½mv², so at the same temperature, lighter particles move faster than heavier ones. This explains why helium effuses faster than oxygen."
      },
      {
        title: "KMT and Gas Laws",
        content: "KMT explains gas laws. Pressure increases with temperature (faster particles hit walls harder). Volume increases with temperature (particles spread out). Pressure increases when volume decreases (more collisions with walls). Adding gas increases pressure (more particles colliding). Real gases deviate from ideal behavior at high pressure and low temperature when particles are forced closer together."
      }
    ]
  },
  "chem-12-3": {
    slides: [
      {
        title: "Types of Phase Changes",
        content: "Phase changes occur when matter transitions between solid, liquid, and gas states. Melting: solid → liquid. Freezing: liquid → solid. Vaporization: liquid → gas (evaporation at surface, boiling throughout). Condensation: gas → liquid. Sublimation: solid → gas directly. Deposition: gas → solid directly. Each occurs at specific temperatures and pressures."
      },
      {
        title: "Energy in Phase Changes",
        content: "Endothermic changes (absorb energy): melting, vaporization, sublimation—particles gain energy to overcome intermolecular forces. Exothermic changes (release energy): freezing, condensation, deposition—particles lose energy as forces reform. During a phase change, temperature stays constant—added energy changes state, not temperature. This energy is called latent heat."
      },
      {
        title: "Phase Diagrams",
        content: "Phase diagrams show which state exists at given temperature and pressure. Lines represent conditions where two phases coexist in equilibrium. The triple point is where all three phases coexist. The critical point is the end of the liquid-gas line—above it, liquid and gas become indistinguishable (supercritical fluid). Water's phase diagram is unusual—its solid-liquid line slopes left."
      }
    ]
  },
  "chem-12-4": {
    slides: [
      {
        title: "Understanding Heating Curves",
        content: "A heating curve graphs temperature vs. heat added for a substance. Diagonal sections show temperature increase within a single phase. Horizontal plateaus show phase changes—temperature remains constant as energy goes into changing state, not increasing kinetic energy. The plateau lengths depend on latent heat values. Heating curves reveal melting point, boiling point, and heat capacities."
      },
      {
        title: "Heating Curve Segments",
        content: "For water starting as ice: 1) Ice warms (diagonal). 2) Ice melts at 0°C (horizontal—heat of fusion absorbed). 3) Water warms (diagonal). 4) Water boils at 100°C (horizontal—heat of vaporization absorbed). 5) Steam warms (diagonal). The boiling plateau is longer than melting because vaporization requires more energy than fusion."
      },
      {
        title: "Cooling Curves",
        content: "Cooling curves are heating curves in reverse—temperature vs. heat removed. Diagonal sections show cooling; horizontal plateaus show condensation and freezing. The plateaus occur at the same temperatures as heating but represent energy release. Supercooling can occur when liquids cool below freezing point without solidifying, then suddenly crystallize."
      }
    ]
  },

  // Unit 13: Gas Laws
  "chem-13-1": {
    slides: [
      {
        title: "Boyle's Law",
        content: "Boyle's Law states that at constant temperature, gas pressure is inversely proportional to volume. If volume decreases, pressure increases proportionally (and vice versa). Mathematical form: P₁V₁ = P₂V₂. Compress a gas to half its volume, pressure doubles. This law was discovered by Robert Boyle in 1662 through experiments with trapped air."
      },
      {
        title: "Understanding Boyle's Law",
        content: "KMT explains Boyle's Law: fewer particles in a smaller space means more frequent wall collisions, increasing pressure. Imagine a syringe with trapped air—pushing the plunger reduces volume and increases pressure. Releasing allows air to expand and pressure to drop. The product PV remains constant for a fixed amount of gas at constant temperature."
      },
      {
        title: "Boyle's Law Calculations",
        content: "Example: A gas occupies 2.0 L at 1.0 atm. What volume at 4.0 atm (constant T)? P₁V₁ = P₂V₂. (1.0 atm)(2.0 L) = (4.0 atm)(V₂). V₂ = 0.50 L. Pressure quadrupled, so volume quartered. Always check your answer makes sense—higher pressure should give smaller volume. Units must be consistent (both pressures in same units)."
      }
    ]
  },
  "chem-13-2": {
    slides: [
      {
        title: "Charles's Law",
        content: "Charles's Law states that at constant pressure, gas volume is directly proportional to absolute temperature (Kelvin). As temperature increases, volume increases proportionally. Mathematical form: V₁/T₁ = V₂/T₂. Double the Kelvin temperature, double the volume. This law was discovered by Jacques Charles in 1787."
      },
      {
        title: "Temperature in Charles's Law",
        content: "Charles's Law requires absolute temperature (Kelvin). At 0 K, gas would theoretically have zero volume. Converting: K = °C + 273. This avoids negative temperatures and division by zero problems. KMT explanation: higher temperature means faster particles needing more space to maintain the same pressure, so volume must increase."
      },
      {
        title: "Charles's Law Calculations",
        content: "Example: A balloon has volume 1.0 L at 20°C. What volume at 40°C (constant P)? Convert to Kelvin: T₁ = 293 K, T₂ = 313 K. V₁/T₁ = V₂/T₂. (1.0 L)/(293 K) = V₂/(313 K). V₂ = 1.07 L. Note: temperature doubled in Celsius but only increased by factor of 313/293 in Kelvin. Always use Kelvin!"
      }
    ]
  },
  "chem-13-3": {
    slides: [
      {
        title: "Gay-Lussac's Law",
        content: "Gay-Lussac's Law states that at constant volume, gas pressure is directly proportional to absolute temperature (Kelvin). As temperature increases, pressure increases proportionally. Mathematical form: P₁/T₁ = P₂/T₂. This explains why pressure cookers work—heating increases pressure at fixed volume—and why aerosol cans warn against heating."
      },
      {
        title: "Understanding Gay-Lussac's Law",
        content: "KMT explanation: higher temperature means faster-moving particles that hit walls harder and more often, increasing pressure. In a rigid container (constant V), this is the only response to heating—unlike flexible containers that would expand. This law is crucial for safety when heating sealed containers."
      },
      {
        title: "Gay-Lussac's Law Calculations",
        content: "Example: A car tire has pressure 2.0 atm at 20°C (293 K). After driving, temperature rises to 50°C (323 K). Find new pressure. P₁/T₁ = P₂/T₂. (2.0 atm)/(293 K) = P₂/(323 K). P₂ = 2.2 atm. Temperature increased ~10%, pressure increased ~10%. This is why tire pressure changes with temperature and should be checked when cold."
      }
    ]
  },
  "chem-13-4": {
    slides: [
      {
        title: "The Combined Gas Law",
        content: "The Combined Gas Law combines Boyle's, Charles's, and Gay-Lussac's laws into one equation: (P₁V₁)/T₁ = (P₂V₂)/T₂. This handles situations where pressure, volume, and temperature all change. If any variable is constant, it cancels out, reducing to the individual laws. The amount of gas (moles) must remain constant."
      },
      {
        title: "Using the Combined Gas Law",
        content: "Steps: 1) Identify initial conditions (P₁, V₁, T₁) and final conditions. 2) Convert all temperatures to Kelvin. 3) Use consistent units for P and V on both sides. 4) Solve for the unknown variable. 5) Check that the answer makes physical sense—higher temperature and lower pressure both increase volume."
      },
      {
        title: "Combined Gas Law Example",
        content: "A gas at 1.0 atm, 2.0 L, and 300 K is compressed to 0.50 L and heated to 600 K. Find final pressure. (P₁V₁)/T₁ = (P₂V₂)/T₂. (1.0)(2.0)/300 = (P₂)(0.50)/600. P₂ = (1.0 × 2.0 × 600)/(300 × 0.50) = 8.0 atm. Volume quartered (increases P), temperature doubled (increases P), so pressure octupled."
      }
    ]
  },
  "chem-13-5": {
    slides: [
      {
        title: "The Ideal Gas Law",
        content: "The Ideal Gas Law relates pressure, volume, temperature, and amount of gas: PV = nRT. P = pressure (atm), V = volume (L), n = moles, T = temperature (K), R = ideal gas constant (0.0821 L·atm/mol·K). Unlike the combined gas law, this allows calculating properties of a gas at a single set of conditions, not just comparing two states."
      },
      {
        title: "Standard Temperature and Pressure",
        content: "STP (Standard Temperature and Pressure) is 0°C (273 K) and 1 atm. At STP, one mole of any ideal gas occupies 22.4 L (molar volume). This can be derived from PV = nRT: V = nRT/P = (1 mol)(0.0821)(273)/(1) = 22.4 L. Molar volume is the same for all ideal gases regardless of their identity."
      },
      {
        title: "Ideal Gas Law Calculations",
        content: "Example: Find volume of 0.50 mol of gas at 2.0 atm and 400 K. PV = nRT. (2.0)V = (0.50)(0.0821)(400). V = (0.50 × 0.0821 × 400)/2.0 = 8.2 L. Example: Find moles of gas in 5.0 L at 1.0 atm and 300 K. n = PV/RT = (1.0 × 5.0)/(0.0821 × 300) = 0.20 mol."
      }
    ]
  },

  // Unit 14: Solutions
  "chem-14-1": {
    slides: [
      {
        title: "What is a Solution?",
        content: "A solution is a homogeneous mixture of two or more substances. The solvent is the dissolving medium (usually the larger amount); the solute is dissolved in it. Water is called the 'universal solvent' because it dissolves many substances. Solutions can be solid (alloys), liquid (salt water), or gas (air). The particles are too small to see or filter out."
      },
      {
        title: "Types of Solutions",
        content: "Solutions are classified by solvent state. Liquid solutions: most common, like sugar in water or alcohol in water. Gaseous solutions: gases mixed in gases, like air (O₂ in N₂). Solid solutions: solids in solids, like alloys (bronze = copper + tin). Other combinations exist: gas in liquid (carbonated water), solid in liquid (salt water)."
      },
      {
        title: "Aqueous Solutions",
        content: "Aqueous solutions have water as the solvent. Water dissolves ionic compounds by surrounding ions with polar water molecules (hydration). It dissolves polar molecules through hydrogen bonding. 'Like dissolves like'—polar solvents dissolve polar/ionic solutes; nonpolar solvents dissolve nonpolar solutes. Oil doesn't dissolve in water because oil is nonpolar and water is polar."
      }
    ]
  },
  "chem-14-2": {
    slides: [
      {
        title: "What is Solubility?",
        content: "Solubility is the maximum amount of solute that can dissolve in a given amount of solvent at a specific temperature. Usually expressed as grams of solute per 100 mL of solvent. A saturated solution contains the maximum dissolved solute—any more would remain undissolved. An unsaturated solution can dissolve more solute. A supersaturated solution temporarily holds more than the maximum."
      },
      {
        title: "Factors Affecting Solubility",
        content: "Temperature: For most solids, solubility increases with temperature (dissolve more sugar in hot water). For gases, solubility decreases with temperature (warm soda goes flat). Pressure: Affects only gases—higher pressure increases gas solubility (carbonation). Agitation: Stirring speeds dissolution but doesn't change final solubility. Particle size: Smaller particles dissolve faster."
      },
      {
        title: "Solubility Curves",
        content: "Solubility curves graph solubility vs. temperature for various substances. Points above the curve represent supersaturated solutions. Points below represent unsaturated solutions. Most solid solubilities increase with temperature, but some decrease (like Ce₂(SO₄)₃). Gas solubilities always decrease with temperature. These curves help predict crystallization and dissolution behavior."
      }
    ]
  },
  "chem-14-3": {
    slides: [
      {
        title: "Molarity",
        content: "Molarity (M) is the most common concentration unit in chemistry, expressing moles of solute per liter of solution. Formula: M = moles of solute / liters of solution. A 1.0 M NaCl solution contains 1.0 mol of NaCl in each liter. Molarity is temperature-dependent because solution volume changes with temperature."
      },
      {
        title: "Percent Concentration",
        content: "Percent by mass (w/w): (mass solute / mass solution) × 100%. Percent by volume (v/v): (volume solute / volume solution) × 100%—used for liquid-liquid solutions like alcohol. Mass/volume percent (w/v): (grams solute / mL solution) × 100%—common in medicine. A 5% (w/v) glucose solution has 5 g glucose per 100 mL solution."
      },
      {
        title: "Concentration Calculations",
        content: "Example: Find molarity of 58.5 g NaCl in 500 mL solution. Molar mass NaCl = 58.5 g/mol. Moles = 58.5 g ÷ 58.5 g/mol = 1.0 mol. Volume = 0.500 L. M = 1.0 mol / 0.500 L = 2.0 M. Example: Mass of NaOH in 250 mL of 0.50 M solution? Moles = 0.50 M × 0.250 L = 0.125 mol. Mass = 0.125 × 40 = 5.0 g."
      }
    ]
  },
  "chem-14-4": {
    slides: [
      {
        title: "What is Dilution?",
        content: "Dilution is adding more solvent to a solution to decrease its concentration. The amount of solute remains constant—only the volume changes. The key equation is M₁V₁ = M₂V₂ (moles before = moles after). This works because moles = M × V, and moles don't change during dilution. Dilution is common in labs to prepare solutions of specific concentrations from stock solutions."
      },
      {
        title: "Dilution Calculations",
        content: "Example: Dilute 50.0 mL of 6.0 M HCl to 2.0 M. What final volume? M₁V₁ = M₂V₂. (6.0 M)(50.0 mL) = (2.0 M)(V₂). V₂ = 150 mL. You need to add 100 mL of water to 50 mL of stock solution. Always add acid to water for safety, never water to acid!"
      },
      {
        title: "Serial Dilutions",
        content: "Serial dilution repeatedly dilutes a solution by a constant factor. Each step reduces concentration by the same ratio. Example: Starting with 1.0 M, three 1:10 dilutions give 0.1 M, 0.01 M, 0.001 M. This technique creates a range of concentrations for experiments like determining bacterial counts or creating standard curves for analysis."
      }
    ]
  },

  // Unit 15: Acids, Bases, and Salts
  "chem-15-1": {
    slides: [
      {
        title: "Properties of Acids",
        content: "Acids have characteristic properties: sour taste (like lemons), react with metals to produce hydrogen gas, turn blue litmus paper red, conduct electricity in solution, and neutralize bases to form salts and water. Common acids include hydrochloric acid (HCl) in stomach acid, acetic acid (CH₃COOH) in vinegar, and citric acid in citrus fruits."
      },
      {
        title: "Properties of Bases",
        content: "Bases have their own characteristic properties: bitter taste, slippery feel (like soap), turn red litmus paper blue, conduct electricity in solution, and neutralize acids to form salts and water. Common bases include sodium hydroxide (NaOH) in drain cleaner, ammonia (NH₃) in cleaning products, and sodium bicarbonate (baking soda) in cooking."
      },
      {
        title: "Acids and Bases in Daily Life",
        content: "Your stomach uses HCl to digest food; antacids (bases) neutralize excess acid. Batteries contain sulfuric acid. Soap is made by reacting fats with bases. Baking uses the acid-base reaction between baking soda and acidic ingredients to produce CO₂ bubbles. Pool pH is maintained by adding acids or bases. Many foods are naturally acidic (fruits) or basic (egg whites)."
      }
    ]
  },
  "chem-15-2": {
    slides: [
      {
        title: "The Arrhenius Concept",
        content: "Svante Arrhenius (1887) defined acids as substances that produce hydrogen ions (H⁺) in water: HCl → H⁺ + Cl⁻. Bases produce hydroxide ions (OH⁻) in water: NaOH → Na⁺ + OH⁻. This was the first systematic theory of acids and bases. The H⁺ ion is actually a proton and bonds to water to form hydronium ion (H₃O⁺)."
      },
      {
        title: "Strong vs. Weak Acids and Bases",
        content: "Strong acids completely dissociate in water—nearly 100% of molecules form ions. HCl, HNO₃, H₂SO₄ are strong acids. Weak acids partially dissociate—equilibrium exists between molecules and ions. Acetic acid is weak. Similarly, strong bases (NaOH, KOH) completely dissociate; weak bases (NH₃) partially dissociate."
      },
      {
        title: "Limitations of Arrhenius Theory",
        content: "Arrhenius theory only applies to aqueous solutions and requires OH⁻ for bases. It can't explain why ammonia (NH₃) is basic (no OH⁻ in formula) or why reactions can be acidic/basic in non-water solvents. Later theories by Brønsted-Lowry (proton transfer) and Lewis (electron pair) expanded acid-base concepts beyond Arrhenius's definition."
      }
    ]
  },
  "chem-15-3": {
    slides: [
      {
        title: "The pH Scale",
        content: "The pH scale measures hydrogen ion concentration, ranging typically from 0 to 14. pH = -log[H⁺]. Lower pH means more acidic (higher H⁺); higher pH means more basic (lower H⁺). pH 7 is neutral (pure water). Each pH unit represents a 10-fold change in H⁺ concentration. pH 3 is 10× more acidic than pH 4 and 100× more acidic than pH 5."
      },
      {
        title: "Common pH Values",
        content: "Acidic: stomach acid (pH ~1-2), lemon juice (~2), vinegar (~3), tomato juice (~4), coffee (~5), milk (~6.5). Neutral: pure water (pH 7). Basic: blood (~7.4), baking soda solution (~8), ammonia (~11), bleach (~12.5), drain cleaner (~14). Most living organisms require pH close to 7; extremes damage proteins and cells."
      },
      {
        title: "Measuring pH",
        content: "pH can be measured using indicators (substances that change color at different pH), pH paper (paper soaked in indicator), or electronic pH meters (most accurate). Universal indicator shows a rainbow of colors across the pH range. Litmus is a simple indicator: red in acid, blue in base. pH meters measure voltage related to H⁺ concentration."
      }
    ]
  },
  "chem-15-4": {
    slides: [
      {
        title: "What is Neutralization?",
        content: "Neutralization is the reaction between an acid and a base to produce a salt and water. General equation: acid + base → salt + water. Example: HCl + NaOH → NaCl + H₂O. The H⁺ from the acid combines with OH⁻ from the base to form water. The remaining ions form the salt. This reaction releases heat (exothermic)."
      },
      {
        title: "Salts from Neutralization",
        content: "The salt formed depends on which acid and base react. HCl + NaOH → NaCl (table salt). HNO₃ + KOH → KNO₃ (potassium nitrate). H₂SO₄ + 2NaOH → Na₂SO₄ + 2H₂O (sodium sulfate). The cation comes from the base; the anion comes from the acid. Salts may be neutral, acidic, or basic depending on their parent acid and base strengths."
      },
      {
        title: "Applications of Neutralization",
        content: "Antacids neutralize excess stomach acid—Mg(OH)₂ or CaCO₃ are common active ingredients. Farmers add lime (CaO) to neutralize acidic soil. Industrial processes neutralize acidic or basic waste before disposal. Acid rain is neutralized by limestone in buildings and statues—causing damage. Titration uses neutralization to determine unknown concentrations."
      }
    ]
  },

  // ==================== PHYSICS LESSONS ====================

  // Unit 1: Introduction to Physics
  "phys-1-1": {
    slides: [
      {
        title: "What is Physics?",
        content: "Physics is the fundamental science that studies matter, energy, and their interactions. It seeks to understand the basic principles governing the universe, from the smallest subatomic particles to the largest cosmic structures. Physics explains how things move, why objects fall, what light is, and how electricity works. It's the foundation for all other natural sciences."
      },
      {
        title: "The Scope of Physics",
        content: "Physics explores the full range of natural phenomena. It investigates forces and motion (mechanics), heat and temperature (thermodynamics), light and optics, electricity and magnetism, atomic structure, and nuclear processes. Modern physics includes relativity (very fast or massive objects) and quantum mechanics (very small particles). Each area uses mathematical models to describe nature."
      },
      {
        title: "Physics in Action",
        content: "Physics is everywhere! Gravity keeps you on Earth. Friction lets you walk. Light allows vision. Electronics power devices. Sound waves carry music. Heat cooks food. Understanding physics lets engineers build bridges, doctors use MRI machines, and astronauts explore space. From smartphones to satellites, physics makes modern technology possible."
      }
    ]
  },
  "phys-1-2": {
    slides: [
      {
        title: "Classical Physics Branches",
        content: "Classical physics includes: Mechanics—study of motion and forces (falling objects, planetary orbits). Thermodynamics—study of heat and energy transfer (engines, refrigerators). Electromagnetism—study of electric and magnetic phenomena (circuits, motors). Optics—study of light behavior (lenses, mirrors, rainbows). Acoustics—study of sound waves (music, ultrasound)."
      },
      {
        title: "Modern Physics Branches",
        content: "Modern physics emerged in the 20th century. Quantum Mechanics—behavior of atoms and subatomic particles (explains chemistry, semiconductors). Relativity—physics at high speeds and strong gravity (GPS corrections, black holes). Nuclear Physics—atomic nuclei and radioactivity (power plants, medical imaging). Particle Physics—fundamental particles (quarks, Higgs boson)."
      },
      {
        title: "Applied Physics Fields",
        content: "Applied physics uses principles to solve practical problems. Astrophysics studies celestial objects and the universe. Geophysics examines Earth's physical properties. Biophysics applies physics to biological systems. Materials Science develops new materials with desired properties. Medical Physics uses radiation for diagnosis and treatment. Each field combines physics with other disciplines."
      }
    ]
  },
  "phys-1-3": {
    slides: [
      {
        title: "Physics in Transportation",
        content: "Every vehicle relies on physics. Newton's laws explain acceleration and braking. Friction between tires and road enables steering. Aerodynamics reduces drag for fuel efficiency. Combustion engines convert chemical energy to motion. Electric vehicles use electromagnetic motors. Airplanes fly using Bernoulli's principle (lift). Rockets use Newton's third law (action-reaction)."
      },
      {
        title: "Physics in Technology",
        content: "Modern technology is applied physics. Computers use semiconductor physics and digital logic. Touchscreens detect capacitance or pressure changes. Fiber optics transmit data using light reflection. Lasers use stimulated emission of photons. Solar panels convert light to electricity via the photoelectric effect. MRI machines use nuclear magnetic resonance. Each device embodies physics principles."
      },
      {
        title: "Physics at Home",
        content: "Your home is full of physics. Microwaves excite water molecules to heat food. Refrigerators use phase changes and heat transfer. Mirrors reflect light; windows transmit it. Electrical circuits power appliances safely. Insulation reduces heat flow (thermodynamics). Plumbing uses pressure differences to move water. Even standing still involves balance of forces on your body."
      }
    ]
  },
  "phys-1-4": {
    slides: [
      {
        title: "The Scientific Method in Physics",
        content: "Physics uses the scientific method to build knowledge systematically. Observe a phenomenon and ask questions. Form a hypothesis—a testable prediction based on existing knowledge. Design experiments to test the hypothesis under controlled conditions. Collect data and analyze results. Draw conclusions. Share findings for peer review. Repeat and refine as needed."
      },
      {
        title: "Theories and Laws in Physics",
        content: "Scientific laws describe patterns in nature (what happens), like Newton's laws of motion or the law of conservation of energy. Theories explain why phenomena occur, like the kinetic theory explaining gas behavior. Both are supported by extensive evidence. Theories can be refined but are never 'just theories'—they represent our best understanding of nature."
      },
      {
        title: "Mathematics in Physics",
        content: "Mathematics is the language of physics. Equations express relationships precisely and allow predictions. Graphs visualize data and relationships. Calculus describes rates of change (velocity, acceleration). Vectors represent quantities with direction. Statistics handle experimental uncertainty. Physical intuition guides which math to use, and math reveals unexpected predictions."
      }
    ]
  },
  "phys-1-5": {
    slides: [
      {
        title: "General Laboratory Safety",
        content: "Physics labs involve unique hazards. Always wear safety goggles—projectiles, lasers, and broken glass can damage eyes. Wear closed-toe shoes—dropped weights or electrical equipment pose risks. Tie back long hair and avoid loose clothing near rotating machinery. Know locations of fire extinguishers, first aid kits, and emergency exits. Report all accidents immediately."
      },
      {
        title: "Electrical Safety",
        content: "Electricity can cause shock, burns, or fires. Never work with wet hands or near water. Inspect cords for damage before use. Don't overload circuits. Use appropriate fuses and circuit breakers. When working with high voltage, have a trained partner nearby. Capacitors can store dangerous charge—discharge before handling. Report damaged equipment immediately."
      },
      {
        title: "Equipment Safety",
        content: "Use equipment as intended. Lasers: never look directly into the beam or point at others; wear appropriate goggles. Weights: lift properly, secure them on tables, and stay clear of falling paths. Hot objects: use insulated gloves, allow cooling time. Glassware: use heat-resistant glass for heating, handle broken glass carefully. Radioactive sources: minimize exposure time and distance."
      }
    ]
  },

  // Unit 2: Measurement and Scientific Tools
  "phys-2-1": {
    slides: [
      {
        title: "What are Physical Quantities?",
        content: "Physical quantities are properties of nature that can be measured. They have both a numerical value and a unit. Examples: mass (5 kg), length (2 m), time (10 s), temperature (25°C). Without units, numbers are meaningless in physics. There are two types: base quantities (fundamental) and derived quantities (combinations of base quantities)."
      },
      {
        title: "Base Quantities",
        content: "Seven SI base quantities form the foundation: Length (meter, m), Mass (kilogram, kg), Time (second, s), Electric current (ampere, A), Temperature (kelvin, K), Amount of substance (mole, mol), Luminous intensity (candela, cd). All other quantities are derived from these. For example, velocity (m/s) derives from length and time."
      },
      {
        title: "Derived Quantities",
        content: "Derived quantities combine base quantities through equations. Area = length² (m²). Volume = length³ (m³). Velocity = length/time (m/s). Acceleration = velocity/time (m/s²). Force = mass × acceleration (kg·m/s² = Newton). Energy = force × distance (kg·m²/s² = Joule). Understanding dimensions helps verify equations and solve problems."
      }
    ]
  },
  "phys-2-2": {
    slides: [
      {
        title: "The SI System in Physics",
        content: "The International System of Units (SI) provides standardized measurements globally. Physics primarily uses: meter (m) for length, kilogram (kg) for mass, second (s) for time, ampere (A) for current, and kelvin (K) for temperature. Using consistent units prevents errors and enables clear communication. Always convert to SI units before calculations."
      },
      {
        title: "SI Prefixes for Scale",
        content: "Prefixes handle very large or small quantities. Large: kilo (k) = 10³, mega (M) = 10⁶, giga (G) = 10⁹, tera (T) = 10¹². Small: milli (m) = 10⁻³, micro (μ) = 10⁻⁶, nano (n) = 10⁻⁹, pico (p) = 10⁻¹². Examples: 5 km = 5000 m, 3 ns = 3 × 10⁻⁹ s. Physics spans from femtometers (nuclei) to light-years (galaxies)."
      },
      {
        title: "Unit Conversions",
        content: "Convert using multiplication by 1 in different forms. To convert 25 km to m: 25 km × (1000 m / 1 km) = 25,000 m. Chain conversions: 72 km/h to m/s: 72 km/h × (1000 m/km) × (1 h/3600 s) = 20 m/s. Always arrange so unwanted units cancel. Check that your answer is reasonable."
      }
    ]
  },
  "phys-2-3": {
    slides: [
      {
        title: "Scalars vs. Vectors",
        content: "Physical quantities are either scalars or vectors. Scalars have magnitude (size) only—temperature, mass, time, energy, speed. Vectors have both magnitude and direction—displacement, velocity, acceleration, force. The distinction is crucial: walking 5 km north is different from walking 5 km south. Vectors require special mathematical treatment."
      },
      {
        title: "Examples of Each Type",
        content: "Scalars: Distance (10 m), speed (5 m/s), mass (2 kg), time (30 s), energy (100 J), temperature (25°C). Vectors: Displacement (10 m east), velocity (5 m/s north), acceleration (10 m/s² down), force (20 N at 30°), momentum (5 kg·m/s forward). When direction matters, use vectors."
      },
      {
        title: "Why the Distinction Matters",
        content: "Adding scalars is simple arithmetic: 5 kg + 3 kg = 8 kg. Adding vectors requires considering direction: 5 m east + 5 m north = 7.07 m northeast (using Pythagorean theorem). Two forces of 3 N and 4 N can sum to anywhere from 1 N to 7 N depending on their directions. Vector math is essential for mechanics and beyond."
      }
    ]
  },
  "phys-2-4": {
    slides: [
      {
        title: "Accuracy in Physics",
        content: "Accuracy is how close a measurement is to the true value. Accurate measurements require calibrated instruments and proper technique. Systematic errors reduce accuracy—they consistently shift measurements in one direction. Minimizing systematic errors involves calibration, proper equipment use, and accounting for known biases. Accuracy is often limited by instrument quality."
      },
      {
        title: "Precision in Physics",
        content: "Precision is how reproducible measurements are—how close repeated measurements are to each other. Random errors reduce precision—they cause unpredictable scatter in data. Taking multiple measurements and averaging improves precision. The precision of an instrument is limited by its smallest division. High precision doesn't guarantee high accuracy."
      },
      {
        title: "Error Analysis",
        content: "All measurements have uncertainty. Express results as: value ± uncertainty. Absolute uncertainty is in the same units as the measurement (5.0 ± 0.1 cm). Relative or percent uncertainty = (uncertainty/value) × 100%. Uncertainties propagate through calculations—for multiplication/division, add percent uncertainties. Understanding uncertainty is essential for experimental physics."
      }
    ]
  },
  "phys-2-5": {
    slides: [
      {
        title: "Significant Figures Review",
        content: "Significant figures indicate measurement precision. Rules: All non-zero digits are significant. Zeros between non-zeros are significant. Leading zeros are not significant. Trailing zeros after a decimal are significant. Trailing zeros without a decimal are ambiguous—use scientific notation. The number of sig figs reflects instrument precision."
      },
      {
        title: "Calculations with Sig Figs",
        content: "For multiplication and division: the result has the same number of sig figs as the least precise factor. 2.5 m × 3.14159 = 7.9 m² (2 sig figs). For addition and subtraction: the result has the same decimal places as the least precise number. 12.11 s + 0.3 s = 12.4 s. These rules ensure you don't claim more precision than your measurements allow."
      },
      {
        title: "Sig Figs in Physics Problems",
        content: "Given values set the precision of your answer. Constants like g = 9.8 m/s² typically have 2 sig figs. Exact numbers (like 2 in d = 2r) have infinite sig figs. In multi-step calculations, keep extra digits in intermediate steps and round only the final answer. Reporting correct sig figs shows understanding of measurement limitations."
      }
    ]
  },

  // Unit 3: Vectors
  "phys-3-1": {
    slides: [
      {
        title: "Vector and Scalar Quantities",
        content: "Scalars are completely described by magnitude alone: mass, time, temperature, energy. Vectors require both magnitude and direction: displacement, velocity, acceleration, force. Distance is scalar (how far you traveled); displacement is vector (your change in position with direction). Speed is scalar; velocity is vector. This distinction is fundamental to physics."
      },
      {
        title: "Why Vectors Matter",
        content: "Direction changes everything in physics. Two forces of 100 N can cancel out (opposite directions) or combine to 200 N (same direction). A ball thrown at 20 m/s behaves differently if thrown up vs. horizontally. Navigation, projectile motion, and force analysis all require vectors. Understanding vectors is essential for mechanics."
      },
      {
        title: "Vector Notation",
        content: "Vectors are written in bold (v) or with an arrow (v⃗). Magnitude is written as |v⃗| or simply v. Direction can be specified by angle from a reference (30° from east), compass directions (northeast), or coordinates. Unit vectors (î, ĵ, k̂) point along x, y, z axes with magnitude 1. A vector like 3î + 4ĵ has components in x and y directions."
      }
    ]
  },
  "phys-3-2": {
    slides: [
      {
        title: "Graphical Vector Representation",
        content: "Vectors are drawn as arrows. The arrow's length represents magnitude (drawn to scale). The arrow's direction represents the vector's direction. The arrow's starting point is the tail; the ending point is the head. Multiple vectors can be compared visually when drawn to the same scale. Position the tail at the origin or at the end of the previous vector when adding."
      },
      {
        title: "Scale and Direction",
        content: "Choose an appropriate scale, like 1 cm = 10 N. A 50 N force is drawn as a 5 cm arrow. Use a protractor for accurate angles. Common reference: measure angles counterclockwise from the positive x-axis (east). Or use compass directions: 'north of east' means the angle is measured from east toward north. Be consistent within each problem."
      },
      {
        title: "Reading Vectors from Diagrams",
        content: "To determine a vector from a diagram: measure the arrow length and apply the scale to find magnitude. Use a protractor to find the angle. Express direction clearly: '25 N at 60° north of east' or '25 N at 60° above the positive x-axis.' Practice both drawing and interpreting vector diagrams—they're essential for problem-solving."
      }
    ]
  },
  "phys-3-3": {
    slides: [
      {
        title: "Vector Addition: Graphical Method",
        content: "To add vectors graphically (tip-to-tail method): Draw the first vector. Draw the second vector starting from the first vector's head (tip). The resultant vector goes from the first vector's tail to the last vector's head. This works for any number of vectors. The resultant represents the combined effect of all vectors."
      },
      {
        title: "Vector Subtraction",
        content: "To subtract vectors: A⃗ - B⃗ = A⃗ + (-B⃗). First, reverse vector B (point it opposite direction). Then add normally using tip-to-tail. Subtraction finds the difference between vectors—useful for finding change in velocity or relative displacement. Example: change in velocity = final velocity - initial velocity."
      },
      {
        title: "Special Cases in Vector Addition",
        content: "Same direction: magnitudes add directly (3 N right + 5 N right = 8 N right). Opposite directions: magnitudes subtract (3 N right + 5 N left = 2 N left). Perpendicular: use Pythagorean theorem (3 N right + 4 N up = 5 N at 53° above right). For other angles, use law of cosines or component method."
      }
    ]
  },
  "phys-3-4": {
    slides: [
      {
        title: "Vector Components",
        content: "Any vector can be split into perpendicular components, usually horizontal (x) and vertical (y). Given vector A at angle θ from horizontal: Aₓ = A cos(θ) and Aᵧ = A sin(θ). Components are scalars (can be positive or negative). This decomposition makes vector math much easier, especially for adding multiple vectors."
      },
      {
        title: "Adding Vectors Using Components",
        content: "To add multiple vectors: 1) Find x and y components of each vector. 2) Add all x-components: Rₓ = A₁ₓ + A₂ₓ + ... 3) Add all y-components: Rᵧ = A₁ᵧ + A₂ᵧ + ... 4) Find resultant magnitude: R = √(Rₓ² + Rᵧ²). 5) Find resultant angle: θ = tan⁻¹(Rᵧ/Rₓ). This algebraic method is more precise than graphical."
      },
      {
        title: "Component Method Example",
        content: "Add 30 N at 40° and 20 N at 120°. First vector: x = 30 cos(40°) = 23.0 N, y = 30 sin(40°) = 19.3 N. Second vector: x = 20 cos(120°) = -10.0 N, y = 20 sin(120°) = 17.3 N. Totals: Rₓ = 23.0 + (-10.0) = 13.0 N, Rᵧ = 19.3 + 17.3 = 36.6 N. R = √(13² + 36.6²) = 38.8 N at θ = tan⁻¹(36.6/13) = 70.5°."
      }
    ]
  },

  // Unit 4: Motion in One Dimension
  "phys-4-1": {
    slides: [
      {
        title: "Distance vs. Displacement",
        content: "Distance is the total path length traveled—a scalar quantity measured in meters. Displacement is the straight-line change in position from start to end—a vector quantity with magnitude and direction. If you walk 3 m east then 4 m west, distance = 7 m, but displacement = 1 m west. Displacement can be zero even with non-zero distance (returning to start)."
      },
      {
        title: "Position and Reference Frames",
        content: "Position describes location relative to a reference point (origin). On a number line, positive positions are right of origin, negative are left. Displacement = final position - initial position: Δx = xf - xi. The choice of origin is arbitrary but must be consistent. Different observers may measure different displacements depending on their reference frame."
      },
      {
        title: "Distance and Displacement in Problems",
        content: "A car drives 100 km north, then 60 km south. Distance traveled = 160 km. Displacement = 100 - 60 = 40 km north. For straight-line motion without direction change, distance equals magnitude of displacement. Direction matters: 'the car displaced -40 km' means 40 km in the negative direction. Always specify reference direction."
      }
    ]
  },
  "phys-4-2": {
    slides: [
      {
        title: "Speed vs. Velocity",
        content: "Speed is distance traveled per unit time—a scalar measured in m/s. Velocity is displacement per unit time—a vector with magnitude and direction. Average speed = total distance / total time. Average velocity = displacement / time: v⃗ₐᵥ = Δx⃗/Δt. Instantaneous values describe motion at a specific moment, while averages describe overall motion."
      },
      {
        title: "Calculating Velocity",
        content: "Average velocity: v⃗ₐᵥ = (xf - xi)/(tf - ti) = Δx/Δt. If a car moves from position x = 10 m to x = 50 m in 8 seconds, v⃗ₐᵥ = 40 m / 8 s = 5 m/s (in the positive direction). Velocity can be negative—it indicates direction opposite to the chosen positive direction. Constant velocity means both speed and direction are unchanged."
      },
      {
        title: "Speed vs. Velocity Example",
        content: "A runner completes a 400 m track in 50 s, returning to the starting point. Average speed = 400 m / 50 s = 8 m/s. Average velocity = 0 m / 50 s = 0 m/s (no net displacement). For circular or back-and-forth motion, average velocity is less than average speed. Velocity tells you net progress in a direction; speed tells you how fast you're moving."
      }
    ]
  },
  "phys-4-3": {
    slides: [
      {
        title: "What is Acceleration?",
        content: "Acceleration is the rate of change of velocity—how quickly velocity changes. Average acceleration: a⃗ = Δv⃗/Δt = (vf - vi)/(tf - ti). Units are m/s² (meters per second per second). Acceleration is a vector—it has direction. Positive acceleration increases velocity in the positive direction. Acceleration can change speed, direction, or both."
      },
      {
        title: "Understanding Acceleration",
        content: "Acceleration of 2 m/s² means velocity increases by 2 m/s every second. Starting at rest with a = 2 m/s²: after 1 s, v = 2 m/s; after 2 s, v = 4 m/s; after 3 s, v = 6 m/s. Negative acceleration (deceleration) decreases velocity. An object can have negative velocity and negative acceleration (speeding up in negative direction) or negative velocity and positive acceleration (slowing down)."
      },
      {
        title: "Constant Acceleration",
        content: "When acceleration is constant, we can use kinematic equations. Objects near Earth's surface experience constant gravitational acceleration g = 9.8 m/s² downward. Cars often approximate constant acceleration during braking or speeding up. Non-constant acceleration requires calculus or more advanced methods. Most introductory physics problems assume constant acceleration."
      }
    ]
  },
  "phys-4-4": {
    slides: [
      {
        title: "Position-Time Graphs",
        content: "Position-time graphs show position (y-axis) vs. time (x-axis). The slope of the line equals velocity: slope = Δx/Δt = v. Horizontal line = stationary (v = 0). Straight upward slope = constant positive velocity. Straight downward slope = constant negative velocity. Curved line = changing velocity (acceleration). Steeper slope = faster speed."
      },
      {
        title: "Velocity-Time Graphs",
        content: "Velocity-time graphs show velocity (y-axis) vs. time (x-axis). The slope equals acceleration: slope = Δv/Δt = a. Horizontal line = constant velocity (a = 0). Upward slope = positive acceleration. Downward slope = negative acceleration (could be slowing down or speeding up in negative direction). The area under the curve equals displacement."
      },
      {
        title: "Reading Motion Graphs",
        content: "From x-t graph: read position at any time directly; find velocity from slope; find acceleration from curve (concave up = positive a). From v-t graph: read velocity at any time; find acceleration from slope; find displacement from area under curve (positive area = positive displacement). Practice converting between graph types and verbal descriptions."
      }
    ]
  },
  "phys-4-5": {
    slides: [
      {
        title: "Free Fall Motion",
        content: "Free fall is motion under gravity alone—no air resistance. All objects in free fall near Earth accelerate at g = 9.8 m/s² downward, regardless of mass (Galileo's insight). This constant acceleration allows us to use kinematic equations with a = -g (negative if up is positive). Free fall includes objects thrown up, dropped, or thrown down."
      },
      {
        title: "Free Fall Equations",
        content: "With up as positive and a = -g: v = v₀ - gt (velocity at time t). y = y₀ + v₀t - ½gt² (position at time t). v² = v₀² - 2g(y - y₀) (velocity-position relation). For dropped objects: v₀ = 0. For objects thrown up, v₀ > 0; at peak, v = 0. Time to peak = v₀/g. Maximum height from v² = v₀² - 2g·Δy with v = 0."
      },
      {
        title: "Free Fall Examples",
        content: "A ball dropped from 20 m: How long to hit ground? y = -½gt² → 20 = ½(9.8)t² → t = 2.0 s. What's final velocity? v = gt = 9.8 × 2.0 = 19.6 m/s down. Ball thrown up at 15 m/s: Time to peak? t = 15/9.8 = 1.53 s. Max height? v² = v₀² - 2g·h → h = 15²/(2 × 9.8) = 11.5 m."
      }
    ]
  },

  // Unit 5: Motion in Two Dimensions
  "phys-5-1": {
    slides: [
      {
        title: "Projectile Motion Basics",
        content: "Projectile motion is motion under gravity in two dimensions—horizontal and vertical. Key insight: horizontal and vertical motions are independent! Horizontal motion has constant velocity (no horizontal force, ignoring air). Vertical motion has constant acceleration g downward. The combination creates the familiar curved path (parabola) of thrown objects."
      },
      {
        title: "Analyzing Projectile Motion",
        content: "Separate into components and analyze each independently. Horizontal: x = x₀ + vₓt (constant velocity, aₓ = 0). Vertical: y = y₀ + v₀ᵧt - ½gt² (acceleration g downward). The same time t applies to both. Initial velocity components: v₀ₓ = v₀cos(θ), v₀ᵧ = v₀sin(θ), where θ is the launch angle above horizontal."
      },
      {
        title: "Projectile Motion Example",
        content: "A ball is thrown at 20 m/s at 30° above horizontal. Components: v₀ₓ = 20cos(30°) = 17.3 m/s, v₀ᵧ = 20sin(30°) = 10 m/s. Time to peak: t = 10/9.8 = 1.02 s. Max height: h = 10²/(2 × 9.8) = 5.1 m. Total time in air: 2 × 1.02 = 2.04 s. Range: x = 17.3 × 2.04 = 35.3 m."
      }
    ]
  },
  "phys-5-2": {
    slides: [
      {
        title: "Horizontal Component of Projectile Motion",
        content: "The horizontal component of velocity remains constant throughout flight (no horizontal acceleration, ignoring air resistance). If v₀ₓ = 15 m/s at launch, it's still 15 m/s at peak, landing, and every point between. Horizontal displacement: x = v₀ₓ × t. To increase range, increase horizontal velocity or increase time in air."
      },
      {
        title: "Vertical Component of Projectile Motion",
        content: "The vertical component changes due to gravity. Going up: vᵧ decreases by 9.8 m/s each second until it reaches zero at the peak. Going down: vᵧ increases (negative direction) by 9.8 m/s each second. At any height on the way down, speed equals speed at that height on the way up. Use kinematic equations for the vertical component."
      },
      {
        title: "Combining Components",
        content: "At any instant, find total velocity using components. Magnitude: v = √(vₓ² + vᵧ²). Direction: θ = tan⁻¹(vᵧ/vₓ) from horizontal. At launch and landing (same height), speed is the same but vertical component reverses sign. At peak, velocity is purely horizontal (vᵧ = 0). Trajectory shape depends on initial velocity and angle."
      }
    ]
  },
  "phys-5-3": {
    slides: [
      {
        title: "What is Relative Motion?",
        content: "Motion is always measured relative to a reference frame (observer). Different observers can measure different velocities for the same object. A passenger walking on a train moves at 2 m/s relative to the train, but at 102 m/s relative to the ground if the train moves at 100 m/s. Both measurements are correct in their respective frames."
      },
      {
        title: "Relative Velocity Equation",
        content: "For object A moving relative to object B: v⃗_A/ground = v⃗_A/B + v⃗_B/ground. The subscripts read as 'velocity of A relative to B.' Add velocities as vectors. Same direction: magnitudes add. Opposite directions: magnitudes subtract. Perpendicular: use Pythagorean theorem. This is essential for navigation, pursuit problems, and understanding motion."
      },
      {
        title: "Relative Motion Examples",
        content: "A boat travels 5 m/s in still water. River flows 3 m/s east. Boat aims north: actual velocity = √(5² + 3²) = 5.8 m/s at angle east of north. To go straight north, boat must aim upstream—use vector subtraction to find required heading. Airplane navigation similarly accounts for wind velocity to reach intended destination."
      }
    ]
  },

  // Unit 6: Newton's Laws of Motion
  "phys-6-1": {
    slides: [
      {
        title: "Newton's First Law (Inertia)",
        content: "Newton's First Law states: An object at rest stays at rest, and an object in motion stays in motion with constant velocity, unless acted upon by a net external force. This property of matter resisting changes in motion is called inertia. Mass is a measure of inertia—more mass means harder to accelerate or decelerate."
      },
      {
        title: "Understanding Inertia",
        content: "Without forces, motion doesn't change. A hockey puck on ice glides until friction or a stick changes its motion. Passengers lurch forward when a car brakes—their bodies want to continue moving (inertia). Objects don't 'want' to stop; they need force to change velocity. This was revolutionary—previously, people thought force was needed for any motion."
      },
      {
        title: "Applications of First Law",
        content: "Seatbelts protect during sudden stops—they provide the force to decelerate your body with the car. Objects fly off spinning rides when centripetal force is insufficient. Spacecraft coast forever in the vacuum of space. The first law sets the stage for understanding force: force isn't needed for motion, only for changing motion."
      }
    ]
  },
  "phys-6-2": {
    slides: [
      {
        title: "Newton's Second Law (F = ma)",
        content: "Newton's Second Law quantifies the relationship between force, mass, and acceleration: ΣF = ma (net force equals mass times acceleration). Acceleration is proportional to net force and inversely proportional to mass. Force and acceleration are vectors in the same direction. The SI unit of force is the Newton (N = kg·m/s²)."
      },
      {
        title: "Applying F = ma",
        content: "A 10 kg box pushed with 40 N force accelerates at a = F/m = 40/10 = 4 m/s². Double the force → double the acceleration. Double the mass → half the acceleration. Net force matters: if friction is 10 N, net force is 30 N, and a = 3 m/s². This law is the workhorse equation for solving mechanics problems."
      },
      {
        title: "Problem-Solving with Second Law",
        content: "Steps: 1) Draw free-body diagram showing all forces on object. 2) Choose coordinate system (usually with one axis along acceleration). 3) Write ΣF = ma for each axis. 4) Solve for unknowns. Example: 5 kg mass on frictionless table, 20 N push. a = 20/5 = 4 m/s². With friction (f = 5 N): a = (20-5)/5 = 3 m/s²."
      }
    ]
  },
  "phys-6-3": {
    slides: [
      {
        title: "Newton's Third Law (Action-Reaction)",
        content: "Newton's Third Law states: For every action force, there is an equal and opposite reaction force. If object A exerts force on object B, B exerts equal magnitude, opposite direction force on A. These forces act on different objects—they don't cancel! Examples: when you push a wall, the wall pushes back on you with equal force."
      },
      {
        title: "Action-Reaction Pairs",
        content: "Identifying pairs: The action force on object B by object A has reaction force on object A by object B. Earth pulls you down (gravity); you pull Earth up with equal force (but Earth barely moves due to enormous mass). When you walk, you push ground backward; ground pushes you forward. Rocket exhaust pushes backward; exhaust pushes rocket forward."
      },
      {
        title: "Common Misconceptions",
        content: "Action and reaction don't cancel because they act on different objects. A book on a table: gravity (Earth on book) and normal force (table on book) are NOT a pair—both act on the book. The pair to gravity is the book pulling Earth up. The pair to normal force is the book pushing down on the table. Always identify which two objects are involved."
      }
    ]
  },
  "phys-6-4": {
    slides: [
      {
        title: "What is a Free-Body Diagram?",
        content: "A free-body diagram (FBD) shows all forces acting on a single object, represented as arrows from the object's center. It isolates one object and identifies every force on it. Forces include gravity (weight), normal force, friction, tension, applied forces, and air resistance. FBDs are essential for applying Newton's second law."
      },
      {
        title: "Drawing Free-Body Diagrams",
        content: "Steps: 1) Identify the object of interest. 2) Draw it as a dot or simple shape. 3) Draw all forces as arrows from the center, pointing in force direction. 4) Label each force (W for weight, N for normal, f for friction, T for tension). 5) Arrow length indicates relative magnitude. 6) Include coordinate axes if helpful."
      },
      {
        title: "Free-Body Diagram Examples",
        content: "Book on table: Weight (W = mg) points down; normal force (N) points up. If stationary, N = W. Box being pushed: Add applied force (F) horizontally; friction (f) opposes motion. On incline: Weight is vertical; normal is perpendicular to surface; friction is parallel to surface opposing motion. Break weight into components parallel and perpendicular to incline."
      }
    ]
  },

  // Unit 7: Applications of Newton's Laws
  "phys-7-1": {
    slides: [
      {
        title: "What is Friction?",
        content: "Friction is a force that opposes relative motion between surfaces in contact. It arises from microscopic surface irregularities and molecular attractions. Static friction prevents motion from starting; kinetic (sliding) friction opposes ongoing motion. Friction always acts parallel to the surface and opposite to motion or intended motion."
      },
      {
        title: "Friction Equations",
        content: "Static friction: fs ≤ μsN (maximum value is μsN). Kinetic friction: fk = μkN. N is the normal force (not weight unless surface is horizontal). μs (static coefficient) and μk (kinetic coefficient) depend on surfaces; μs > μk (harder to start sliding than to continue). Coefficients are dimensionless and typically between 0 and 1."
      },
      {
        title: "Friction in Problems",
        content: "Example: 10 kg box, μs = 0.5, μk = 0.4 on floor. N = mg = 98 N. Max static friction = 0.5 × 98 = 49 N. Push with 40 N: box doesn't move (static friction = 40 N). Push with 60 N: box moves, fk = 0.4 × 98 = 39.2 N. Net force = 60 - 39.2 = 20.8 N. Acceleration = 20.8/10 = 2.08 m/s²."
      }
    ]
  },
  "phys-7-2": {
    slides: [
      {
        title: "What is Tension?",
        content: "Tension is the pulling force transmitted through a string, rope, cable, or wire when pulled tight by forces from opposite ends. Tension pulls equally in both directions along the rope. For an ideal rope (massless and inextensible), tension is the same throughout its length. Real ropes stretch slightly and have mass, but these are often ignored in problems."
      },
      {
        title: "Tension in Connected Systems",
        content: "When objects are connected by rope over pulleys, they share a rope with common tension. Each object's acceleration is analyzed separately using free-body diagrams, then equations are combined. For Atwood's machine (two masses on a pulley): heavier mass accelerates down, lighter mass accelerates up, both with same magnitude acceleration."
      },
      {
        title: "Tension Example",
        content: "Hanging 5 kg mass: T = mg = 49 N (equilibrium). Now attach to 10 kg mass on frictionless table. System accelerates: For hanging mass, mg - T = ma. For table mass, T = Ma. Adding: mg = (m + M)a → a = 5(9.8)/15 = 3.27 m/s². Then T = Ma = 10 × 3.27 = 32.7 N. Note tension is less than weight."
      }
    ]
  },
  "phys-7-3": {
    slides: [
      {
        title: "What is Normal Force?",
        content: "Normal force is the perpendicular contact force exerted by a surface on an object. 'Normal' means perpendicular (mathematical term). It prevents objects from passing through surfaces. On a horizontal surface, normal force equals weight (for a stationary object). On inclines or with additional vertical forces, normal force adjusts accordingly."
      },
      {
        title: "Normal Force on Inclines",
        content: "On an incline at angle θ, weight has components: parallel to incline = mg sin(θ), perpendicular = mg cos(θ). Normal force balances the perpendicular component: N = mg cos(θ). Normal force is less than weight on inclines! This affects friction (f = μN), which is why objects slide more easily on steeper slopes."
      },
      {
        title: "Normal Force Variations",
        content: "If you push down on a box on a table, N > mg. If you pull up on a box (without lifting), N < mg. In an accelerating elevator going up, N > mg (you feel heavier). Going down, N < mg (you feel lighter). Free fall: N = 0 (weightlessness). Normal force adjusts to prevent penetration while satisfying Newton's second law."
      }
    ]
  },
  "phys-7-4": {
    slides: [
      {
        title: "Circular Motion Concepts",
        content: "Objects moving in circles are continuously changing direction, meaning they're accelerating even at constant speed. This acceleration points toward the center (centripetal). A force must cause this acceleration—the centripetal force. Centripetal force isn't a new type of force; it's provided by tension, gravity, friction, or normal force depending on the situation."
      },
      {
        title: "Centripetal Acceleration and Force",
        content: "Centripetal acceleration: ac = v²/r (directed toward center). Centripetal force: Fc = mac = mv²/r. Faster speed or smaller radius means greater centripetal force needed. For a car turning: friction provides centripetal force. For a planet orbiting: gravity provides centripetal force. For a ball on a string: tension provides centripetal force."
      },
      {
        title: "Circular Motion Examples",
        content: "Car making turn (r = 50 m) at 20 m/s: Fc = mv²/r. For 1000 kg car: Fc = 1000(20)²/50 = 8000 N. This must come from friction. If μ = 0.8, max friction = 0.8 × 1000 × 9.8 = 7840 N < 8000 N—car will skid! Either slow down or increase radius. This is why speed limits exist on curves."
      }
    ]
  },
  "phys-7-5": {
    slides: [
      {
        title: "Static Equilibrium",
        content: "An object is in static equilibrium when it's at rest and remains at rest—both net force and net torque are zero. For translational equilibrium: ΣFx = 0 and ΣFy = 0. This means all forces balance. Free-body diagrams and component analysis solve equilibrium problems. Objects can be in equilibrium with many forces acting, as long as they sum to zero."
      },
      {
        title: "Solving Equilibrium Problems",
        content: "Steps: 1) Draw FBD showing all forces. 2) Choose convenient coordinate axes. 3) Write ΣFx = 0 and ΣFy = 0. 4) Solve system of equations. Example: 20 N weight hung from two ropes at angles. Each rope pulls up and horizontally. Vertical: T₁sin(θ₁) + T₂sin(θ₂) = 20. Horizontal: T₁cos(θ₁) = T₂cos(θ₂)."
      },
      {
        title: "Dynamic Equilibrium",
        content: "Dynamic equilibrium means constant velocity (could be moving)—acceleration is zero. Same conditions apply: ΣF = 0. Terminal velocity is an example: a falling object reaches constant velocity when drag equals weight. At terminal velocity, acceleration is zero despite ongoing motion. Equilibrium means forces balance, not necessarily that objects are stationary."
      }
    ]
  },

  // Unit 8: Work, Energy, and Power
  "phys-8-1": {
    slides: [
      {
        title: "What is Work in Physics?",
        content: "Work (W) is energy transferred when a force moves an object through a distance. Work = Force × displacement × cos(θ), where θ is the angle between force and displacement: W = Fd cos(θ). Unit is Joule (J = N·m). Work is a scalar—positive when force and motion are in the same direction, negative when opposite, zero when perpendicular."
      },
      {
        title: "Positive, Negative, and Zero Work",
        content: "Positive work: force and displacement in same direction—energy added to object (pushing a box forward). Negative work: force and displacement opposite—energy removed (friction slowing a sliding box). Zero work: force perpendicular to displacement—no energy transfer (carrying a box horizontally—gravity does no work). Normal force often does zero work."
      },
      {
        title: "Work Examples",
        content: "Push 50 N on box, move 3 m forward: W = 50 × 3 × cos(0°) = 150 J. Lift 10 kg object 2 m: W = mg × d = 10 × 9.8 × 2 = 196 J. Push at 30° angle with 40 N, move 5 m: W = 40 × 5 × cos(30°) = 173 J. Carry 20 kg horizontally 10 m: W = 0 (gravity perpendicular to motion)."
      }
    ]
  },
  "phys-8-2": {
    slides: [
      {
        title: "What is Kinetic Energy?",
        content: "Kinetic energy (KE) is energy of motion. KE = ½mv², where m is mass and v is speed. Units are Joules (J). A moving object has the ability to do work—it can exert forces on other objects and transfer energy. Kinetic energy is always positive (mass and v² are always positive). Doubling speed quadruples kinetic energy!"
      },
      {
        title: "Work-Energy Theorem",
        content: "The work-energy theorem states: Net work done on an object equals its change in kinetic energy. Wnet = ΔKE = ½mvf² - ½mvi². Positive net work increases KE (speeds up). Negative net work decreases KE (slows down). This theorem connects the concepts of work and energy, providing an alternative to force-based problem solving."
      },
      {
        title: "Kinetic Energy Examples",
        content: "A 1000 kg car at 20 m/s: KE = ½(1000)(20)² = 200,000 J. At 40 m/s: KE = ½(1000)(40)² = 800,000 J. Speed doubled, KE quadrupled! To stop the faster car, brakes must do 4× more work. This is why high speeds are dangerous. A 0.01 kg bullet at 500 m/s has KE = ½(0.01)(500)² = 1250 J—small mass, big effect."
      }
    ]
  },
  "phys-8-3": {
    slides: [
      {
        title: "What is Potential Energy?",
        content: "Potential energy (PE) is stored energy due to position or configuration. It represents work that can be done when the object moves to a reference position. Gravitational PE: PEg = mgh (height above reference level). Elastic PE: PEe = ½kx² (compressed or stretched spring). Potential energy can be converted to kinetic energy and vice versa."
      },
      {
        title: "Gravitational Potential Energy",
        content: "PEg = mgh, where h is height above chosen reference level (often ground). Choose reference where calculation is convenient—PE is relative. A 2 kg book 1.5 m above floor: PEg = 2 × 9.8 × 1.5 = 29.4 J. If it falls, PE converts to KE. The work gravity does as it falls equals the change in PE."
      },
      {
        title: "Elastic Potential Energy",
        content: "PEe = ½kx², where k is spring constant (N/m) and x is displacement from equilibrium. A stiffer spring (larger k) stores more energy. Energy stored increases with the square of displacement. Compressed or stretched springs can do work when released. Springs, rubber bands, and bows store elastic potential energy."
      }
    ]
  },
  "phys-8-4": {
    slides: [
      {
        title: "Mechanical Energy",
        content: "Mechanical energy (ME) is the sum of kinetic and potential energy: ME = KE + PE = ½mv² + mgh (for gravitational PE). Mechanical energy represents the total capacity of a system to do work through motion and position. It's the 'usable' energy in many physics problems involving motion and gravity."
      },
      {
        title: "Mechanical Energy in Systems",
        content: "As objects move in a system, energy transforms between KE and PE. A falling ball: PE decreases as h decreases; KE increases as v increases. A swinging pendulum: PE maximum at ends (highest point), KE maximum at bottom (lowest point). Total ME stays constant if only conservative forces act (no friction or air resistance)."
      },
      {
        title: "Using Mechanical Energy",
        content: "For a roller coaster starting at height h with v = 0: MEi = mgh. At bottom (h = 0): MEf = ½mv². If no friction, MEi = MEf: mgh = ½mv² → v = √(2gh). Notice mass cancels! Speed at bottom depends only on height. This energy approach is often easier than force-based kinematic analysis."
      }
    ]
  },
  "phys-8-5": {
    slides: [
      {
        title: "Conservation of Energy",
        content: "The Law of Conservation of Energy states: Energy cannot be created or destroyed, only transformed from one form to another. In a closed system, total energy remains constant. When mechanical energy decreases (due to friction), it transforms to thermal energy—the total energy is still conserved, just in different forms."
      },
      {
        title: "Applying Conservation of Energy",
        content: "For problems with only conservative forces: KEi + PEi = KEf + PEf. Solve for unknown. Example: Ball dropped from 10 m. Find speed at ground. mgh = ½mv². v = √(2 × 9.8 × 10) = 14 m/s. With friction, add work term: KEi + PEi = KEf + PEf + Wfriction (where Wfriction is negative, representing energy 'lost')."
      },
      {
        title: "Energy Conservation Examples",
        content: "Pendulum: At any point, mgh + ½mv² = mgh₀ (initial height). Solve for v at any height. Roller coaster: At any point, mgh + ½mv² = mgh₀ (starting height). Spring launch: ½kx² = ½mv² + mgh (spring PE converts to KE and gravitational PE). Energy methods bypass forces and accelerations—very powerful for complex paths."
      }
    ]
  },
  "phys-8-6": {
    slides: [
      {
        title: "What is Power?",
        content: "Power is the rate at which work is done or energy is transferred. P = W/t = ΔE/t. Unit is Watt (W = J/s). High power means doing the same work faster or transferring the same energy in less time. A 100 W lightbulb uses 100 joules of electrical energy every second. Power describes how quickly energy is used or delivered."
      },
      {
        title: "Power Equations",
        content: "Average power: P = W/t. Instantaneous power: P = Fv (force times velocity). A car engine with more power can accelerate the same car faster or maintain speed against larger resistance. Horsepower (hp) is an older unit: 1 hp = 746 W. A typical car engine is about 150-300 hp (110,000-220,000 W)."
      },
      {
        title: "Power Examples",
        content: "Lift 50 kg mass 3 m in 2 s: W = mgh = 50 × 9.8 × 3 = 1470 J. P = 1470/2 = 735 W (about 1 hp). Car maintaining 30 m/s against 500 N drag force: P = Fv = 500 × 30 = 15,000 W = 20 hp. Climbing stairs: a 70 kg person climbing 3 m in 5 s produces P = 70 × 9.8 × 3/5 = 412 W."
      }
    ]
  },

  // Unit 9: Momentum and Impulse
  "phys-9-1": {
    slides: [
      {
        title: "What is Momentum?",
        content: "Momentum (p) is the product of mass and velocity: p⃗ = mv⃗. It's a vector quantity pointing in the direction of velocity. Units are kg·m/s. Momentum represents 'quantity of motion'—harder to stop objects with more momentum. A loaded truck and a small car at the same speed have different momenta; the truck is much harder to stop."
      },
      {
        title: "Momentum and Newton's Second Law",
        content: "Newton's second law can be written in terms of momentum: ΣF = Δp/Δt (net force equals rate of change of momentum). This form is more general and applies even when mass changes (like rockets losing fuel). For constant mass, Δp = mΔv, so F = ma follows. Momentum provides another framework for understanding force and motion."
      },
      {
        title: "Momentum Examples",
        content: "A 0.145 kg baseball at 40 m/s: p = 0.145 × 40 = 5.8 kg·m/s. A 1000 kg car at 20 m/s: p = 1000 × 20 = 20,000 kg·m/s. To stop the car in 5 s: ΔP = 20,000 kg·m/s, F = 20,000/5 = 4000 N. The same momentum change in 1 s requires 20,000 N—why airbags increase stopping time to reduce force."
      }
    ]
  },
  "phys-9-2": {
    slides: [
      {
        title: "What is Impulse?",
        content: "Impulse (J) is the change in momentum caused by a force acting over time: J⃗ = Δp⃗ = FΔt. Units are N·s = kg·m/s (same as momentum). Impulse is a vector in the direction of the force. Large impulse changes momentum a lot. The impulse-momentum theorem: J = Δp connects force, time, and momentum change."
      },
      {
        title: "Force and Time Trade-off",
        content: "The same impulse (momentum change) can come from large force × short time or small force × long time. Catching a ball: stopping quickly (short time) requires large force and hurts. Giving way while catching (long time) reduces force needed. This is why we bend knees when landing, why cars have crumple zones, and why airbags work."
      },
      {
        title: "Impulse Examples",
        content: "Baseball: 0.145 kg ball goes from -40 m/s to +30 m/s (thrown to hit and returned). Δp = 0.145(30 - (-40)) = 10.15 kg·m/s. If bat contact is 0.002 s: F = 10.15/0.002 = 5075 N. Golf: ball accelerated from rest to 70 m/s. Same mass: Δp = 0.145 × 70 = 10.15 kg·m/s. Club contact time determines force."
      }
    ]
  },
  "phys-9-3": {
    slides: [
      {
        title: "Conservation of Momentum",
        content: "In a closed system (no external forces), total momentum is conserved: Σp⃗before = Σp⃗after. For two-object collisions: m₁v₁ᵢ + m₂v₂ᵢ = m₁v₁f + m₂v₂f. This applies to all collisions and explosions. Momentum is a vector, so conservation applies to each component (x, y) separately."
      },
      {
        title: "Applying Conservation of Momentum",
        content: "Two ice skaters push apart: combined momentum stays zero (was zero before). If 50 kg skater moves at 3 m/s, the 75 kg skater moves at 2 m/s opposite direction. A cannon and cannonball start at rest; total momentum after firing is still zero. The cannon recoils backward as the ball goes forward."
      },
      {
        title: "Momentum Conservation Examples",
        content: "A 1000 kg car at 20 m/s hits a 2000 kg truck at rest. They stick together. Combined mass = 3000 kg. Momentum before = 1000 × 20 = 20,000 kg·m/s. After: 3000 × v = 20,000, so v = 6.67 m/s. Note: kinetic energy is not conserved here (some lost to deformation). But momentum is always conserved in collisions."
      }
    ]
  },
  "phys-9-4": {
    slides: [
      {
        title: "Elastic Collisions",
        content: "In elastic collisions, both momentum AND kinetic energy are conserved. Objects bounce off each other with no permanent deformation. Perfectly elastic collisions are idealized—pool balls and atomic collisions come close. Use two equations: momentum conservation and KE conservation. For equal masses, objects exchange velocities in head-on elastic collision."
      },
      {
        title: "Inelastic Collisions",
        content: "In inelastic collisions, momentum is conserved but kinetic energy is NOT conserved. Some KE converts to other forms (deformation, heat, sound). Most real collisions are inelastic. Perfectly inelastic collisions have objects sticking together—maximum KE loss while still conserving momentum. Use only momentum conservation equation for perfectly inelastic collisions."
      },
      {
        title: "Comparing Collision Types",
        content: "Two 1 kg balls, one at 5 m/s, one at rest. Elastic: momentum 5 kg·m/s, KE 12.5 J—both conserved. Balls exchange velocities (first stops, second moves at 5 m/s). Perfectly inelastic: balls stick, combined 2 kg at 2.5 m/s. Momentum 5 kg·m/s conserved. KE = ½(2)(2.5)² = 6.25 J—only half the original KE remains. The rest became heat/deformation."
      }
    ]
  },

  // Unit 10: Rotational Motion
  "phys-10-1": {
    slides: [
      {
        title: "What is Angular Displacement?",
        content: "Angular displacement (θ) measures rotation about an axis. It's the angle swept by a rotating object, measured in radians (rad). One complete revolution = 2π radians = 360°. Unlike linear displacement (meters), angular displacement is measured in angles. Counterclockwise rotation is typically positive; clockwise is negative."
      },
      {
        title: "Radians vs. Degrees",
        content: "A radian is defined by arc length equals radius: θ(rad) = arc length / radius. This makes radians natural for circular motion. Conversions: 360° = 2π rad, so 1 rad = 57.3° and 1° = 0.0175 rad. Full circle = 2π rad ≈ 6.28 rad. When calculating, use radians for formulas involving arc length, angular velocity, etc."
      },
      {
        title: "Angular Displacement Examples",
        content: "A wheel turns through 90°: θ = 90 × (π/180) = π/2 rad ≈ 1.57 rad. A merry-go-round completes 3 revolutions: θ = 3 × 2π = 6π rad ≈ 18.85 rad. The hour hand of a clock moves from 12 to 3: θ = 90° = π/2 rad (but clockwise, so -π/2 rad if counterclockwise is positive)."
      }
    ]
  },
  "phys-10-2": {
    slides: [
      {
        title: "What is Angular Velocity?",
        content: "Angular velocity (ω) is the rate of angular displacement: ω = Δθ/Δt. Units are radians per second (rad/s). It describes how fast an object rotates. One revolution per second = 2π rad/s. Angular velocity is a vector pointing along the rotation axis (use right-hand rule: curl fingers in rotation direction, thumb points along ω)."
      },
      {
        title: "Relating Angular and Linear Velocity",
        content: "For a point on a rotating object at distance r from axis: linear velocity v = rω. Points farther from the axis move faster linearly, though all points share the same angular velocity. A rider at the edge of a merry-go-round moves faster (greater v) than one near the center, but both complete one revolution in the same time (same ω)."
      },
      {
        title: "Angular Velocity Examples",
        content: "A fan blade rotates at 900 rpm (revolutions per minute): ω = 900 × 2π/60 = 94.2 rad/s. Earth's rotation: one revolution in 24 hours: ω = 2π/(24 × 3600) = 7.27 × 10⁻⁵ rad/s. CD spinning at ω = 20 rad/s: a point 5 cm from center has v = 0.05 × 20 = 1 m/s. A point at 2.5 cm has v = 0.5 m/s."
      }
    ]
  },
  "phys-10-3": {
    slides: [
      {
        title: "What is Angular Acceleration?",
        content: "Angular acceleration (α) is the rate of change of angular velocity: α = Δω/Δt. Units are rad/s². It describes how quickly rotation speeds up or slows down. Positive α increases angular velocity (in positive direction); negative α decreases it. Like linear acceleration changes linear velocity, angular acceleration changes angular velocity."
      },
      {
        title: "Rotational Kinematics",
        content: "The kinematic equations for constant angular acceleration mirror linear ones. ω = ω₀ + αt. θ = ω₀t + ½αt². ω² = ω₀² + 2αθ. θ = ½(ω₀ + ω)t. Use these when α is constant, just as you use linear equations when a is constant. The mathematical structure is identical—just replace x with θ, v with ω, and a with α."
      },
      {
        title: "Angular Acceleration Examples",
        content: "A wheel accelerates from rest to 10 rad/s in 5 s: α = (10 - 0)/5 = 2 rad/s². How many revolutions? θ = ½αt² = ½(2)(5)² = 25 rad = 25/(2π) = 4 revolutions. A disk slowing from 30 rad/s to 10 rad/s over 100 rad: ω² = ω₀² + 2αθ → α = (100 - 900)/(200) = -4 rad/s²."
      }
    ]
  },
  "phys-10-4": {
    slides: [
      {
        title: "What is Torque?",
        content: "Torque (τ) is the rotational equivalent of force—it causes angular acceleration. τ = rF sin(θ), where r is distance from axis to force application point, F is force magnitude, θ is angle between r and F. Units are Newton-meters (N·m). Torque is a vector perpendicular to the plane of rotation."
      },
      {
        title: "Maximizing Torque",
        content: "Torque is maximized when force is perpendicular to the lever arm (θ = 90°, sin θ = 1). Push a door at its edge (large r), perpendicular to door—maximum torque. Push near hinge (small r)—hard to rotate. Push parallel to door (θ = 0°)—zero torque. Wrenches have long handles to increase r and reduce force needed for same torque."
      },
      {
        title: "Torque Examples",
        content: "Opening a door: Push with 20 N perpendicular to door, 0.8 m from hinge: τ = 0.8 × 20 × 1 = 16 N·m. Tightening a bolt: 50 N force with 0.3 m wrench, perpendicular: τ = 0.3 × 50 = 15 N·m. A seesaw: 400 N child 2 m from pivot vs. 300 N child—where should lighter child sit? 400 × 2 = 300 × d → d = 2.67 m for balance."
      }
    ]
  },
  "phys-10-5": {
    slides: [
      {
        title: "Rotational Equilibrium",
        content: "An object is in rotational equilibrium when net torque is zero: Στ = 0. Combined with translational equilibrium (ΣF = 0), this fully describes static equilibrium. For rotational equilibrium, clockwise and counterclockwise torques must balance. Choose any convenient pivot point for calculating torques—the result is the same if in equilibrium."
      },
      {
        title: "Solving Rotational Equilibrium",
        content: "Steps: 1) Choose a pivot point (often where unknown force acts—its torque is zero). 2) Identify all forces and their distances from pivot. 3) Assign positive/negative to torque directions (e.g., counterclockwise positive). 4) Write Στ = 0. 5) Solve for unknown. This is essential for analyzing bridges, seesaws, ladders, and crane arms."
      },
      {
        title: "Rotational Equilibrium Example",
        content: "A 4 m beam (uniform, 100 N) is supported at one end. Where should a 50 N weight hang for balance? Beam's weight acts at center (2 m from support). Taking torques about support: 100 × 2 = 50 × d (counterclockwise from beam = clockwise from weight). d = 4 m. The weight must hang at the far end. Or add a pivot and recalculate for different arrangements."
      }
    ]
  },

  // Unit 11: Gravitation
  "phys-11-1": {
    slides: [
      {
        title: "Newton's Law of Universal Gravitation",
        content: "Every object attracts every other object with a gravitational force. F = Gm₁m₂/r², where G = 6.674 × 10⁻¹¹ N·m²/kg² is the gravitational constant, m₁ and m₂ are the masses, and r is the distance between centers. The force is attractive, acting along the line connecting the centers. Gravity follows an inverse-square law—double the distance, quarter the force."
      },
      {
        title: "Understanding the Equation",
        content: "G is incredibly small, so gravitational force is noticeable only for massive objects (planets, stars) or very sensitive measurements. Earth (6 × 10²⁴ kg) creates significant force. Two 100 kg people 1 m apart attract with only F = G(100)(100)/1² = 6.67 × 10⁻⁷ N—imperceptible. But Earth-Moon: F = 2 × 10²⁰ N—that keeps the Moon in orbit!"
      },
      {
        title: "Gravitational Constant G",
        content: "G was first measured by Henry Cavendish in 1798 using a torsion balance—one of the most delicate experiments in physics. G is a fundamental constant of nature, unchanging throughout the universe. It connects mass, distance, and force for all gravitational interactions. Einstein's general relativity reinterprets gravity as spacetime curvature, but Newton's law remains accurate for most situations."
      }
    ]
  },
  "phys-11-2": {
    slides: [
      {
        title: "Calculating Gravitational Force",
        content: "Apply F = Gm₁m₂/r² with consistent units (kg, m, N). Example: Earth-Moon force. Earth mass: 5.97 × 10²⁴ kg. Moon mass: 7.35 × 10²² kg. Distance: 3.84 × 10⁸ m. F = (6.674 × 10⁻¹¹)(5.97 × 10²⁴)(7.35 × 10²²)/(3.84 × 10⁸)² = 1.98 × 10²⁰ N. This enormous force keeps the Moon orbiting Earth."
      },
      {
        title: "Gravitational Force Near Earth's Surface",
        content: "At Earth's surface (r ≈ Earth's radius = 6.37 × 10⁶ m): F = GMm/R² = mg, so g = GM/R². Plugging in: g = (6.674 × 10⁻¹¹)(5.97 × 10²⁴)/(6.37 × 10⁶)² = 9.81 m/s². This is why we use g ≈ 9.8 m/s² for free fall. At higher altitudes, r increases, so g decreases."
      },
      {
        title: "Gravitational Force Between Objects",
        content: "Two bowling balls (each 7 kg) touching (centers 0.3 m apart): F = G(7)(7)/(0.3)² = 3.6 × 10⁻⁸ N—tiny! Sun on Earth: F = G(2 × 10³⁰)(6 × 10²⁴)/(1.5 × 10¹¹)² = 3.5 × 10²² N. Gravity dominates large scales (planets, stars, galaxies) but is negligible for everyday objects compared to other forces."
      }
    ]
  },
  "phys-11-3": {
    slides: [
      {
        title: "Weight vs. Mass",
        content: "Mass (m) is the quantity of matter—intrinsic and constant regardless of location. Weight (W) is the gravitational force on an object—it varies with location. W = mg on Earth's surface, where g = 9.8 m/s². On Moon (g = 1.6 m/s²), same mass has 1/6 the weight. In deep space, weight is nearly zero but mass is unchanged. Mass is measured in kg; weight in Newtons."
      },
      {
        title: "Why the Distinction Matters",
        content: "A 70 kg person: On Earth, W = 70 × 9.8 = 686 N. On Moon, W = 70 × 1.6 = 112 N. In orbiting space station, apparent weight is zero (free fall), but mass is still 70 kg, and inertia is unchanged—still hard to push. Scales measure weight, not mass (though calibrated for Earth, they display 'kg'). In physics, always distinguish mass from weight."
      },
      {
        title: "Apparent Weight",
        content: "Apparent weight is what a scale reads—the normal force. In an accelerating elevator: going up, N > mg (feel heavier). Going down, N < mg (feel lighter). In free fall, N = 0 (weightlessness). Astronauts in orbit experience weightlessness because they're in free fall toward Earth—gravity is still pulling them, but they're falling along with their spacecraft."
      }
    ]
  },
  "phys-11-4": {
    slides: [
      {
        title: "Satellite Motion",
        content: "Satellites orbit because gravitational force provides centripetal acceleration. For circular orbit: GMm/r² = mv²/r, giving orbital velocity v = √(GM/r). Higher orbits have lower velocity but longer orbital period. The Moon orbits at about 1 km/s; the ISS at about 7.7 km/s (closer, so faster). Orbits are perpetual free fall toward Earth, continuously 'missing' the surface."
      },
      {
        title: "Orbital Period",
        content: "For circular orbit: v = 2πr/T (circumference over period). Combined with v = √(GM/r): T = 2π√(r³/GM). This is Kepler's third law! Period depends only on radius and central mass, not satellite mass. Geostationary satellites (T = 24 hours) must be at r = 42,200 km from Earth's center. Moon's period: about 27.3 days at r = 384,000 km."
      },
      {
        title: "Escape Velocity",
        content: "Escape velocity is the minimum speed needed to escape a body's gravitational pull permanently. Using energy conservation: ½mv² = GMm/r (KE equals magnitude of gravitational PE). v_escape = √(2GM/r). For Earth: v_escape ≈ 11.2 km/s. For Moon: ≈ 2.4 km/s. Black holes have event horizons where escape velocity equals light speed—nothing escapes."
      }
    ]
  },
};

export function getLessonContent(lessonId: string): LessonContent {
  return lessonContents[lessonId] || {
    slides: [
      {
        title: "Introduction",
        content: "This lesson covers the fundamental concepts and principles that form the foundation of this topic. Understanding these basics is essential for mastering more advanced concepts. We'll explore the key definitions, historical context, and real-world applications that make this subject fascinating and relevant to your everyday life."
      },
      {
        title: "Key Concepts",
        content: "In this section, we dive deeper into the specific components and mechanisms involved. Each concept builds upon the previous one, creating a comprehensive understanding of the subject matter. Pay attention to the relationships between different elements and how they interact with each other to produce observable phenomena."
      },
      {
        title: "Examples & Applications",
        content: "Let's look at practical examples that demonstrate these concepts in action. Example 1: Real-world application in daily life. Example 2: Scientific experiment demonstrating the principle. Example 3: Industry applications and modern technology. These examples help connect theory to practice."
      }
    ]
  };
}
