import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db/mongodb';
import { User } from '@/lib/models/User';
import bcrypt from 'bcryptjs';
import { signToken } from '@/lib/auth';

export async function POST(req: NextRequest) {
    try {
        const { usernameOrEmail, password } = await req.json();

        if (!usernameOrEmail || !password) {
            return NextResponse.json(
                { success: false, message: 'Please enter both username and password' },
                { status: 400 }
            );
        }

        const envAdminPasscode = process.env.ADMIN_PASSCODE || 'magica2026!';
        const isMasterAdmin =
            (usernameOrEmail.toLowerCase() === 'admin' || usernameOrEmail.toLowerCase() === 'admin@magica-group.com') &&
            password === envAdminPasscode;

        await connectToDatabase();

        // Check in database for registered admin
        let user = await User.findOne({
            $or: [
                { email: usernameOrEmail.toLowerCase() },
                { name: usernameOrEmail },
            ],
            role: 'admin',
        });

        // If master env credentials matched but DB user doesn't exist yet, auto-create
        if (isMasterAdmin && !user) {
            const salt = await bcrypt.genSalt(10);
            const passwordHash = await bcrypt.hash(envAdminPasscode, salt);
            user = await User.create({
                name: 'Magica Administrator',
                email: 'admin@magica-group.com',
                passwordHash,
                role: 'admin',
            });
        }

        if (!user && !isMasterAdmin) {
            return NextResponse.json(
                { success: false, message: 'Invalid admin username or credentials' },
                { status: 401 }
            );
        }

        // Verify password if DB user exists
        if (user && !isMasterAdmin) {
            const isValid = await bcrypt.compare(password, user.passwordHash);
            if (!isValid) {
                return NextResponse.json(
                    { success: false, message: 'Incorrect password' },
                    { status: 401 }
                );
            }
        }

        // Issue JWT Token with admin role
        const token = signToken({
            userId: user ? user._id.toString() : 'master-admin',
            email: user ? user.email : 'admin@magica-group.com',
            name: user ? user.name : 'Administrator',
            role: 'admin',
        });

        const response = NextResponse.json({
            success: true,
            message: 'Admin authenticated successfully',
            user: { name: user ? user.name : 'Admin', role: 'admin' },
        });

        // Set secure authentication cookies
        response.cookies.set('magica_auth_token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 60 * 60 * 24 * 7, // 7 days
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
    } catch (error: any) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}