import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig(() => {
    return {
  // Use a relative base so built asset URLs are relative to the current path.
  // This makes the production build work both on a custom domain (site root)
  // and on a GitHub Pages project site (username.github.io/repo) without
  // requiring different builds. If you prefer absolute-root assets instead,
  // change this back to '/' or '/congen001/' and rebuild.
  base: './',
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      }
    };
});
