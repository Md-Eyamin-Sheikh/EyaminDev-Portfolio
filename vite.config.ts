import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    chunkSizeWarningLimit: 2100,
    rollupOptions: {
      output: {
        manualChunks: {
          three: ["three"],
          "r3f-fiber": ["@react-three/fiber"],
          "r3f-drei": ["@react-three/drei"],
          "r3f-rapier": ["@react-three/rapier"],
          "r3f-postprocessing": ["@react-three/postprocessing"],
        },
      },
    },
  },
});
