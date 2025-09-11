import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig(() => {
    return {
      // base is required when deploying a project site to GitHub Pages under a repository
      // so asset URLs are prefixed correctly (e.g. /congen001/assets/...)
      base: '/congen001/',
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      }
    };
});
