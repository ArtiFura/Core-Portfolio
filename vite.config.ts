import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig(({ command }) => {
  // If repository is under GitHub Pages (e.g. /Core-Portfolio/), resolve repository name or env var
  const repoName = process.env.GITHUB_REPOSITORY
    ? `/${process.env.GITHUB_REPOSITORY.split('/')[1]}/`
    : '/Core-Portfolio/'

  return {
    plugins: [react()],
    base: command === 'serve' ? '/' : (process.env.VITE_BASE_PATH || repoName),
  }
})

