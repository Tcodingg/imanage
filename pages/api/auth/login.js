import bcrypt from 'bcrypt';
import Users from '../../../models/usersModel';
import { sign } from 'jsonwebtoken';
import { serialize } from 'cookie';
import dotenv from 'dotenv';

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

      // create a token
      let THIRTY_DAYS = 1000 * 60 * 60 * 24 * 30;
      const token = sign({ id: userInstance._id }, process.env.access_token, {
        expiresIn: Math.floor(Date.now() / 1000) + THIRTY_DAYS,
      });

      const serialized = serialize('authentication', token, {
        httpOnly: true,
        sameSite: 'strict',
        maxAge: THIRTY_DAYS,
        path: '/',
      });

      // avoid sending the password to the frontend
      userInstance.password = undefined;

      // set the header httpOnly cookie
      res.setHeader('Auth', serialized);

      res.status(201).json(userInstance);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
};
