import { motion } from "framer-motion";
import React from "react";
import { cn } from "../utils/cn";

interface LearningCardProps {
  letter: string;
  word: string;
  image: string;
  color: string;
  isUrdu?: boolean;
  showImage?: boolean;
}

export const LearningCard: React.FC<LearningCardProps> = ({
  letter,
  word,
  image,
  color,
  isUrdu = false,
  showImage = true,
}) => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [prevImage, setPrevImage] = React.useState(image);

  // Adjust state during render to avoid cascading renders from useEffect
  if (image !== prevImage) {
    setPrevImage(image);
    setIsLoading(true);
  }

  // Extract text size logic for better readability
  const getTextSize = () => {
    if (showImage) return "text-2xl md:text-5xl";
    if (word.length > 10) return "text-3xl md:text-6xl";
    return "text-4xl md:text-8xl";
  };

  const textSize = getTextSize();

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center w-full h-full max-w-2xl mx-auto transition-all duration-500 px-6",
        showImage ? "gap-2 py-2" : "gap-6 py-4",
      )}
    >
      {/* Letter Section */}
      <div className="relative shrink-0">
        <div
          className={cn(
            "font-black font-rounded shadow-xl flex items-center justify-center transition-all duration-500",
            isUrdu ? "font-urdu" : "",
            showImage
              ? "text-4xl md:text-8xl p-4 md:p-8 rounded-2xl md:rounded-[30px] min-w-[100px] md:min-w-[180px] border-4 md:border-6"
              : "text-7xl md:text-[11rem] p-8 md:p-14 rounded-[40px] md:rounded-[50px] min-w-[200px] md:min-w-[320px] border-8 md:border-10",
          )}
          style={{
            backgroundColor: color,
            color: "white",
            textShadow: "0 4px 0 rgba(0,0,0,0.1)",
            borderColor: "rgba(255,255,255,0.4)",
          }}
        >
          {letter}
        </div>
      </div>

      {/* Image Section */}
      {showImage && (
        <div className="flex-1 min-h-0 flex items-center justify-center w-full p-2">
          <div className="aspect-square h-full max-h-[30vh] md:max-h-[40vh] bg-white rounded-[30px] md:rounded-[40px] flex items-center justify-center shadow-2xl overflow-hidden border-6 md:border-8 border-white relative group">
            {isLoading && (
              <div className="absolute inset-0 bg-slate-100 flex items-center justify-center overflow-hidden">
                <motion.div
                  animate={{
                    x: ["-100%", "100%"],
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 1.2,
                    ease: "linear",
                  }}
                  className="absolute inset-0 bg-linear-to-r from-transparent via-white/60 to-transparent"
                />
                <div className="w-1/2 h-1/2 bg-slate-200/50 rounded-full animate-pulse" />
              </div>
            )}
            <img
              src={image}
              alt={word}
              onLoad={() => setIsLoading(false)}
              className={cn(
                "w-full h-full object-contain p-4 group-hover:scale-105 transition-all duration-500",
                isLoading ? "opacity-0 scale-90" : "opacity-100 scale-100",
              )}
              onError={(e) => {
                (e.target as HTMLImageElement).src =
                  `https://placehold.co/400x400?text=${word}`;
                setIsLoading(false);
              }}
            />
          </div>
        </div>
      )}

      {/* Word Section */}
      <div
        className={cn(
          "shrink-0 bg-white/80 backdrop-blur-sm rounded-3xl shadow-md border-2 border-white transition-all duration-500",
          showImage
            ? "px-6 md:px-8 py-2"
            : "px-10 md:px-14 py-3 md:py-6 shadow-2xl border-4 scale-100 md:scale-105",
        )}
      >
        <h2
          className={cn(
            "font-black font-rounded text-gray-800 tracking-wider text-center",
            textSize,
          )}
        >
          {word}
        </h2>
      </div>
    </div>
  );
};
