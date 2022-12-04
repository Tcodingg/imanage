import connectDB from '../../../config/db.js';
import Employees from '../../../models/employees.js';

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req, res) => {
  const { method } = req;

  await connectDB();

  if (method === 'POST') {
    console.log(req.body);
    res.send('login page');
  }
};
