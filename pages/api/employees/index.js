import connectDB from '../../../config/db.js';
import Employees from '../../../models/employees.js';

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req, res) => {
  const { method } = req;

  await connectDB();

  if (method === 'GET') {
    let allEmployees = await Employees.find({});
    return res.status(200).json(allEmployees);
  } else if (method === 'POST') {
    const employee = req.body;
    // const newEmployee = new Employees(employee);

    try {
      res.status(200).json(employee);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
};
