import { sveltekit } from '@sveltejs/kit/vite'
import { defineConfig } from 'vite'
import dotenv from 'dotenv'

dotenv.config()  // загружаем переменные окружения из .env

export default defineConfig({
  plugins: [sveltekit()],
  define: {
    'process.env': process.env  // передаём переменные окружения
  }
})
