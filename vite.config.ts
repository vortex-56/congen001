import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig(() => {
    return {
  // Use repository name as base for GitHub Pages, but support custom domain
  base: process.env.NODE_ENV === 'production' ? '/congen001/' : '/',
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      }
    };
});
