const fs = require('fs');
const path = require('path');

const src = path.join(__dirname, '.next', 'static');
const dest = path.join(__dirname, 'public', '_next', 'static');

function copyRecursiveSync(src, dest) {
  const exists = fs.existsSync(src);
  const stats = exists && fs.statSync(src);
  const isDirectory = exists && stats.isDirectory();
  if (isDirectory) {
    if (!fs.existsSync(dest)) {
      fs.mkdirSync(dest, { recursive: true });
    }
    fs.readdirSync(src).forEach(function(childItemName) {
      copyRecursiveSync(path.join(src, childItemName), path.join(dest, childItemName));
    });
  } else {
    fs.copyFileSync(src, dest);
  }
}

try {
  // Remove the old directory if it exists to prevent stale files
  if (fs.existsSync(dest)) {
    fs.rmSync(dest, { recursive: true, force: true });
  }
  
  if (fs.existsSync(src)) {
    // Copy the new static files safely across any Node version
    copyRecursiveSync(src, dest);
    console.log('✅ Successfully copied .next/static to public/_next/static for Hostinger compatibility.');
  } else {
    console.warn('⚠️ .next/static does not exist. Did Next.js build correctly?');
  }
} catch (error) {
  console.error('❌ Error copying static files:', error);
  process.exit(1); // Fail the build so we know if this script breaks
}
