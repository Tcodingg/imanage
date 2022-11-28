import connectDB from '../../../config/db.js';
import Employees from '../../../models/employees.js';
import multer from 'multer';

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req, res) => {
  const { method } = req;

  await connectDB();

  if (method === 'GET') {
    let allEmployees = await Employees.find({});
    return res.status(200).json(allEmployees);
  }
};
