import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 5173,
    // Ajoutez watch si vous avez des problèmes avec le hot reload
    watch: {
      usePolling: true
    }
  }
})