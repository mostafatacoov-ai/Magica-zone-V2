import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db/mongodb';
import { User } from '@/lib/models/User';
import { getSessionUser } from '@/lib/auth';

export async function GET() {
  try {
    const session = getSessionUser();
    if (!session) {
      return NextResponse.json({ success: false, user: null }, { status: 200 });
    }

    await connectToDatabase();
    const user = await User.findById(session.userId).select('-passwordHash').lean();

    if (!user) {
      return NextResponse.json({ success: false, user: null }, { status: 404 });
    }

    return NextResponse.json({ success: true, user });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}