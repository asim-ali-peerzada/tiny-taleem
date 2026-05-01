/* eslint-disable @typescript-eslint/prefer-node-protocol */
import { Buffer } from "buffer";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// Polyfill Buffer for @react-pdf/renderer
declare global {
  var Buffer: typeof import("buffer").Buffer;
}

if (typeof globalThis !== "undefined") {
  const globalWithBuffer = globalThis as unknown as {
    Buffer: typeof Buffer;
  };
  globalWithBuffer.Buffer = globalWithBuffer.Buffer || Buffer;
}

const container = document.getElementById("root");
if (container) {
  createRoot(container).render(
    <StrictMode>
      <App />
    </StrictMode>,
  );
}
