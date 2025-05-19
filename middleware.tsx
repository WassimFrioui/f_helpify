// middleware.ts
import { NextRequest, NextResponse } from 'next/server';
import { jwtDecode } from 'jwt-decode';
import { routeAccess, Role } from './lib/acl';

type JwtPayload = {
  role: Role;
};

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value;
  const pathname = request.nextUrl.pathname;

  const matchedPath = Object.keys(routeAccess).find((path) =>
    pathname.startsWith(path)
  );

  // Si la route n'est pas protégée par ACL, autoriser
  if (!matchedPath) {
    return NextResponse.next();
  }

  const requiredRoles = routeAccess[matchedPath];

  if (!token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  try {
    const decoded = jwtDecode<JwtPayload>(token);
    const userRole = decoded.role;

    if (!requiredRoles.includes(userRole)) {
      return NextResponse.redirect(new URL('/unauthorized', request.url));
    }
  } catch {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/profile',
    '/services/:path*',
    '/bookings/:path*',
    '/admin',
  ],
};
