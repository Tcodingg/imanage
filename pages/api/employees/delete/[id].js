import fs from 'fs';
import db from '../../../../config/db';

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req, res) => {
  const { method } = req;
  if (method === 'DELETE') {
    const id = Number(req.query?.id);

    try {
      let employee = await getEmployee(id);
      if (employee?.image) {
        let filePath = `public/assets/images/employees/${employee.image}`;
        fs.unlinkSync(filePath);
      }

      let deleteEmployee = 'DELETE FROM Employees WHERE _id=?';

      await db.query(deleteEmployee, [id]);
      return res.status(200).json({ message: 'Employee deleted successfully' });
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }
};

const getEmployee = async (id) => {
  let query = 'SELECT * FROM Employees WHERE _id=?';
  const [result] = await db.query(query, [id]);
  return result[0];
};
