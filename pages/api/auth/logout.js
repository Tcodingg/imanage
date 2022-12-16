/* eslint-disable import/no-anonymous-default-export */
import { serialize } from 'cookie';

export default async (req, res) => {
  const { cookies } = req;

  const jwt = cookies.refreshToken;

  if (!jwt) {
    return res.json({ message: 'You already have logged out!' });
  } else {
    const refreshToken = serialize('refreshToken', null, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== 'development',
      sameSite: 'strict',
      maxAge: -1,
      path: '/',
    });
    const accessToken = serialize('accessToken', null, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== 'development',
      sameSite: 'strict',
      maxAge: -1,
      path: '/',
    });

    res.setHeader('Set-Cookie', [accessToken, refreshToken]);
    res.status(200).json({ message: 'Successfully logged out!' });
  }
};
