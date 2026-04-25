/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useRef, useEffect } from "react";
import { GraduationCap, Sparkles, ArrowLeft, Home } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { ChatMessage } from "./components/ChatMessage";
import { ChatInput } from "./components/ChatInput";
import { WelcomeScreen } from "./components/WelcomeScreen";
import { SubjectDashboard } from "./components/SubjectDashboard";
import { SubjectHome } from "./components/SubjectHome";
import { chat } from "./lib/gemini";
import { UserData, Subject, SUBJECT_THEMES } from "./types";
import { cn } from "./lib/utils";

interface Message {
  role: 'user' | 'model';
  text: string;
}

type View = 'welcome' | 'dashboard' | 'subject-home' | 'chat';

export default function App() {
  const [user, setUser] = useState<UserData | null>(null);
  const [currentView, setCurrentView] = useState<View>('welcome');
  const [currentSubject, setCurrentSubject] = useState<Subject | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [sessionProgress, setSessionProgress] = useState<Record<Subject, string[]>>({
    Mathematics: [],
    Physics: [],
    Biology: [],
    Chemistry: [],
  });
  
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleWelcomeComplete = (data: UserData) => {
    setUser(data);
    setCurrentView('dashboard');
  };

  const handleSubjectSelect = (subject: Subject) => {
    setCurrentSubject(subject);
    setCurrentView('subject-home');
  };

  const startChatTransition = (topic?: string) => {
    setMessages([
      {
        role: 'model',
        text: `Sawa ${user?.name}! Msomi here. Tuanze kupasua **${currentSubject}**! \n\nUko ${user?.form} so nitakupea examples mzee anaweza kuelewa. ${topic ? `Umechagua **${topic}**, hiyo ni topic poa sana!` : "Ungetaka tuanzie wapi?"} \n\nInafanya sense?`
      }
    ]);
    setCurrentView('chat');
  };

  const handleSendMessage = async (text: string) => {
    if (!user || !currentSubject) return;

    const newUserMessage: Message = { role: 'user', text };
    setMessages(prev => [...prev, newUserMessage]);
    setIsLoading(true);

    const history = messages.map(msg => ({
      role: msg.role,
      parts: [{ text: msg.text }]
    }));

    const responseText = await chat(text, history, { 
      name: user.name, 
      form: user.form, 
      subject: currentSubject 
    });
    
    setMessages(prev => [...prev, { role: 'model', text: responseText }]);
    setIsLoading(false);

    // Naively track progress if they are talking about a topic
    // In a real app we might use a more sophisticated check
  };

  if (currentView === 'welcome') {
    return <WelcomeScreen onComplete={handleWelcomeComplete} />;
  }

  if (currentView === 'dashboard' && user) {
    return <SubjectDashboard userName={user.name} onSelectSubject={handleSubjectSelect} />;
  }

  if (currentView === 'subject-home' && currentSubject && user) {
    return (
      <SubjectHome 
        subject={currentSubject}
        form={user.form}
        progress={sessionProgress[currentSubject]}
        onTopicClick={(topic) => {
          setSessionProgress(prev => ({
            ...prev,
            [currentSubject]: [...new Set([...prev[currentSubject], topic])]
          }));
          startChatTransition(topic);
        }}
        onBack={() => setCurrentView('dashboard')}
      />
    );
  }

  const theme = currentSubject ? SUBJECT_THEMES[currentSubject] : SUBJECT_THEMES.Mathematics;

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 font-sans text-slate-900 overflow-hidden h-screen">
      {/* Header */}
      <header className={cn("text-white p-4 shadow-md sticky top-0 z-10 transition-colors", theme.primary)}>
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button 
              onClick={() => setCurrentView('subject-home')}
              className="p-2 hover:bg-white/20 rounded-full transition-colors"
            >
              <ArrowLeft size={20} />
            </button>
            <div className="flex flex-col">
              <h1 className="font-black text-lg uppercase tracking-tight leading-none">{currentSubject}</h1>
              <p className="text-[10px] text-white/70 font-bold uppercase tracking-widest mt-1">Msomi | {user?.name}</p>
            </div>
          </div>
          
          <button 
            onClick={() => setCurrentView('dashboard')}
            className="bg-white/20 p-2 rounded-xl border border-white/30 backdrop-blur-sm hover:bg-white/30 transition-all"
          >
            <Home size={18} />
          </button>
        </div>
      </header>

      {/* Chat Area */}
      <main className="flex-1 max-w-4xl w-full mx-auto p-4 flex flex-col overflow-hidden">
        <div 
          ref={scrollRef}
          className="flex-1 overflow-y-auto pr-2 scrollbar-hide"
        >
          <div className="py-4 space-y-4">
            {messages.map((msg, index) => (
              <ChatMessage key={index} message={msg} />
            ))}
            
            {isLoading && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className={cn("flex items-center gap-2 font-black text-sm ml-12", theme.accent)}
              >
                <div className="flex gap-1">
                  {[0, 1, 2].map(i => (
                    <motion.span 
                      key={i}
                      animate={{ y: [0, -5, 0] }}
                      transition={{ repeat: Infinity, duration: 0.6, delay: i * 0.2 }}
                    >•</motion.span>
                  ))}
                </div>
                <span className="uppercase tracking-widest">Msomi anafikiria...</span>
              </motion.div>
            )}
          </div>
        </div>
      </main>

      {/* Input */}
      <div className="max-w-4xl w-full mx-auto bg-white border-t border-slate-100 px-4 py-2">
        <ChatInput onSendMessage={handleSendMessage} disabled={isLoading} />
      </div>
    </div>
  );
}

