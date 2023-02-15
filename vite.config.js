
import { resolve } from 'path'
import { defineConfig } from "vite";
export default defineConfig({
  base: "./",
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        charts: resolve(__dirname, 'charts/index.html'),
      },
    },
  },
});
