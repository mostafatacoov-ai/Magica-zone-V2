import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db/mongodb';
import { User } from '@/lib/models/User';
import bcrypt from 'bcryptjs';
import { signToken } from '@/lib/auth';

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ success: false, message: 'Email and password required' }, { status: 400 });
    }
    const cleanEmail = email.trim().toLowerCase();
    const envAdminPasscode = process.env.ADMIN_PASSCODE || 'magica2026!';

    if ((cleanEmail === 'admin' || cleanEmail === 'admin@magica-group.com') && password === envAdminPasscode) {
      const token = signToken({
        userId: 'master-admin-01',
        email: 'admin@magica-group.com',
        name: 'Magica Administrator',
        role: 'admin',
      });

      const response = NextResponse.json({
        success: true,
        data: { id: 'master-admin-01', name: 'Magica Administrator', email: 'admin@magica-group.com', role: 'admin' },
      });

      response.cookies.set('magica_auth_token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 7,
        path: '/',
      });

      response.cookies.set('magica_admin_session', 'authenticated', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 7,
        path: '/',
      });

      return response;
    }

    await connectToDatabase();
    const user = await User.findOne({ email: cleanEmail });
    if (!user) {
      return NextResponse.json({ success: false, message: 'Invalid credentials' }, { status: 401 });
    }

    const isValid = await bcrypt.compare(password, user.passwordHash);
    if (!isValid) {
      return NextResponse.json({ success: false, message: 'Invalid credentials' }, { status: 401 });
    }

    const token = signToken({
      userId: user._id.toString(),
      email: user.email,
      name: user.name,
      role: user.role,
    });

    const response = NextResponse.json({
      success: true,
      data: { id: user._id, name: user.name, email: user.email, role: user.role },
    });

    response.cookies.set('magica_auth_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7,
      path: '/',
    });

    return response;
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}