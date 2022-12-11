import bcrypt from 'bcrypt';
import Users from '../../../models/usersModel';
import { sign } from 'jsonwebtoken';
import { serialize } from 'cookie';
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

      //create a token
      const iat = Math.floor(Date.now() / 1000);
      const exp = iat + 60 * 60; // one hour
      const token = await new SignJWT({ id: userInstance._id })
        .setProtectedHeader({ alg: 'HS256', typ: 'JWT' })
        .setExpirationTime(exp)
        .setIssuedAt(iat)
        .setNotBefore(iat)
        .sign(new TextEncoder().encode(process.env.access_token));

      const serialized = serialize('token', token, {
        httpOnly: true,
        sameSite: 'strict',
        maxAge: exp,
        path: '/',
      });

      // avoid sending the password to the frontend
      userInstance.password = undefined;

      // set the header httpOnly cookie
      res.setHeader('Set-Cookie', serialized);

      res.status(201).json(userInstance);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
};
