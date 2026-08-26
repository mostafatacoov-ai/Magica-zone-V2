import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { passcode } = await req.json();
    const correctPasscode = process.env.ADMIN_PASSCODE || 'magica2026!';

    if (passcode !== correctPasscode) {
      return NextResponse.json({ success: false, message: 'Invalid Admin Passcode' }, { status: 401 });
    }

    const response = NextResponse.json({ success: true, message: 'Authenticated' });
    response.cookies.set('magica_admin_session', 'authenticated', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: '/',
    });

    return response;
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function DELETE() {
  const response = NextResponse.json({ success: true, message: 'Logged out' });
  response.cookies.delete('magica_admin_session');
  return response;
}