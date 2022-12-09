import { NextResponse } from 'next/server';
import dotenv from 'dotenv';
import { verify } from 'jsonwebtoken';

export const config = {
  matcher: ['/edit', '/api/employees/delete/:path*'],
};

export default function middleware(req) {
  const { cookies, method } = req;

  const jwt = cookies.get('authentication');
  const url = req.nextUrl.clone();

  if (
    req.nextUrl.pathname.includes('/edit') ||
    req.nextUrl.pathname.includes('/api/employees/delete/')
  ) {
    url.pathname = '/login';

    if (!jwt) {
      console.log('no jwt', req.nextUrl.pathname);
      return NextResponse.redirect(url);
    }
    try {
      verify(jwt, access_token);
      return NextResponse.next();
    } catch (error) {
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}
