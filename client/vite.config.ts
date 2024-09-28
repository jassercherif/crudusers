import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',  // Permet d'écouter sur toutes les adresses IP
    port: 5173,        // Vous pouvez spécifier le port ici si nécessaire
  },
})
