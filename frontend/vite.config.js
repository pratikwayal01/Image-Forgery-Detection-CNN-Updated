import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  base: '/static/', // This applies to production builds and sets asset URLs correctly
  plugins: [react()],
  server: {
    port: 3000,
    host: true,
    allowedHosts: ['image-forgery-detection-cnn-updated.onrender.com'],
    proxy: {
      "/api": {
        target: process.env.VITE_API_URL || "http://localhost:5000", // Update target to match your Flask backend port
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
});
