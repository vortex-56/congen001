import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig(() => {
    return {
  // Use root path for custom domain, GitHub Pages handles repo routing automatically
  base: '/',
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      }
    };
});
