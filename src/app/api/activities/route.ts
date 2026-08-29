import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db/mongodb';
import { Activity } from '@/lib/models/Activity';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const all = searchParams.get('all') === 'true';

    await connectToDatabase();
    const filter = all ? {} : { isActive: true };
    const activities = await Activity.find(filter).sort({ createdAt: -1 }).lean();

    return NextResponse.json({
      success: true,
      data: activities,
      count: activities.length,
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    await connectToDatabase();
    const newActivity = await Activity.create(body);
    return NextResponse.json({ success: true, data: newActivity }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}