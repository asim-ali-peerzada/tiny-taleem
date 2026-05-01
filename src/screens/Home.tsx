import { motion } from "framer-motion";
import { Cloud, Sparkles, Sun } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";
import { ModeCard } from "../components/ModeCard";
import { WeatherWidget } from "../components/WeatherWidget";

export const Home: React.FC = () => {
  const navigate = useNavigate();

  const handleModeClick = (path: string) => {
    // Haptic feedback for mobile
    if (typeof navigator !== "undefined" && navigator.vibrate) {
      navigator.vibrate(20);
    }

    // Prime the audio engine with a user gesture
    if (typeof globalThis !== "undefined" && globalThis.speechSynthesis) {
      globalThis.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance("Welcome");
      utterance.volume = 0.01; // Tiny volume to prime engine
      utterance.rate = 1.5;
      globalThis.speechSynthesis.speak(utterance);
    }
    navigate(path);
  };

  return (
    <div className="min-h-screen bg-linear-to-b from-[#E0F2FE] via-[#F0F9FF] to-[#FFF] relative">
      {/* Dynamic Background Elements */}
      <motion.div
        animate={{ x: [-20, 20, -20], y: [-10, 10, -10] }}
        transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
        className="absolute top-20 left-[10%] text-white/40 pointer-events-none"
      >
        <Cloud size={120} />
      </motion.div>

      <motion.div
        animate={{ x: [20, -20, 20], y: [10, -10, 10] }}
        transition={{ repeat: Infinity, duration: 10, ease: "easeInOut" }}
        className="absolute top-40 right-[15%] text-white/30 pointer-events-none"
      >
        <Cloud size={160} />
      </motion.div>

      <motion.div
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
        className="absolute -top-20 -left-20 text-yellow-400/20 pointer-events-none"
      >
        <Sun size={300} />
      </motion.div>

      <div className="max-w-4xl mx-auto px-6 pt-4 pb-6 md:py-12 relative z-10">
        <div className="flex justify-end md:justify-center mb-6">
          <WeatherWidget />
        </div>

        <header className="text-center mb-8 md:mb-16">
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 100 }}
            className="inline-block relative w-full"
          >
            <motion.div
              animate={{ y: [0, -15, 0], rotate: [0, 10, -10, 0] }}
              transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
              className="absolute -top-4 -right-4 md:-top-6 md:-right-6 text-primary z-20"
            >
              <Sparkles size={24} className="md:w-10 md:h-10" />
            </motion.div>

            <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 px-4">
              <motion.div
                animate={{ rotate: [0, 5, -5, 0], y: [0, -5, 0] }}
                transition={{
                  repeat: Infinity,
                  duration: 4,
                  ease: "easeInOut",
                }}
                className="relative shrink-0 cursor-pointer"
                onClick={() => navigator.vibrate?.(20)}
              >
                <div className="w-20 h-20 md:w-32 md:h-32 rounded-full border-4 md:border-6 border-white shadow-2xl overflow-hidden bg-white">
                  <img
                    src="/assets/images/deer.jpeg"
                    alt="Dheer"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-2 -right-2 bg-yellow-400 text-white p-1 rounded-full shadow-lg">
                  <Sparkles size={16} />
                </div>
              </motion.div>

              <div className="text-center">
                <h1 className="text-5xl md:text-8xl font-black font-rounded tracking-tighter text-transparent bg-clip-text bg-linear-to-r from-primary via-secondary to-accent drop-shadow-2xl py-2">
                  TinyTaleem
                </h1>
                <p className="text-lg md:text-2xl font-bold text-gray-400 font-modern tracking-widest uppercase opacity-80">
                  Learning is Playtime!
                </p>
              </div>

              <motion.div
                animate={{ rotate: [0, -5, 5, 0], y: [0, -5, 0] }}
                transition={{
                  repeat: Infinity,
                  duration: 4,
                  ease: "easeInOut",
                  delay: 0.5,
                }}
                className="relative shrink-0 cursor-pointer"
                onClick={() => navigator.vibrate?.(20)}
              >
                <div className="w-20 h-20 md:w-32 md:h-32 rounded-full border-4 md:border-6 border-white shadow-2xl overflow-hidden bg-white">
                  <img
                    src="/assets/images/rafay.jpeg"
                    alt="Rafay"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-2 -left-2 bg-blue-400 text-white p-1 rounded-full shadow-lg">
                  <Sparkles size={16} />
                </div>
              </motion.div>
            </div>
          </motion.div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            <ModeCard
              title="ABC"
              icon="🍎"
              color="bg-primary"
              onClick={() => handleModeClick("/learn/english")}
            />
          </motion.div>

          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <ModeCard
              title="123"
              icon="🔢"
              color="bg-secondary"
              onClick={() => handleModeClick("/learn/numbers")}
            />
          </motion.div>

          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <ModeCard
              title="اردو"
              icon="🌙"
              color="bg-accent"
              onClick={() => handleModeClick("/learn/urdu")}
            />
          </motion.div>
        </div>

        <footer className="mt-12 md:mt-20 text-center">
          <motion.div
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            className="inline-block px-6 md:px-8 py-2 md:py-3 bg-white/50 backdrop-blur-sm rounded-full border-2 border-white shadow-xl"
          >
            <div className="flex items-center gap-2 text-xs md:text-sm text-gray-500 font-bold font-modern">
              <span>Made with ❤️ for</span>
              <div className="flex items-center gap-1.5 ml-1">
                <motion.img
                  whileHover={{
                    scale: 4,
                    zIndex: 50,
                    boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.1)",
                  }}
                  whileTap={{ scale: 4, zIndex: 50 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  src="/assets/images/deer.jpeg"
                  alt="Deer"
                  className="w-6 h-6 md:w-7 md:h-7 rounded-full border-2 border-primary object-cover shadow-sm cursor-zoom-in relative z-10"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      "https://api.dicebear.com/7.x/avataaars/svg?seed=Deer";
                  }}
                />
                <span className="text-primary font-black">Deer</span>
              </div>
              <span className="mx-0.5">and</span>
              <div className="flex items-center gap-1.5">
                <motion.img
                  whileHover={{
                    scale: 4,
                    zIndex: 50,
                    boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.1)",
                  }}
                  whileTap={{ scale: 4, zIndex: 50 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  src="/assets/images/rafay.jpeg"
                  alt="Rafay"
                  className="w-6 h-6 md:w-7 md:h-7 rounded-full border-2 border-secondary object-cover shadow-sm cursor-zoom-in relative z-10"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      "https://api.dicebear.com/7.x/avataaars/svg?seed=Rafay";
                  }}
                />
                <span className="text-secondary font-black">Rafay</span>
              </div>
            </div>
          </motion.div>
        </footer>
      </div>

      {/* Grass/Floor decoration */}
      <div className="absolute bottom-0 left-0 w-full h-8 bg-linear-to-t from-primary/10 to-transparent" />
    </div>
  );
};
