import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// base './' para o build funcionar em qualquer pasta do servidor (ex.: Hostinger)
export default defineConfig({
  base: './',
  plugins: [react()],
})
