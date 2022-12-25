import { serialize } from 'cookie';
import { SignJWT } from 'jose';

export const createToken = async (secret, tokenType, iat, exp, user) => {
  const today = Math.floor(Date.now() / 1000);
  const token = await new SignJWT({ id: user.email })
    .setProtectedHeader({ alg: 'HS256', typ: 'JWT' })
    .setExpirationTime('1 day')
    .setIssuedAt(iat)
    .setNotBefore(iat)
    .sign(new TextEncoder().encode(secret));

  const serializedToken = serialize(tokenType, token, {
    httpOnly: true,
    sameSite: 'strict',
    secure: true,
    maxAge: exp,
    path: '/',
  });

  return serializedToken;
};
