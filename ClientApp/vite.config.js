import { defineConfig } from "vite";
import { resolve } from "node:path";

export default defineConfig({
  base: "/dist/",
  build: {
    outDir: resolve(import.meta.dirname, "../wwwroot/dist"),
    emptyOutDir: true,
    rollupOptions: {
      input: resolve(import.meta.dirname, "src/main.jsx"),
      output: {
        entryFileNames: "app.js",
        assetFileNames: "[name][extname]"
      }
    }
  }
});
