import { useState } from 'react';
import { motion } from 'motion/react';
import { UserData, FormLevel } from '../types';
import { GraduationCap, Sparkles } from 'lucide-react';

interface WelcomeScreenProps {
  onComplete: (data: UserData) => void;
}

export function WelcomeScreen({ onComplete }: WelcomeScreenProps) {
  const [name, setName] = useState('');
  const [form, setForm] = useState<FormLevel | ''>('');

  const forms: FormLevel[] = ['Form 1', 'Form 2', 'Form 3', 'Form 4'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim() && form) {
      onComplete({ name, form });
    }
  };

  return (
    <div className="min-h-screen bg-emerald-600 flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full"
      >
        <div className="flex flex-col items-center mb-8">
          <div className="bg-emerald-100 p-4 rounded-2xl mb-4">
            <GraduationCap size={48} className="text-emerald-600" />
          </div>
          <h1 className="text-3xl font-black text-slate-800 text-center">Sasa! I'm Msomi.</h1>
          <p className="text-slate-500 text-center mt-2 font-medium italic">Your friendly STEM study buddy 🇰🇪</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">Unaitwa nani? (Your Name)</label>
            <input 
              required
              type="text" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Kiprop or Anyango"
              className="w-full px-4 py-3 bg-slate-50 border-2 border-slate-200 rounded-xl focus:border-emerald-500 focus:outline-none transition-all font-medium"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">Uko Form Gani?</label>
            <div className="grid grid-cols-2 gap-3">
              {forms.map((f) => (
                <button
                  key={f}
                  type="button"
                  onClick={() => setForm(f)}
                  className={`py-3 rounded-xl border-2 font-bold transition-all ${
                    form === f 
                      ? 'border-emerald-600 bg-emerald-600 text-white' 
                      : 'border-slate-200 bg-white text-slate-600 hover:border-emerald-300'
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="w-full py-4 bg-emerald-600 text-white font-black rounded-xl shadow-lg shadow-emerald-200 flex items-center justify-center gap-2 text-lg uppercase tracking-tight"
          >
            Tuanze Kazi! <Sparkles size={20} />
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
}
