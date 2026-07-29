import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

const AUTH_SECRET = process.env.NEXTAUTH_SECRET || 'f7bc639103590e73cc0aa00586e419961a619fdc00f123a385b7f77b228b4abc';

export async function middleware(request) {
  const { pathname } = request.nextUrl;

  // Protect admin routes
  if (pathname.startsWith('/admin')) {
    try {
      // First try default getToken auto-detection with fallback secret
      let token = await getToken({
        req: request,
        secret: AUTH_SECRET,
      });

      // If token not found, try explicit __Secure cookie name for production HTTPS
      if (!token) {
        token = await getToken({
          req: request,
          secret: AUTH_SECRET,
          cookieName: '__Secure-next-auth.session-token',
        });
      }

      // If token still not found, try standard session-token
      if (!token) {
        token = await getToken({
          req: request,
          secret: AUTH_SECRET,
          cookieName: 'next-auth.session-token',
        });
      }

      if (!token) {
        const loginUrl = new URL('/login', request.url);
        loginUrl.searchParams.set('callbackUrl', pathname);
        return NextResponse.redirect(loginUrl);
      }
    } catch (error) {
      console.error('Middleware auth error:', error.message);
      const loginUrl = new URL('/login', request.url);
      loginUrl.searchParams.set('callbackUrl', pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
