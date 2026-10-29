import { defineConfig } from "vite";

export default defineConfig({
  plugins: [],
  server: {
    host: "0.0.0.0",
    port: 3000,
    strictPort: true,
    hmr: {
      port: 3000,
    },
  },
  build: {
    rollupOptions: {
      input: {
        main: './index.html'
      }
    }
  }
});
