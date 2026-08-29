import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db/mongodb';
import { Inquiry } from '@/lib/models/Inquiry';
import { inquirySchema } from '@/lib/validations/inquiry';
import { sendInquiryEmails } from '@/lib/email';
import { z } from 'zod';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const validatedData = inquirySchema.parse(body);

    await connectToDatabase();
    const newInquiry = await Inquiry.create({
      ...validatedData,
      eventDate: validatedData.eventDate ? new Date(validatedData.eventDate) : undefined,
    });

    // Send email notifications asynchronously without blocking the user response
    sendInquiryEmails(newInquiry.toObject()).catch((err) =>
      console.warn('[Email Notification Notice]', err.message)
    );

    return NextResponse.json(
      {
        success: true,
        message: 'Reservation submitted successfully',
        data: newInquiry,
      },
      { status: 201 }
    );
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, errors: error.flatten().fieldErrors, message: 'Invalid data format' },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { success: false, message: error.message || 'Internal Server Error' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    await connectToDatabase();
    const inquiries = await Inquiry.find().sort({ createdAt: -1 }).lean();
    return NextResponse.json({ success: true, data: inquiries });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}