
import { resolve } from 'path'
import { defineConfig } from "vite";
import react from '@vitejs/plugin-react';
export default defineConfig({
  plugins: [react()],
  base: "./",
  build: {
    // minify: false,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        charts: resolve(__dirname, 'charts/index.html'),
        layout: resolve(__dirname, 'layout/index.html'),
      },
    },
  },
});
