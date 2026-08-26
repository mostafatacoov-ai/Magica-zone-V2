import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db/mongodb';
import { RadioTrack } from '@/lib/models/RadioTrack';

export async function GET(req: NextRequest) {
    try {
        await connectToDatabase();
        const { searchParams } = new URL(req.url);
        const all = searchParams.get('all') === 'true';

        // Public player only gets active tracks; Admin gets all
        const filter = all ? {} : { isActive: true };
        const tracks = await RadioTrack.find(filter).sort({ order: 1, createdAt: -1 }).lean();

        return NextResponse.json({ success: true, data: tracks });
    } catch (error: any) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        await connectToDatabase();

        const newTrack = await RadioTrack.create(body);
        return NextResponse.json({ success: true, data: newTrack }, { status: 201 });
    } catch (error: any) {
        return NextResponse.json({ success: false, error: error.message }, { status: 400 });
    }
}