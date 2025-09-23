import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig(() => {
    return {
  // Use root path for custom domain (congen.com.pe)
  // Changed from '/congen001/' to '/' for custom domain deployment
  base: '/',
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      }
    };
});
