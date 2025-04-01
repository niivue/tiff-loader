import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
  root: '.',
  base: './',
  publicDir: 'public',
  server: {
    open: '/src/index.html'
  },
  plugins: [],
  worker: {
    format: 'es'
  }
})
