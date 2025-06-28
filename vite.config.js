import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      "@assets": path.resolve(__dirname, "attached_assets"),
    },
  },

  server: {
    host: "localhost",         // safer for local dev
    port: 5000,
    strictPort: true,          // fail if port is busy
    watch: {
      ignored: ["**/node_modules/**", "**/dist/**"], // avoid watching junk
    },
  },

  build: {
    outDir: "dist",
    emptyOutDir: true,
  },
});
