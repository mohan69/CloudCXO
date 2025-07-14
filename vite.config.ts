import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    // Production optimizations
    minify: 'terser',
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          supabase: ['@supabase/supabase-js'],
          ui: ['@radix-ui/react-dialog', '@radix-ui/react-dropdown-menu', '@radix-ui/react-tabs'],
        },
      },
    },
    // Optimize chunk size
    chunkSizeWarningLimit: 1000,
  },
  server: {
    // Development server settings
    port: 3000,
    open: true,
  },
  preview: {
    port: 4173,
    host: true,
  },
  // Environment variables
  define: {
    __APP_VERSION__: JSON.stringify(process.env.npm_package_version),
  },
});