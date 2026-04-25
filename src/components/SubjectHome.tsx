import { motion } from 'motion/react';
import { Subject, SUBJECT_THEMES, SUBJECT_TOPICS, FormLevel } from '../types';
import { BookOpen, ArrowLeft, Brain, Target, Info } from 'lucide-react';
import { cn } from '../lib/utils';

interface SubjectHomeProps {
  subject: Subject;
  form: FormLevel;
  progress: string[];
  onTopicClick: (topic: string) => void;
  onBack: () => void;
}

export function SubjectHome({ subject, form, progress, onTopicClick, onBack }: SubjectHomeProps) {
  const theme = SUBJECT_THEMES[subject];
  const topics = SUBJECT_TOPICS[subject];

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <header className={cn("p-6 text-white shadow-lg sticky top-0 z-10", theme.primary)}>
        <div className="max-w-4xl mx-auto flex items-center gap-4">
          <button onClick={onBack} className="p-2 hover:bg-white/20 rounded-full transition-colors">
            <ArrowLeft size={24} />
          </button>
          <div>
            <h1 className="text-2xl font-black uppercase tracking-tight">{subject}</h1>
            <p className="text-sm font-medium text-white/80">{form} Edition</p>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-4xl w-full mx-auto p-6 space-y-8">
        {/* Progress Card */}
        <section className={cn("rounded-3xl p-6 border-2 flex flex-col md:flex-row gap-6 items-center", theme.border, theme.secondary)}>
          <div className={cn("p-4 rounded-2xl", theme.primary)}>
            <Target size={32} className="text-white" />
          </div>
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-xl font-black text-slate-800">Your Progress</h2>
            <p className="text-slate-600 font-medium mt-1">You've covered {progress.length} parts of {subject} in this session!</p>
            <div className="w-full bg-slate-200 h-3 rounded-full mt-4 overflow-hidden">
              <div 
                className={cn("h-full transition-all duration-500", theme.primary)} 
                style={{ width: `${(progress.length / topics.length) * 100}%` }}
              />
            </div>
          </div>
        </section>

        {/* Topics Grid */}
        <section>
          <h2 className="text-2xl font-black text-slate-800 mb-6 flex items-center gap-2">
            <BookOpen className={theme.accent} /> Select a Topic
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {topics.map((topic) => {
              const isCompleted = progress.includes(topic.name);
              return (
                <motion.button
                  key={topic.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => onTopicClick(topic.name)}
                  className={cn(
                    "p-6 rounded-3xl border-2 text-left transition-all bg-white flex items-start gap-4 shadow-sm",
                    theme.border,
                    theme.hover
                  )}
                >
                  <div className={cn("p-3 rounded-xl", isCompleted ? "bg-emerald-500 text-white" : cn(theme.secondary, theme.accent))}>
                    <Brain size={24} />
                  </div>
                  <div>
                    <h3 className="font-black text-slate-800 text-lg leading-tight">{topic.name}</h3>
                    <p className="text-slate-500 text-sm mt-1 font-medium">{topic.description}</p>
                    {isCompleted && (
                      <span className="inline-block mt-3 bg-emerald-100 text-emerald-700 text-xs font-bold px-2 py-1 rounded-lg">COMPLETED</span>
                    )}
                  </div>
                </motion.button>
              );
            })}
          </div>
        </section>

        {/* Tip of the day */}
        <section className="bg-white rounded-3xl p-6 border-2 border-slate-100 shadow-sm flex gap-4">
          <Info size={24} className="text-slate-400 shrink-0" />
          <div>
            <h4 className="font-bold text-slate-800 mb-1">Msomi's Tip</h4>
            <p className="text-slate-600 text-sm italic">"Chemistry is like cooking ugali—if you miss the steps, everything becomes a sticky mess! Always follow the logic."</p>
          </div>
        </section>
      </main>
    </div>
  );
}
