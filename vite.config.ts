import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      // Whenever our React app requests /google-tts...
      "/google-tts": {
        target: "https://translate.google.com",
        changeOrigin: true, // This is what bypasses CORS/ORB
        rewrite: (path) => path.replace(/^\/google-tts/, ""),
      },
    },
  },
});
