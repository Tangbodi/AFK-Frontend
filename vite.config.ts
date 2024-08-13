import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, './src')
    }
  },
  server: {
    proxy: {
      '/api/v1/': {
        target: 'http://167.71.89.177:8180',
        changeOrigin: true, // 允许跨域
        // rewrite: path => path.replace('/v1/', '/'),
      },
    },
  },
  build: {
    reportCompressedSize: false,
    sourcemap: false,
    commonjsOptions: {
      ignoreTryCatch: false,
    },
  },
})
