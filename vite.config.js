import { sveltekit } from '@sveltejs/kit/vite'
import { defineConfig } from 'vite'
import dotenv from 'dotenv'

// Загрузка переменных окружения из .env файла для локальной разработки
dotenv.config()

export default defineConfig({
  plugins: [sveltekit()],
  define: {
    'process.env': process.env  // Передаём переменные окружения в приложение
  }
})
