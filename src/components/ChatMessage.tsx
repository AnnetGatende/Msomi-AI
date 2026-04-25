import { motion } from "motion/react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { User, GraduationCap } from "lucide-react";
import { cn } from "@/src/lib/utils";

interface ChatMessageProps {
  message: {
    role: 'user' | 'model';
    text: string;
  };
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isModel = message.role === 'model';

  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      className={cn(
        "flex w-full mb-4 gap-3",
        isModel ? "flex-row" : "flex-row-reverse"
      )}
    >
      <div
        className={cn(
          "flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center shadow-sm",
          isModel ? "bg-emerald-600 text-white" : "bg-amber-500 text-white"
        )}
      >
        {isModel ? <GraduationCap size={20} /> : <User size={20} />}
      </div>

      <div
        className={cn(
          "max-w-[85%] md:max-w-[70%] rounded-2xl px-4 py-3 shadow-sm",
          isModel
            ? "bg-white text-slate-800 border-l-4 border-emerald-500"
            : "bg-emerald-50 text-emerald-900 border-r-4 border-amber-400"
        )}
      >
        <div className="prose prose-sm max-w-none">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {message.text}
          </ReactMarkdown>
        </div>
      </div>
    </motion.div>
  );
}
