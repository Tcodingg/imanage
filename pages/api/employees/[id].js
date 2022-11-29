import mongoose from 'mongoose';
import employees from '../../../models/employees.js';
import fs from 'fs';

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req, res) => {
  const { method } = req;
  if (method === 'DELETE') {
    const { id } = req.query;
    try {
      if (!mongoose.Types.ObjectId.isValid(id))
        return res.status(404).send('No employee found');

      let employee = await employees.findById(id);
      if (employee?.image) {
        let filePath = `public/assets/images/employees/${employee.image}`;
        fs.unlinkSync(filePath);
      }
      await employees.findByIdAndRemove(id);
      return res.status(200).json({ message: 'Employee deleted successfully' });
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }
};
