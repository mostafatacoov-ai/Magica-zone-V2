import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db/mongodb';
import { CampPhoto } from '@/lib/models/CampPhoto';
import fs from 'node:fs';
import path from 'node:path';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    await connectToDatabase();
    const dbPhotos = await CampPhoto.find({ isActive: true }).sort({ order: 1, createdAt: -1 }).lean();

    if (dbPhotos && dbPhotos.length > 0) {
      return NextResponse.json({
        success: true,
        photos: dbPhotos.map((p) => p.imageUrl),
        rawPhotos: dbPhotos,
        count: dbPhotos.length,
      });
    }

    // Fallback: Scan public/camp folder
    const campDir = path.join(process.cwd(), 'public', 'camp');
    let localPhotos: string[] = [];

    if (fs.existsSync(campDir)) {
      const files = fs.readdirSync(campDir);
      localPhotos = files
        .filter((f) => /\.(png|jpe?g|webp|avif|gif)$/i.test(f))
        .map((f) => `/camp/${f}`);
    }

    return NextResponse.json({
      success: true,
      photos: localPhotos.length > 0 ? localPhotos : ['/magica-camp-print.png'],
      rawPhotos: [],
      count: localPhotos.length,
    });
  } catch (error: any) {
    return NextResponse.json({ success: true, photos: ['/magica-camp-print.png'], rawPhotos: [], count: 0 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    await connectToDatabase();

    // Support both multiple batch photos array and single photo object
    if (Array.isArray(body.photos) && body.photos.length > 0) {
      const inserted = await CampPhoto.insertMany(body.photos);
      return NextResponse.json({ success: true, count: inserted.length, data: inserted }, { status: 201 });
    }

    if (Array.isArray(body)) {
      const inserted = await CampPhoto.insertMany(body);
      return NextResponse.json({ success: true, count: inserted.length, data: inserted }, { status: 201 });
    }

    const newPhoto = await CampPhoto.create(body);
    return NextResponse.json({ success: true, data: newPhoto }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}