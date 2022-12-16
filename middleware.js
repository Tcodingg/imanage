import { NextResponse } from 'next/server';
import { jwtVerify } from 'jose';
export const config = {
  matcher: ['/edit', '/api/employees/delete/:path*'],
};

export default async function middleware(req) {
  const { cookies, method } = req;
  const access_token_secret = process.env.access_token;

  const accessToken = cookies.get('accessToken');
  const refresh = cookies.get('refreshToken');
  const url = req.nextUrl.clone();
  console.log(accessToken);

  if (
    req.nextUrl.pathname.includes('/edit') ||
    req.nextUrl.pathname.includes('/api/employees/delete/')
  ) {
    url.pathname = '/login';

    if (!refresh) {
      return NextResponse.redirect(url);
    }

    if (!accessToken) {
      return NextResponse.redirect(url);
    }
    try {
      const { payload } = await jwtVerify(
        accessToken,
        new TextEncoder().encode(access_token_secret)
      );

      return NextResponse.next();
    } catch (error) {
      console.log(error.message);
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}
