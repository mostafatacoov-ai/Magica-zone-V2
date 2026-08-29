import { NextResponse } from 'next/server';
import fs from 'node:fs';
import path from 'node:path';

export async function GET() {
  try {
    const campDir = path.join(process.cwd(), 'public', 'camp');
    let photoUrls: string[] = [];

    // 1. Scan public/camp folder
    if (fs.existsSync(campDir)) {
      const files = fs.readdirSync(campDir);
      photoUrls = files
        .filter((f) => /\.(png|jpe?g|webp|avif|gif)$/i.test(f))
        .map((f) => `/camp/${f}`);
    }

    // 2. Also check public/ root for numbered or camp images (e.g. 1.jpg, camp-1.jpg)
    if (photoUrls.length === 0) {
      const publicDir = path.join(process.cwd(), 'public');
      if (fs.existsSync(publicDir)) {
        const files = fs.readdirSync(publicDir);
        photoUrls = files
          .filter((f) => /^(camp|\d+|kid).*\.(png|jpe?g|webp)$/i.test(f))
          .map((f) => `/${f}`);
      }
    }

    // 3. Fallback standard list
    const fallbackList = [
      '/camp/1.jpg', '/camp/2.jpg', '/camp/3.jpg', '/camp/4.jpg',
      '/camp/5.jpg', '/camp/6.jpg', '/camp/7.jpg', '/camp/8.jpg',
      '/camp/9.jpg', '/camp/10.jpg', '/camp/11.jpg', '/camp/12.jpg'
    ];

    return NextResponse.json({
      success: true,
      photos: photoUrls.length > 0 ? photoUrls : fallbackList,
    });
  } catch (error: any) {
    return NextResponse.json({
      success: true,
      photos: [
        '/camp/1.jpg', '/camp/2.jpg', '/camp/3.jpg', '/camp/4.jpg',
        '/camp/5.jpg', '/camp/6.jpg', '/camp/7.jpg', '/camp/8.jpg'
      ],
    });
  }
}