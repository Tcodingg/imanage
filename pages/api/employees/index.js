/* eslint-disable import/no-anonymous-default-export */
import db from '../../../config/db';

export default async (req, res) => {
  const { method } = req;
  if (method === 'GET') {
    try {
      const query = 'SELECT * FROM Employees';
      const values = [];
      const result = await db.query(query);
      console.log(result[0]);
      return res.status(200).json(result[0]);
    } catch (error) {
      console.log(error);
      return res.status(400).json({ message: `There is an error ${error}` });
    }
  }
};
