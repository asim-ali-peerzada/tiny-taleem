import { useCallback } from "react";

export const useAudio = () => {
  const playSound = useCallback((text: string) => {
    if (!text) return;

    // Detect Urdu characters
    const isUrdu = /[\u0600-\u06FF]/.test(text);

    // Using Vite's environment variable system
    const API_KEY = import.meta.env.VITE_VOICERSS_API_KEY;

    if (!API_KEY) {
      console.warn(
        "VoiceRSS API Key is missing. Please add VITE_VOICERSS_API_KEY to your .env file.",
      );
      return;
    }

    const language = isUrdu ? "ur-pk" : "en-us";

    // VoiceRSS URL that returns an MP3 stream safely
    const url = `https://api.voicerss.org/?key=${API_KEY}&hl=${language}&src=${encodeURIComponent(text)}&f=44khz_16bit_stereo&c=mp3`;

    // Create and play the audio element dynamically
    const audio = new Audio(url);
    audio.play().catch((err) => console.error("VoiceRSS failed:", err));
  }, []);

  return { playSound };
};
