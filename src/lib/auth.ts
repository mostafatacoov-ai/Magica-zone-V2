import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';

const JWT_SECRET = process.env.JWT_SECRET || 'magica_super_secret_jwt_key_2026';

export interface AuthTokenPayload {
  userId: string;
  email: string;
  name: string;
  role: string;
}

export function signToken(payload: AuthTokenPayload): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });
}

export function verifyToken(token: string): AuthTokenPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as AuthTokenPayload;
  } catch (error) {
    return null;
  }
}

export function getSessionUser(): AuthTokenPayload | null {
  const cookieStore = cookies();
  const token = cookieStore.get('magica_auth_token')?.value;
  if (!token) return null;
  return verifyToken(token);
}