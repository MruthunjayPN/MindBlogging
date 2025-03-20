import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import path from "path"
import tailwindcss from "@tailwindcss/vite"

export default defineConfig(({ mode }) => {
  // If you don't need env variables, remove this line entirely
  // If you need them, use them in the config like this:
  const env = loadEnv(mode, process.cwd(), '')
  console.log('Loaded environment variables:', env) // For debugging
  return {
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
    },
    server: {
      port: 5173,
      host: true,
    },
    preview: {
      port: 5173,
      host: true,
    }
  }
})
