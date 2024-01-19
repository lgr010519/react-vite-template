import path from 'path'

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

import scssVariables from './src/assets/styles/variables.scss.js'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: Object.keys(scssVariables)
          .map((k) => `$${k}: ${scssVariables[k]};`)
          .join('\n'),
      },
    },
  },
  esbuild: {
    pure: ['console.log'],
    minify: true,
  },
  server: {
    host: '0.0.0.0',
  },
})
