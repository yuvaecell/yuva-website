import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // pdfjs-dist uses ESM-only internals that Vite's pre-bundler can't handle
  optimizeDeps: {
    exclude: ['pdfjs-dist'],
  },
})
