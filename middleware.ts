import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Minimal role-aware redirect. Auth state lives in localStorage (client),
// so this only handles obvious public/private hygiene; deep guards stay
// in ProtectedRoute / AuthWrapper components.
const PUBLIC_PREFIXES = ['/', '/register', '/client-login', '/client-register', '/get-started', '/consultant', '/unauthorized'];

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  // Allow Next internals and assets through
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api/') ||
    pathname.includes('.')
  ) {
    return NextResponse.next();
  }
  // Keep admin/lawyer/client areas reachable; client-side guards redirect
  // when no token is present. This file exists so tsconfig's
  // ../middleware.ts include resolves and future server auth can hook in.
  const isPublic = PUBLIC_PREFIXES.some((p) => pathname === p || pathname.startsWith(p + '/'));
  if (isPublic) return NextResponse.next();
  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
