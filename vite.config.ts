import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/CloudCXO/",
  plugins: [react()],
  resolve: {
    alias: {
      // The original `path.resolve(__dirname, ...)` is for CommonJS.
      // Since your project is an ES Module ("type": "module" in package.json),
      // this is the correct way to define a path alias.
      "@": path.resolve(process.cwd(), "src"),
    },
  },
});

