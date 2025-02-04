import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '',
  publicDir: 'public',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    emptyOutDir: true,
    copyPublicDir: true,
    rollupOptions: {
      output: {
        assetFileNames: (assetInfo) => {
          if (assetInfo.name.endsWith('.png') || 
              assetInfo.name.endsWith('.jpg') || 
              assetInfo.name.endsWith('.svg')) {
            return `${assetInfo.name}`
          }
          return 'assets/[name]-[hash][extname]'
        },
      },
    },
  },
  server: {
    port: 3000,
    host: true,
  },
}) 