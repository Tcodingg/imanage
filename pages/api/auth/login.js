import bcrypt from 'bcrypt';
import Users from '../../../models/usersModel';
import { sign } from 'jsonwebtoken';
import cookie, { serialize } from 'cookie';
import dotenv from 'dotenv';
import { SignJWT } from 'jose';

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req, res) => {
  const { method } = req;

  if (method === 'POST') {
    const { email, password } = req.body;
    try {
      // check is the user exists
      const userInstance = await Users.findOne({ email: email });
      if (!userInstance)
        return res.status(400).json({ message: 'User does not exist.' });

      // validate user password
      let validPassword = await bcrypt.compare(password, userInstance.password);
      if (!validPassword)
        return res.status(400).json({ message: 'Invalid password.' });

      //create refresh token
      const refresh_token_secret = process.env.refresh_token;
      const access_token_secret = process.env.access_token;
      const iat = Math.floor(Date.now() / 1000);
      const exp = iat + 60 * 60; // one hour
      const refresh_token = await new SignJWT({ id: userInstance._id })
        .setProtectedHeader({ alg: 'HS256', typ: 'JWT' })
        .setExpirationTime(exp)
        .setIssuedAt(iat)
        .setNotBefore(iat)
        .sign(new TextEncoder().encode(refresh_token_secret));

      const serialized_refresh_token = serialize(
        'refreshToken',
        refresh_token,
        {
          httpOnly: true,
          sameSite: 'strict',
          maxAge: exp,
          path: '/',
        }
      );

      //create access token
      const access_token = await new SignJWT({ id: userInstance._id })
        .setProtectedHeader({ alg: 'HS256', typ: 'JWT' })
        .setExpirationTime('5s')
        .setIssuedAt(iat)
        .setNotBefore(iat)
        .sign(new TextEncoder().encode(access_token_secret));

      let date = new Date();
      let expires = date.setTime(date.getTime() + 60 * 60 * 1000);
      const accessToken = await new SignJWT({ id: userInstance._id })
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

      // avoid sending the password to the frontend
      userInstance.password = undefined;

      res.setHeader('Set-Cookie', [
        serialized_refresh_token,
        serialized_access_token,
      ]);

      res
        .status(201)
        .json({ data: userInstance, access_token: `Bearer ${access_token}` });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
};
