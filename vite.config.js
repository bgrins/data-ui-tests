import { resolve } from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
export default defineConfig({
  plugins: [react()],
  base: "./",
  build: {
    // https://github.com/vitejs/vite/issues/2433
    // Attempting to fix errors like https://github.com/bgrins/data-ui-tests/actions/runs/4350881786/jobs/7602010504
    // sourcemap: false,
    // minify: false,
    rollupOptions: {
      // cache: false,
      // maxParallelFileOps: 2,
      // output: {
      //   sourcemap: false,
      //   manualChunks: (id) => {
      //    if (id.includes('node_modules')) {
      //       return 'vendor';
      //     }
      //   },
      // },
      input: {
        main: resolve(__dirname, "index.html"),
        charts: resolve(__dirname, "charts/index.html"),
        layout: resolve(__dirname, "layout/index.html"),
      },
    },
  },
});
