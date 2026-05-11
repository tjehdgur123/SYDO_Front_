import { motion } from 'motion/react';
import { Sparkles } from 'lucide-react';

interface FloatingAIButtonProps {
  onClick: () => void;
}

export default function FloatingAIButton({ onClick }: FloatingAIButtonProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={onClick}
      className="fixed bottom-10 right-10 w-16 h-16 bg-black text-white rounded-full flex flex-col items-center justify-center shadow-2xl z-[500] cursor-pointer group"
    >
      <motion.div
        animate={{ 
          rotate: [0, 10, -10, 0],
          scale: [1, 1.1, 1]
        }}
        transition={{ 
          repeat: Infinity, 
          duration: 3,
          ease: "easeInOut"
        }}
      >
        <Sparkles size={20} className="mb-0.5 group-hover:text-sydo-pink transition-colors" />
      </motion.div>
      <span className="text-[10px] font-black leading-none tracking-tighter">AI 코디</span>
    </motion.button>
  );
}
