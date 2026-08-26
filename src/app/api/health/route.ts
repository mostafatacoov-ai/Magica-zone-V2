import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db/mongodb';

export async function GET() {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    return NextResponse.json(
      {
        status: 'error',
        message: 'MONGODB_URI is not defined in process.env',
        envKeys: Object.keys(process.env).filter((k) => !k.startsWith('npm_')),
      },
      { status: 500 }
    );
  }

  try {
    await connectToDatabase();
    return NextResponse.json({
      status: 'ok',
      database: 'connected',
      timestamp: new Date().toISOString(),
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        status: 'error',
        message: error.message || 'Database connection error',
      },
      { status: 500 }
    );
  }
}