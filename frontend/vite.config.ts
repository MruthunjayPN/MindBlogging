import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from "path"
import tailwindcss from "@tailwindcss/vite"

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    chunkSizeWarningLimit: 800,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: [
            'react',
            'react-dom',
            '@tanstack/react-router',
            '@tanstack/react-query',
            'axios',
            'framer-motion'
          ],
          ui: [
            '@radix-ui/react-avatar',
            '@radix-ui/react-dialog',
            '@radix-ui/react-dropdown-menu',
            '@radix-ui/react-label',
            '@radix-ui/react-separator',
            '@radix-ui/react-slot',
            '@radix-ui/react-toast'
          ]
        }
      }
    }
  }
})
