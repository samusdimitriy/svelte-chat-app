import adapter from '@sveltejs/adapter-vercel'

export default {
  kit: {
    adapter: adapter(),
    prerender: {
      handleMissingId: 'warn' // Это позволит игнорировать ошибки 404 при пререндеринге
    }
  }
}
