import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  build: {
    outDir: "dist",
    emptyOutDir: true,
  },
  resolve: {
    alias: {
      "@": path.resolve(process.cwd(), "./src"),
      "@assets": path.resolve(process.cwd(), "./attached_assets"),
    },
  },
  server: {
    host: '0.0.0.0',
    port: 5000,
    allowedHosts: 'all'
  },
  plugins: [react()],
});