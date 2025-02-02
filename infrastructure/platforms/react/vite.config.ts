import { defineConfig } from 'vite'
import path from "path";
import react from '@vitejs/plugin-react'
import tailwindcss from "tailwindcss";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  css: {
    postcss: {
        plugins: [tailwindcss()],
    },   
  }, 
  server: {
    host: '0.0.0.0',
    port: 5173,
    // Ajoutez watch si vous avez des problèmes avec le hot reload
    watch: {
      usePolling: true
    }
  }
})