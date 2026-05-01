import { AnimatePresence, motion } from "framer-motion";
import {
  Cloud,
  CloudLightning,
  CloudRain,
  CloudSnow,
  Sun,
  Wind,
} from "lucide-react";
import React from "react";
import { useWeather } from "../hooks/useWeather";

export const WeatherWidget: React.FC = () => {
  const { temp, location, condition, loading, error } = useWeather();

  const getIcon = () => {
    switch (condition) {
      case "cloudy":
        return <Cloud className="text-blue-400" size={32} />;
      case "rainy":
        return <CloudRain className="text-blue-600" size={32} />;
      case "snowy":
        return <CloudSnow className="text-white" size={32} />;
      case "stormy":
        return <CloudLightning className="text-yellow-500" size={32} />;
      case "foggy":
        return <Wind className="text-gray-400" size={32} />;
      default:
        return <Sun className="text-yellow-400" size={32} />;
    }
  };

  if (error) return null;

  return (
    <AnimatePresence>
      {!loading && !error && (
        <motion.div
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="relative inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/80 backdrop-blur-md border border-white/50 shadow-sm"
        >
          <div className="flex items-center gap-2">
            {getIcon()}
            <div className="flex flex-col">
              <span className="text-xs font-bold text-gray-700 leading-none">
                {location}
              </span>
              <span className="text-[10px] text-gray-500 font-medium uppercase">
                {condition}
              </span>
            </div>
          </div>

          <div className="w-px h-6 bg-gray-200" />

          <span className="text-xl font-black font-rounded text-primary">
            {temp}°
          </span>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
