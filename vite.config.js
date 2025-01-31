import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(() => {
  return {
    build: {
      outDir: "build",
    },
    plugins: [react()],
    optimizeDeps: {
      exclude: ["chunk-D3Q5544B.js"],
    },
  };
});
