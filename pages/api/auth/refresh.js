/* eslint-disable import/no-anonymous-default-export */
import { jwtVerify, SignJWT } from 'jose';

export const config = {
  matcher: ['/edit', '/api/employees/delete/:path*'],
};

export default async (req, res) => {
  const { cookies } = req;
  const refresh_token_secret = process.env.refresh_token;
  const access_token_secret = process.env.access_token;

  const refreshToken = cookies.refreshToken;

  if (!refreshToken) {
    res.state(401).json({ message: 'No refresh token. Please login.' });
  }

  try {
    const { payload } = await jwtVerify(
      refreshToken,
      new TextEncoder().encode(refresh_token_secret)
    );

    const iat = Math.floor(Date.now() / 1000);

    const access_token = await new SignJWT({ id: payload.id })
      .setProtectedHeader({ alg: 'HS256', typ: 'JWT' })
      .setExpirationTime('5s')
      .setIssuedAt(iat)
      .setNotBefore(iat)
      .sign(new TextEncoder().encode(access_token_secret));

    res.status(200).json({ accessToken: access_token });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
