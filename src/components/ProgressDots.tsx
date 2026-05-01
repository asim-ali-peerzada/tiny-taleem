import { motion } from "framer-motion";
import React from "react";
import { cn } from "../utils/cn";

interface ProgressDotsProps {
  current: number;
  total: number;
}

export const ProgressDots: React.FC<ProgressDotsProps> = ({
  current,
  total,
}) => {
  return (
    <div className="flex gap-1.5 md:gap-2 justify-center flex-wrap px-2 md:px-4 max-w-48 md:max-w-none">
      {Array.from({ length: total }).map((_, i) => (
        <motion.div
          key={i}
          initial={false}
          animate={{
            scale: i === current ? 1.5 : 1,
            backgroundColor: i === current ? "#FF6B6B" : "#E2E8F0",
          }}
          className={cn(
            "w-2 h-2 md:w-3 md:h-3 rounded-full shadow-sm",
            i < current ? "bg-primary opacity-50" : "",
          )}
        />
      ))}
    </div>
  );
};
