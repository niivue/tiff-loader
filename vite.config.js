import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
  root: '.',
  server: {
    open: '/src/index.html'
  },
  plugins: [],
  worker: {
    format: 'es'
  }
})
