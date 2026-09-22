import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
export default defineConfig({
  plugins: [react()],
  server: { port: 5173, strictPort: true },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("/src/data/")) return "lens-data";
          if (id.includes("/node_modules/")) return "vendor";
        },
      },
    },
  },
});
