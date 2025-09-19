import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig(() => {
    return {
  // Use the repository name as base for GitHub Pages
  // This ensures assets load correctly when deployed to username.github.io/repo
  base: '/congen001/',
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      }
    };
});
