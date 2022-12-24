/* eslint-disable import/no-anonymous-default-export */
import db from '../../../config/db';

export default async (req, res) => {
  const { method } = req;
  if (method === 'GET') {
    const query = 'SELECT * FROM Employees';

    try {
      const [data] = await db.query(query);
      return res.status(200).json(data);
    } catch (error) {
      return res.status(400).json({ message: `There is an error ${error}` });
    }
  }
};
