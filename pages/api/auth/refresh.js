/* eslint-disable import/no-anonymous-default-export */
import { jwtVerify, SignJWT } from 'jose';
import { serialize } from 'cookie';

export const config = {
  matcher: ['/edit', '/api/employees/delete/:path*'],
};

export default async (req, res) => {
  const { cookies } = req;
  let refreshToken = cookies.refreshToken;
  const refresh_token_secret = process.env.refresh_token;
  const access_token_secret = process.env.access_token;

  if (!refreshToken) {
    res.status(401).json({ message: 'No refresh token. Please login.' });
  }

  try {
    const { payload } = await jwtVerify(
      refreshToken,
      new TextEncoder().encode(refresh_token_secret)
    );

    const iat = Math.floor(Date.now() / 1000);
    // let date = new Date();
    // date.setTime(date.getTime() + 30 * 1000);
    // let expires = '';
    let date = new Date();
    let expires = date.setTime(date.getTime() + 60 * 60 * 1000);
    console.log(expires);

    const access_token = await new SignJWT({ id: payload.id })
      .setProtectedHeader({ alg: 'HS256', typ: 'JWT' })
      .setExpirationTime('5s')
      .setIssuedAt(iat)
      .setNotBefore(iat)
      .sign(new TextEncoder().encode(access_token_secret));

    const accessToken = await new SignJWT({ id: payload.id })
      .setProtectedHeader({ alg: 'HS256', typ: 'JWT' })
      .setExpirationTime('5s')
      .setIssuedAt(iat)
      .setNotBefore(iat)
      .sign(new TextEncoder().encode(access_token_secret));

    const serialized_access_token = serialize('accessToken', accessToken, {
      httpOnly: true,
      sameSite: 'strict',
      path: '/',
      maxAge: expires,
    });

    res.setHeader('Set-Cookie', serialized_access_token);
    res.status(200).json(access_token);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
