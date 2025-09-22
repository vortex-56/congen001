const fs = require('fs');
const path = require('path');

const distIndex = path.resolve(__dirname, '..', 'dist', 'index.html');
const dist404 = path.resolve(__dirname, '..', 'dist', '404.html');
const srcCname = path.resolve(__dirname, '..', 'CNAME');
const distCname = path.resolve(__dirname, '..', 'dist', 'CNAME');

try {
  if (fs.existsSync(distIndex)) {
    fs.copyFileSync(distIndex, dist404);
    console.log('404.html created from index.html');
  } else {
    console.warn('index.html not found in dist/, skipping 404 creation');
  }
  // Copy CNAME into dist/ so gh-pages publishes custom domain
  try {
    if (fs.existsSync(srcCname)) {
      fs.copyFileSync(srcCname, distCname);
      console.log('CNAME copied to dist/');
    } else {
      console.warn('CNAME not found in project root, skipping CNAME copy');
    }
  } catch (err) {
    console.error('Error copying CNAME to dist/:', err);
  }
} catch (err) {
  console.error('Error creating 404.html:', err);
  process.exit(1);
}
