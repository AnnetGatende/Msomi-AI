export type Subject = 'Mathematics' | 'Physics' | 'Biology' | 'Chemistry';
export type FormLevel = 'Form 1' | 'Form 2' | 'Form 3' | 'Form 4';

export interface UserData {
  name: string;
  form: FormLevel;
}

export interface Topic {
  id: string;
  name: string;
  description: string;
}

export const SUBJECT_THEMES = {
  Mathematics: {
    primary: 'bg-blue-600',
    secondary: 'bg-blue-50',
    accent: 'text-blue-600',
    border: 'border-blue-200',
    hover: 'hover:border-blue-500',
  },
  Physics: {
    primary: 'bg-purple-600',
    secondary: 'bg-purple-50',
    accent: 'text-purple-600',
    border: 'border-purple-200',
    hover: 'hover:border-purple-500',
  },
  Biology: {
    primary: 'bg-emerald-600',
    secondary: 'bg-emerald-50',
    accent: 'text-emerald-600',
    border: 'border-emerald-200',
    hover: 'hover:border-emerald-500',
  },
  Chemistry: {
    primary: 'bg-orange-600',
    secondary: 'bg-orange-50',
    accent: 'text-orange-600',
    border: 'border-orange-200',
    hover: 'hover:border-orange-500',
  },
};

export const SUBJECT_TOPICS: Record<Subject, Topic[]> = {
  Mathematics: [
    { id: 'math-1', name: 'Algebra', description: 'Simplifying expressions and solving equations.' },
    { id: 'math-2', name: 'Percentages', description: 'M-Pesa fees and profit calculations.' },
    { id: 'math-3', name: 'Fractions', description: 'Dividing things like chapatis into pieces.' },
    { id: 'math-4', name: 'Geometry', description: 'Shapes and area calculations.' },
    { id: 'math-5', name: 'Trigonometry', description: 'Angles and triangles.' },
    { id: 'math-6', name: 'Statistics', description: 'Data analysis and graphs.' },
  ],
  Physics: [
    { id: 'phys-1', name: 'Newton\'s Laws', description: 'Inertia, momentum, and boda boda physics.' },
    { id: 'phys-2', name: 'Pressure', description: 'Force over area in Nairobi water pipes.' },
    { id: 'phys-3', name: 'Electricity', description: 'Circuits, currents, and KPLC vibes.' },
    { id: 'phys-4', name: 'Light', description: 'Refraction and reflection.' },
    { id: 'phys-5', name: 'Magnetism', description: 'Magnetic fields and forces.' },
    { id: 'phys-6', name: 'Thermal Physics', description: 'Heat transfer and temperature.' },
  ],
  Biology: [
    { id: 'bio-1', name: 'Photosynthesis', description: 'How plants cook food like mama mbogas.' },
    { id: 'bio-2', name: 'Human Heart', description: 'Blood circulation and oxygen transport.' },
    { id: 'bio-3', name: 'Reproduction', description: 'Cell division and genetics.' },
    { id: 'bio-4', name: 'Ecology', description: 'Food chains and the environment.' },
    { id: 'bio-5', name: 'Genetics', description: 'Inheritance and variation.' },
    { id: 'bio-6', name: 'Classification', description: 'Grouping living things.' },
  ],
  Chemistry: [
    { id: 'chem-1', name: 'Atomic Structure', description: 'Protons, neutrons, and electrons.' },
    { id: 'chem-2', name: 'Chemical Reactions', description: 'Mixing stuff like ingredients for chai.' },
    { id: 'chem-3', name: 'Acids & Bases', description: 'PH levels and common substances.' },
    { id: 'chem-4', name: 'Organic Chem', description: 'Carbon and its compounds.' },
    { id: 'chem-5', name: 'Electrochemistry', description: 'Batteries and electrolysis.' },
    { id: 'chem-6', name: 'Metals', description: 'Properties and extraction.' },
  ],
};
