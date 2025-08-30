import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { copyFileSync, mkdirSync } from 'fs'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    {
      name: 'copy-data',
      writeBundle() {
        try {
          mkdirSync('dist/data', { recursive: true })
          copyFileSync('public/data/servers.json', 'dist/data/servers.json')
          console.log('✅ Copied servers.json to dist/data/')
        } catch (error) {
          console.error('❌ Failed to copy servers.json:', error)
        }
      }
    }
  ],
  // Keep base path for correct asset loading on GitHub Pages
  base: '/network-mcp-hub/',
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  publicDir: 'public',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          router: ['react-router-dom'],
        },
      },
    },
  },
})
