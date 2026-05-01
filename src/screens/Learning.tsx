import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Home, RotateCcw, Volume2 } from "lucide-react";
import React, { useCallback, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Celebration } from "../components/Celebration";
import { LearningCard } from "../components/LearningCard";
import { ProgressDots } from "../components/ProgressDots";
import { englishData } from "../data/english";
import { numbersData } from "../data/numbers";
import { urduData } from "../data/urdu";
import { useAudio } from "../hooks/useAudio";
import { useSwipe } from "../hooks/useSwipe";

const dataMap = {
  english: englishData,
  numbers: numbersData,
  urdu: urduData,
};

export const Learning: React.FC = () => {
  const { mode } = useParams<{ mode: string }>();
  const navigate = useNavigate();
  const { playSound } = useAudio();

  const dataset = dataMap[mode as keyof typeof dataMap] || englishData;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [direction, setDirection] = useState(0);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const currentItem = dataset[currentIndex];

  const handlePlaySound = useCallback(() => {
    console.log("Learning Screen: handlePlaySound triggered");
    setIsSpeaking(true);
    const textToSpeak =
      mode === "urdu"
        ? currentItem.word.split("(")[0].trim()
        : `${currentItem.letter} is for ${currentItem.word}`;

    playSound(textToSpeak);
    setTimeout(() => setIsSpeaking(false), 1500);
  }, [currentItem, mode, playSound]);

  const handleNext = useCallback(() => {
    if (currentIndex < dataset.length - 1) {
      setDirection(1);
      setCurrentIndex((prev) => prev + 1);
    } else {
      setIsCompleted(true);
    }
  }, [currentIndex, dataset.length]);

  const handlePrev = useCallback(() => {
    if (currentIndex > 0) {
      setDirection(-1);
      setCurrentIndex((prev) => prev - 1);
    }
  }, [currentIndex]);

  const swipeHandlers = useSwipe({
    onSwipeLeft: handleNext,
    onSwipeRight: handlePrev,
  });

  if (isCompleted) {
    return (
      <Celebration
        onRestart={() => {
          setIsCompleted(false);
          setCurrentIndex(0);
        }}
        onHome={() => navigate("/")}
      />
    );
  }

  return (
    <div
      className="fixed inset-0 flex flex-col bg-linear-to-b from-[#FFF] to-[#F0F9FF] overflow-hidden"
      onTouchStart={swipeHandlers.onTouchStart}
      onTouchMove={swipeHandlers.onTouchMove}
      onTouchEnd={swipeHandlers.onTouchEnd}
    >
      {/* Top Navigation Bar - Safe area aware */}
      <div className="h-[100px] md:h-[140px] pt-4 md:pt-8 flex items-center justify-between px-4 md:px-8 z-30 shrink-0">
        <motion.button
          whileHover={{ scale: 1.1, rotate: -5 }}
          whileTap={{ scale: 0.9, rotate: 0 }}
          onClick={() => navigate("/")}
          className="w-14 h-14 md:w-20 md:h-20 rounded-2xl md:rounded-[28px] bg-white shadow-[0_6px_0_#E2E8F0] md:shadow-[0_10px_0_#E2E8F0] flex items-center justify-center text-gray-700 border-2 border-gray-100"
        >
          <Home size={28} className="md:w-9 md:h-9" strokeWidth={3} />
        </motion.button>

        <div className="flex flex-col items-center gap-4 md:gap-6">
          <div className="bg-white/90 backdrop-blur-md px-4 md:px-8 py-2 md:py-3 rounded-2xl md:rounded-3xl shadow-xl border-2 border-white flex items-center gap-2 md:gap-4">
            <span className="text-2xl md:text-4xl font-black font-rounded text-primary">
              {currentIndex + 1}
            </span>
            <div className="w-0.5 h-6 md:w-1 md:h-8 bg-gray-200 rounded-full" />
            <span className="text-2xl md:text-4xl font-black font-rounded text-gray-300">
              {dataset.length}
            </span>
          </div>
          <ProgressDots current={currentIndex} total={dataset.length} />
        </div>

        <motion.button
          whileHover={{ scale: 1.1, rotate: 5 }}
          whileTap={{ scale: 0.9, rotate: 0 }}
          animate={
            isSpeaking
              ? {
                  scale: [1, 1.2, 1],
                  rotate: [0, 10, -10, 0],
                }
              : {}
          }
          onClick={handlePlaySound}
          className="w-14 h-14 md:w-20 md:h-20 rounded-2xl md:rounded-[28px] bg-secondary text-white shadow-[0_6px_0_#2563EB] md:shadow-[0_10px_0_#2563EB] flex items-center justify-center border-2 border-blue-400"
        >
          <Volume2 size={28} className="md:w-9 md:h-9" strokeWidth={3} />
        </motion.button>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 min-h-0 flex flex-col items-center justify-center relative px-4 md:px-6 z-10 overflow-hidden">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentIndex}
            custom={direction}
            initial={{ x: direction > 0 ? 600 : -600, opacity: 0, scale: 0.8 }}
            animate={{ x: 0, opacity: 1, scale: 1 }}
            exit={{ x: direction > 0 ? -600 : 600, opacity: 0, scale: 0.8 }}
            transition={{ type: "spring", damping: 20, stiffness: 120 }}
            className="w-full h-full flex flex-col items-center justify-center"
          >
            <button
              className="w-full h-full cursor-pointer flex flex-col items-center justify-center outline-none bg-transparent border-none p-0 appearance-none text-inherit font-inherit"
              onClick={handlePlaySound}
              aria-label={`Play sound for ${currentItem.word}`}
            >
              <LearningCard
                letter={currentItem.letter}
                word={currentItem.word}
                image={currentItem.image}
                color={currentItem.color}
                isUrdu={mode === "urdu"}
                showImage={mode !== "numbers"}
              />
            </button>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom Navigation Controls - Large and chunky */}
      <div className="h-[160px] md:h-[220px] pb-6 md:pb-12 flex items-center justify-between w-full max-w-5xl mx-auto px-6 md:px-10 z-30 shrink-0">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.85 }}
          onClick={handlePrev}
          disabled={currentIndex === 0}
          className="w-20 h-20 md:w-28 md:h-28 rounded-full bg-indigo-500 text-white disabled:opacity-20 shadow-[0_8px_0_#4338CA] md:shadow-[0_12px_0_#4338CA] border-4 border-indigo-300 flex items-center justify-center"
        >
          <ArrowLeft size={40} className="md:w-14 md:h-14" strokeWidth={4} />
        </motion.button>

        <div className="flex flex-col items-center gap-3">
          <div className="flex flex-col items-center gap-1 md:gap-2">
            <motion.div
              animate={{ y: [0, -4, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="text-gray-400 font-black font-rounded text-[10px] md:text-sm tracking-[0.3em] opacity-40 uppercase"
            >
              Swipe or Tap
            </motion.div>
          </div>

          <motion.button
            whileHover={{ scale: 1.1, rotate: -180 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => {
              setDirection(-1);
              setCurrentIndex(0);
            }}
            className="flex items-center gap-2 px-4 py-2 bg-white/50 backdrop-blur-sm rounded-full border-2 border-white shadow-sm text-gray-400 hover:text-primary transition-colors"
          >
            <RotateCcw size={16} strokeWidth={3} />
            <span className="text-xs font-black font-rounded uppercase tracking-wider">
              Restart
            </span>
          </motion.button>
        </div>

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.85 }}
          onClick={handleNext}
          className="w-20 h-20 md:w-28 md:h-28 rounded-full bg-primary text-white shadow-[0_8px_0_#CA8A04] md:shadow-[0_12px_0_#CA8A04] border-4 border-yellow-400 flex items-center justify-center"
        >
          <motion.div
            animate={{ x: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1 }}
          >
            <ArrowRight size={40} className="md:w-14 md:h-14" strokeWidth={4} />
          </motion.div>
        </motion.button>
      </div>
    </div>
  );
};
