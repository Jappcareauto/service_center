import react from "@vitejs/plugin-react-swc";
import { resolve } from "path";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
    },
  },
  define: {
    global: "window",
  },
  server: {
    proxy: {
      "/ws": {
        target: "https://bpi.jappcare.com",
        changeOrigin: true,
        secure: false,
        ws: true,
      },
    },
  },
});
