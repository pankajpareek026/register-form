import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'


export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://form-1cx0.onrender.com',
        changeOrigin: true,
        secure: false,
      }
    }
  }
})
