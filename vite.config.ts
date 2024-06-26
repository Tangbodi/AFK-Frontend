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
        target: 'http://31.220.21.110:8180',
        // target: 'http://44.217.134.78:8180',
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
