import { defineConfig } from 'vite'
import path from 'path'
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
})
