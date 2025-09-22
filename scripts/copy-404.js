const fs = require('fs');
const path = require('path');

const distIndex = path.resolve(__dirname, '..', 'dist', 'index.html');
const dist404 = path.resolve(__dirname, '..', 'dist', '404.html');

try {
  if (fs.existsSync(distIndex)) {
    fs.copyFileSync(distIndex, dist404);
    console.log('404.html created from index.html');
  } else {
    console.warn('index.html not found in dist/, skipping 404 creation');
  }
} catch (err) {
  console.error('Error creating 404.html:', err);
  process.exit(1);
}
