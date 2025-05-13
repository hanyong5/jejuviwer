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
        // 필요시 아래 주석 해제
        // rewrite: (path) => path.replace(/^\/rest/, '/rest'),
      },
    },
  },
});
