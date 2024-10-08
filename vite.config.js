import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path';


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@/*': path.resolve(__dirname, 'src'),
      '@/utils': path.resolve(__dirname, 'src/utils'),
      '@/api': path.resolve(__dirname, 'src/api'),
      // You can add more aliases here
    },
  },
})
