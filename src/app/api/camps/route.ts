import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db/mongodb';
import { CampProgram } from '@/lib/models/CampProgram';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const all = searchParams.get('all') === 'true';

    await connectToDatabase();
    const filter = all ? {} : { isActive: true };
    const camps = await CampProgram.find(filter).sort({ order: 1, createdAt: -1 }).lean();

    return NextResponse.json({ success: true, data: camps });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    await connectToDatabase();
    const newCamp = await CampProgram.create(body);
    return NextResponse.json({ success: true, data: newCamp }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}