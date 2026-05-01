import { motion } from "framer-motion";
import React from "react";
import { cn } from "../utils/cn";

interface ModeCardProps {
  title: string;
  icon: string | React.ReactNode;
  color: string;
  onClick: () => void;
}

export const ModeCard: React.FC<ModeCardProps> = ({
  title,
  icon,
  color,
  onClick,
}) => {
  return (
    <motion.button
      whileHover={{ scale: 1.05, rotate: -2 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={cn(
        "w-full h-56 rounded-[50px] flex flex-col items-center justify-center gap-4 text-white shadow-[0_20px_0_rgba(0,0,0,0.1)] active:shadow-none active:translate-y-[10px] relative overflow-hidden group cursor-pointer",
        color,
      )}
    >
      {/* Glossy Overlay */}
      <div className="absolute top-0 left-0 w-full h-1/2 bg-white/10 -skew-y-12 origin-top-left" />

      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ 
          repeat: Infinity, 
          duration: 3,
          ease: "easeInOut"
        }}
        className="text-8xl drop-shadow-2xl z-10"
      >
        {icon}
      </motion.div>

      <span className="text-4xl font-black font-rounded tracking-wide z-10 drop-shadow-lg">
        {title}
      </span>

      {/* Decorative circles */}
      <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-white/10 rounded-full group-hover:scale-150 transition-transform duration-700" />
    </motion.button>
  );
};
