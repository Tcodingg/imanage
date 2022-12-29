/* eslint-disable import/no-anonymous-default-export */
import nextConnect from 'next-connect';
import multer from 'multer';
import fs from 'fs';
import db from '../../../../config/db';

export default async (req, res) => {
  const { method } = req;
  if (method === 'PATCH') {
    const {
      id,
      selectedImage: image,
      name,
      selectedRole: role,
      selectedEmployeeType: typeEmployee,
      selectedStatus: status,
      salary,
    } = req.body;

    let result;
    try {
      let sqlUpdate = `UPDATE Employees SET name=?, image=?, salary=?, role=?, status=?, typeEmployee=? WHERE _id=?`;
      let values = [name, image, salary, role, status, typeEmployee, id];

      const [results] = await db.query(sqlUpdate, values);
      result = await getEmployee(id);

      res.status(200).json(result);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
};

const getEmployee = async (id) => {
  let query = 'SELECT * FROM Employees WHERE _id=?';
  const [result] = await db.query(query, [id]);
  return result[0];
};
