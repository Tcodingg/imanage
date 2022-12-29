import fs from 'fs';
import db from '../../../../config/db';

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req, res) => {
  const { method } = req;
  if (method === 'DELETE') {
    const id = Number(req.query?.id);

    try {
      let deleteEmployee = 'DELETE FROM Employees WHERE _id=?';

      await db.query(deleteEmployee, [id]);
      return res.status(200).json({ message: 'Employee deleted successfully' });
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }
};
