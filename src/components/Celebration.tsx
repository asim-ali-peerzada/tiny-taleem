import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { PartyPopper, Home, RotateCcw } from 'lucide-react';
import { useAudio } from '../hooks/useAudio';

interface CelebrationProps {
  onRestart: () => void;
  onHome: () => void;
}

export const Celebration: React.FC<CelebrationProps> = ({ onRestart, onHome }) => {
  const { playSound } = useAudio();

  useEffect(() => {
    playSound("Great Job! You finished learning!");
  }, [playSound]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-white/90 backdrop-blur-md"
    >
      <div className="text-center p-8 max-w-md w-full">
        <motion.div
          animate={{ rotate: [0, 10, -10, 10, 0], scale: [1, 1.2, 1] }}
          transition={{ duration: 0.5, repeat: Infinity }}
          className="inline-block mb-6 text-primary"
        >
          <PartyPopper size={120} />
        </motion.div>
        
        <h1 className="text-6xl font-black font-rounded text-accent mb-4">
          Great Job!
        </h1>
        <p className="text-2xl text-gray-600 mb-12 font-bold font-modern">
          You are a superstar!
        </p>

        <div className="flex flex-col gap-4">
          <button
            onClick={onRestart}
            className="flex items-center justify-center gap-3 bg-secondary text-white py-4 rounded-3xl text-2xl font-bold shadow-lg hover:scale-105 transition-transform"
          >
            <RotateCcw size={32} />
            Try Again
          </button>
          
          <button
            onClick={onHome}
            className="flex items-center justify-center gap-3 bg-primary text-white py-4 rounded-3xl text-2xl font-bold shadow-lg hover:scale-105 transition-transform"
          >
            <Home size={32} />
            Back to Home
          </button>
        </div>
      </div>
    </motion.div>
  );
};
