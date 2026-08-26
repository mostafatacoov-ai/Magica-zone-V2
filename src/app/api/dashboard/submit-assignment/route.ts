import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db/mongodb';
import { User } from '@/lib/models/User';
import { getSessionUser } from '@/lib/auth';

export async function POST(req: NextRequest) {
  try {
    const session = getSessionUser();
    if (!session) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }

    const { courseTitle, assignmentTitle, fileOrUrl, notes } = await req.json();

    await connectToDatabase();
    const updated = await User.findByIdAndUpdate(
      session.userId,
      {
        $push: {
          submissions: {
            courseTitle,
            assignmentTitle,
            fileOrUrl,
            notes,
            submittedAt: new Date(),
            status: 'submitted',
          },
        },
      },
      { new: true }
    );

    return NextResponse.json({ success: true, data: updated });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}