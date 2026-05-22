import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

 export default defineConfig({
  plugins: [react()],
  base: '/Figma-Nikita-Isdo35/', // <-- Добавьте эту строку
})