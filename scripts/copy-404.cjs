const fs = require('fs');
const path = require('path');

const public404 = path.resolve(__dirname, '..', 'public', '404.html');
const dist404 = path.resolve(__dirname, '..', 'dist', '404.html');
// CNAME handling removed - user requested publishing without CNAME

try {
  if (fs.existsSync(public404)) {
    fs.copyFileSync(public404, dist404);
    console.log('404.html copied from public/404.html (HashRouter SPA fallback)');
  } else {
    console.warn('public/404.html not found, skipping 404 creation');
  }
  // CNAME copy intentionally skipped
} catch (err) {
  console.error('Error creating 404.html:', err);
  process.exit(1);
}
