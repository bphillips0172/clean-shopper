import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import process from 'node:process'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  // GitHub Pages serves the app from /clean-shopper/; locally it stays at /.
  base: process.env.GITHUB_PAGES ? '/clean-shopper/' : '/',
})
