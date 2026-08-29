import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db/mongodb';
import { CampPhoto } from '@/lib/models/CampPhoto';

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectToDatabase();
    await CampPhoto.findByIdAndDelete(params.id);
    return NextResponse.json({ success: true, message: 'Photo deleted' });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}