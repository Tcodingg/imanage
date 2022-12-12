/* eslint-disable import/no-anonymous-default-export */
import { serialize } from 'cookie';

export default async (req, res) => {
  const { cookies } = req;

  const jwt = cookies.token;

  if (!jwt) {
    return res.json({ message: 'You already have logged out!' });
  } else {
    const serialized = serialize('token', null, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== 'development',
      sameSite: 'strict',
      maxAge: -1,
      path: '/',
    });

    res.setHeader('Set-Cookie', serialized);
    res.status(200).json({ message: 'Successfully logged out!' });
  }
};
