import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // irá ouvir em todas as portas, inclusive o IP 'público'
    proxy: { // exemplo de proxy
      '/api': 'http://localhost:5000',
      '/im': 'http://localhost:9000',
    },
  },
  build: {
    rollupOptions: {
      input: "index.html",
      output: {
        dir: "docs",
      },
    },
  },
})
