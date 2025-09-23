import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig(() => {
    return {
  // Use relative paths for GitHub Pages deployment
  base: './',
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      }
    };
});
