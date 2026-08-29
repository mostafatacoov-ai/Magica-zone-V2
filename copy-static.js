const fs = require('fs');
const path = require('path');

function copyDirRecursive(src, dest) {
  if (!fs.existsSync(src)) return;
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }

  const entries = fs.readdirSync(src, { withFileTypes: true });

  for (let entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      copyDirRecursive(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

const root = process.cwd();
const nextStatic = path.join(root, '.next', 'static');

// 1. Copy into public/_next/static (Accessible directly by Apache without dot-folder blocks)
const publicNextStatic = path.join(root, 'public', '_next', 'static');
copyDirRecursive(nextStatic, publicNextStatic);

// 2. Copy into root _next/static
const rootNextStatic = path.join(root, '_next', 'static');
copyDirRecursive(nextStatic, rootNextStatic);

console.log('✅ Successfully copied .next/static to public/_next/static for Hostinger');