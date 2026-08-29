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

        const cleanInput = usernameOrEmail.trim().toLowerCase();
        const envAdminPasscode = process.env.ADMIN_PASSCODE || 'magica2026!';

        // 1. Direct Master Admin Check (Works even during DB latency)
        const isMasterCredentials =
            (cleanInput === 'admin' || cleanInput === 'admin@magica-group.com') &&
            password === envAdminPasscode;

        if (isMasterCredentials) {
            const token = signToken({
                userId: 'master-admin-01',
                email: 'admin@magica-group.com',
                name: 'Magica Administrator',
                role: 'admin',
            });

            const response = NextResponse.json({
                success: true,
                message: 'Admin authenticated successfully',
                user: { name: 'Magica Administrator', email: 'admin@magica-group.com', role: 'admin' },
            });

            // Set cookie for both local and production HTTPS
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

            // Synchronize admin account in MongoDB in background
            connectToDatabase()
                .then(async () => {
                    const existing = await User.findOne({ email: 'admin@magica-group.com' });
                    if (!existing) {
                        const salt = await bcrypt.genSalt(10);
                        const passwordHash = await bcrypt.hash(envAdminPasscode, salt);
                        await User.create({
                            name: 'Magica Administrator',
                            email: 'admin@magica-group.com',
                            passwordHash,
                            role: 'admin',
                        });
                    }
                })
                .catch((e) => console.warn('[Admin Sync Notice]', e.message));

            return response;
        }

        // 2. Database User Check (for staff/coaches with admin role)
        await connectToDatabase();
        const user = await User.findOne({
            $or: [{ email: cleanInput }, { name: usernameOrEmail.trim() }],
            role: 'admin',
        });

        if (!user) {
            return NextResponse.json(
                { success: false, message: 'Invalid admin credentials' },
                { status: 401 }
            );
        }

        const isValid = await bcrypt.compare(password, user.passwordHash);
        if (!isValid) {
            return NextResponse.json(
                { success: false, message: 'Incorrect password' },
                { status: 401 }
            );
        }

        const token = signToken({
            userId: user._id.toString(),
            email: user.email,
            name: user.name,
            role: user.role,
        });

        const response = NextResponse.json({
            success: true,
            user: { name: user.name, email: user.email, role: user.role },
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
    } catch (error: any) {
        return NextResponse.json(
            { success: false, message: error.message || 'Authentication error' },
            { status: 500 }
        );
    }
}