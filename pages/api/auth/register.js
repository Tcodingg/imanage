/* eslint-disable import/no-anonymous-default-export */
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import db from '../../../config/db';
import { createToken } from '../../../helpers/createToken';
dotenv.config();
export default async (req, res) => {
  const { method } = req;

  if (method === 'POST') {
    const { name, password, email } = req.body;

    try {
      // check if the user exits, returns undefined if the users doesn't exist
      const exists = await getUser(email);

      // if a users exits, return an error message
      if (exists) return res.status(400).json('Email is already registered');

      // hash the password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      const sqlInsert = `INSERT INTO Users(name,email,password ) VALUES (?,?,? )`;
      const values = [name, email, hashedPassword];

      let [results] = await db.query(sqlInsert, values);

      let newUser = await getUser(email);

      //create refresh token and accessToken
      const refresh_token_secret = process.env.refresh_token;
      const access_token_secret = process.env.access_token;

      const iat = Math.floor(Date.now() / 1000);
      const expAccess = iat + 60 * 30; // access token expires in 30 minutes
      const expRefresh = iat + 60 * 60 * 60 * 24; // refresh token expires in 1 day

      const refresh_token = await createToken(
        refresh_token_secret,
        'refreshToken',
        iat,
        expRefresh,
        newUser
      );
      const access_token = await createToken(
        access_token_secret,
        'accessToken',
        iat,
        expAccess,
        newUser
      );

      // set headers to httpOnly cookie
      res.setHeader('Set-Cookie', [refresh_token, access_token]);

      res.status(201).json(newUser);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
};

const getUser = async (email) => {
  try {
    const [results] = await db.query(
      'SELECT name, email FROM Users WHERE email=?',
      [email]
    );

    return results[0];
  } catch (error) {
    return error;
  }
};
