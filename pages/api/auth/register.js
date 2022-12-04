import bcrypt from 'bcrypt';
import Users from '../../../models/usersModel';
import { sign } from 'jsonwebtoken';
import { serialize } from 'cookie';
import dotenv from 'dotenv';
dotenv.config();
// eslint-disable-next-line import/no-anonymous-default-export
export default async (req, res) => {
  const { method } = req;

  if (method === 'POST') {
    const { name, password, email } = req.body;

    try {
      // check if the user exits
      const userExists = await Users.findOne({ email: email });

      // if the users exits, return an error message
      if (userExists)
        return res.status(400).json('Email is already registered');

      // hash the password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      // create new user
      const user = new Users({
        name,
        email,
        password: hashedPassword,
      });
      const userInstance = await user.save();

      // create a token
      let THIRTY_DAYS = 1000 * 60 * 60 * 24 * 30;
      const token = sign({ id: user._id }, process.env.access_token, {
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
      console.log(error);
      res.status(500).json({ message: error.message });
    }
  }
};
