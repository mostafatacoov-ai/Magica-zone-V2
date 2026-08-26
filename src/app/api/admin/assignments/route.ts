import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db/mongodb';
import { User } from '@/lib/models/User';

// List all student submissions across all courses
export async function GET() {
  try {
    await connectToDatabase();
    const usersWithSubmissions = await User.find(
      { 'submissions.0': { $exists: true } },
      { name: 1, email: 1, phone: 1, submissions: 1 }
    ).lean();

    const allSubmissions: any[] = [];
    usersWithSubmissions.forEach((user) => {
      user.submissions?.forEach((sub) => {
        allSubmissions.push({
          submissionId: sub._id,
          userId: user._id,
          studentName: user.name,
          studentEmail: user.email,
          studentPhone: user.phone,
          courseTitle: sub.courseTitle,
          assignmentTitle: sub.assignmentTitle,
          fileOrUrl: sub.fileOrUrl,
          notes: sub.notes,
          submittedAt: sub.submittedAt,
          status: sub.status,
        });
      });
    });

    // Sort newest first
    allSubmissions.sort((a, b) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime());

    return NextResponse.json({ success: true, data: allSubmissions });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

// Update submission status (reviewed / graded)
export async function PATCH(req: NextRequest) {
  try {
    const { userId, submissionId, status, notes } = await req.json();

    await connectToDatabase();
    const updated = await User.updateOne(
      { _id: userId, 'submissions._id': submissionId },
      {
        $set: {
          'submissions.$.status': status,
          ...(notes ? { 'submissions.$.notes': notes } : {}),
        },
      }
    );

    return NextResponse.json({ success: true, data: updated });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}