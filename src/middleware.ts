import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const locales = ['en', 'ar'];
const defaultLocale = 'en';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Extract current locale if present
  const currentLocale = locales.find(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  ) || defaultLocale;

  // 1. Admin Route Protection
  const isAdminRoute = pathname.includes('/admin') && !pathname.includes('/admin/login');
  if (isAdminRoute) {
    const adminSession = request.cookies.get('magica_admin_session')?.value;
    const authToken = request.cookies.get('magica_auth_token')?.value;

    if (!adminSession && !authToken) {
      const loginUrl = new URL(`/${currentLocale}/admin/login`, request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  // 2. Bilingual Locale Redirection for root "/"
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) return NextResponse.next();

  // Redirect root "/" to "/en"
  request.nextUrl.pathname = `/${defaultLocale}${pathname}`;
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|audio|supplies|uniform).*)'],
};