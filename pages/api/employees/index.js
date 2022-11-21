import connectDB from '../../../config/db.js';
import Employees from '../../../models/employees.js';

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req, res) => {
  const { method } = req;

  await connectDB();

  if (method === 'GET') {
    let allEmployees = await Employees.find({});
    res.status(200).json(allEmployees);
  }
};
