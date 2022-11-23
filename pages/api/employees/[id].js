import mongoose from 'mongoose';
import employees from '../../../models/employees.js';

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req, res) => {
  const { method } = req;
  if (method === 'DELETE') {
    const { id } = req.query;
    try {
      if (!mongoose.Types.ObjectId.isValid(id))
        return res.status(404).send('No post with that id.');
      await employees.findByIdAndRemove(id);
      return res.status(200).json({});
    } catch (error) {
      return res.status(400);
    }
  }
};
