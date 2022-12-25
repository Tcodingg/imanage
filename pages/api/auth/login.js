import bcrypt from 'bcrypt';
import { createToken } from '../../../helpers/createToken';
import db from '../../../config/db';

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req, res) => {
  const { method } = req;

  if (method === 'POST') {
    const { email, password } = req.body;
    try {
      // check if the user exists
      const userInstance = await getUser(email);
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
      const expAccess = iat + 60 * 30; // access token expires in 30 minutes
      const expRefresh = iat + 60 * 60 * 60 * 24; // refresh token expires in 1 day

      const refresh_token = await createToken(
        refresh_token_secret,
        'refreshToken',
        iat,
        expRefresh,
        userInstance
      );
      const access_token = await createToken(
        access_token_secret,
        'accessToken',
        iat,
        expAccess,
        userInstance
      );

      res.setHeader('Set-Cookie', [refresh_token, access_token]);
      //do not send password
      userInstance.password = undefined;

      res.status(201).json(userInstance);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
};

const getUser = async (email) => {
  try {
    const [results] = await db.query('SELECT * FROM Users WHERE email=?', [
      email,
    ]);

    return results[0];
  } catch (error) {
    return error;
  }
};
