import { motion } from 'motion/react';
import { Subject, SUBJECT_THEMES } from '../types';
import { Plus, Ruler, FlaskConical, Zap, Leaf } from 'lucide-react';
import { cn } from '../lib/utils';

interface SubjectDashboardProps {
  userName: string;
  onSelectSubject: (subject: Subject) => void;
}

export function SubjectDashboard({ userName, onSelectSubject }: SubjectDashboardProps) {
  const subjects: { name: Subject; icon: React.ReactNode }[] = [
    { name: 'Mathematics', icon: <Ruler size={32} /> },
    { name: 'Physics', icon: <Zap size={32} /> },
    { name: 'Biology', icon: <Leaf size={32} /> },
    { name: 'Chemistry', icon: <FlaskConical size={32} /> },
  ];

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <header className="max-w-4xl mx-auto mb-10 mt-8">
        <h1 className="text-4xl font-black text-slate-900 tracking-tight">Sasa, {userName}! 👋</h1>
        <p className="text-slate-600 text-lg mt-2 font-medium">Umechagua nini tupasue leo?</p>
      </header>

      <main className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
        {subjects.map((sub) => {
          const theme = SUBJECT_THEMES[sub.name];
          return (
            <motion.button
              key={sub.name}
              whileHover={{ scale: 1.02, y: -5 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onSelectSubject(sub.name)}
              className={cn(
                "group relative overflow-hidden rounded-[32px] p-8 text-left transition-all shadow-xl",
                theme.primary,
                "text-white"
              )}
            >
              <div className="absolute -right-4 -bottom-4 opacity-10 group-hover:scale-110 transition-transform duration-500">
                {sub.icon}
              </div>
              
              <div className="relative z-10">
                <div className="bg-white/20 w-16 h-16 rounded-2xl flex items-center justify-center mb-6">
                  {sub.icon}
                </div>
                <h2 className="text-3xl font-black uppercase tracking-tight">{sub.name}</h2>
                <div className="mt-4 flex items-center gap-2 text-white/80 font-bold uppercase text-sm">
                  <span>Enter Studio</span>
                  <Plus size={16} />
                </div>
              </div>

              {/* Decorative elements */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl -mr-16 -mt-16" />
            </motion.button>
          );
        })}
      </main>
    </div>
  );
}
