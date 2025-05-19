import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      "/rest": {
        target: "https://jejuckl.kr",
        changeOrigin: true,
        secure: false,
      },
      "/api": {
        target: "http://101.55.20.4:8000",
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
