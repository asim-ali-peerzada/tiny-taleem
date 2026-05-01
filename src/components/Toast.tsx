import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, X } from "lucide-react";

interface ToastProps {
  message: string;
  isVisible: boolean;
  onClose: () => void;
  type?: "success" | "info" | "error";
}

export const Toast: React.FC<ToastProps> = ({ 
  message, 
  isVisible, 
  onClose,
  type = "success" 
}) => {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(onClose, 3000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.9 }}
          className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[100] px-6 py-4 bg-white rounded-3xl shadow-2xl border-4 border-accent flex items-center gap-4 min-w-[280px]"
        >
          <div className="w-10 h-10 bg-accent/20 rounded-2xl flex items-center justify-center text-accent">
            <CheckCircle2 size={24} strokeWidth={3} />
          </div>
          
          <div className="flex-1">
            <p className="text-gray-800 font-black font-rounded text-sm">
              {message}
            </p>
          </div>

          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors p-1"
          >
            <X size={20} strokeWidth={3} />
          </button>
          
          {/* Progress bar */}
          <motion.div 
            initial={{ scaleX: 1 }}
            animate={{ scaleX: 0 }}
            transition={{ duration: 3, ease: "linear" }}
            className="absolute bottom-0 left-0 right-0 h-1 bg-accent/30 origin-left"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};
