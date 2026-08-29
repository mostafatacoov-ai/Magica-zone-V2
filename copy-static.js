const fs = require('fs');
const path = require('path');

const src = path.join(__dirname, '.next', 'static');
const dest = path.join(__dirname, 'public', '_next', 'static');

try {
  // Remove the old directory if it exists to prevent stale files
  if (fs.existsSync(dest)) {
    fs.rmSync(dest, { recursive: true, force: true });
  }
  
  // Ensure the destination directory exists
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  
  // Copy the new static files
  fs.cpSync(src, dest, { recursive: true });
  console.log('✅ Successfully copied .next/static to public/_next/static for Hostinger compatibility.');
} catch (error) {
  console.error('❌ Error copying static files:', error);
}
