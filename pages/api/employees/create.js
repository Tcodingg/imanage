/* eslint-disable import/no-anonymous-default-export */

import db from '../../../config/db';

export default async (req, res) => {
  const {
    selectedImage: image,
    name,
    selectedRole: role,
    selectedEmployeeType: typeEmployee,
    selectedStatus: status,
    salary,
  } = req.body;

  const sqlInsert = `INSERT INTO Employees(name, image, salary, role, status, typeEmployee ) VALUES (?,?,?,?,?,? )`;

  const values = [name, image, salary, role, status, typeEmployee];

  try {
    const [results] = await db.query(sqlInsert, values);
    let id = results.insertId;

    let newEmployee = await getEmployee(id);

    res.status(200).json(newEmployee);
  } catch (error) {
    res.status(400).json(error);
  }
};
const getEmployee = async (id) => {
  const [data] = await db.query('SELECT * FROM Employees WHERE _id=?', [id]);
  return data[0];
};
