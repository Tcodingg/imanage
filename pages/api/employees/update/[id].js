import nextConnect from 'next-connect';
import multer from 'multer';
import fs from 'fs';
import db from '../../../../config/db';

const upload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/assets/images/employees');
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + file.originalname);
    },
  }),
});

const handler = nextConnect({
  onError(error, req, res) {
    res
      .status(501)
      .json({ error: `Sorry something Happened! ${error.message}` });
  },
  onNoMatch(req, res) {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  },
});

handler.use(upload.single('image'));

handler.patch(async (req, res) => {
  const { method } = req;
  if (method === 'PATCH') {
    const id = Number(req.query?.id);
    const name = req.body.name;
    const image = req.file?.filename;
    const role = req.body.role;
    const typeEmployee = req.body.typeEmployee;
    const status = req.body.status;
    const salary = req.body.salary;

    let result;
    try {
      let employee = await getEmployee(id);

      if (image) {
        let imagePath = `public/assets/images/employees/${employee.image}`;
        fs.unlinkSync(imagePath);

        let sqlUpdate = `UPDATE Employees SET name=?, image=?, salary=?, role=?, status=?, typeEmployee=? WHERE _id=?`;
        let values = [name, image, salary, role, status, typeEmployee, id];

        const [results] = await db.query(sqlUpdate, values);
        result = await getEmployee(id);
      } else {
        let sqlUpdate = `UPDATE Employees SET name=?, salary=?, role=?, status=?, typeEmployee=? WHERE _id=?`;
        let values = [name, salary, role, status, typeEmployee, id];

        const [results] = await db.query(sqlUpdate, values);
        result = await getEmployee(id);
      }

      res.status(200).json(result);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
});

export default handler;
export const config = {
  api: {
    bodyParser: false, // Disallow body parsing, consume as stream
  },
};

const getEmployee = async (id) => {
  let query = 'SELECT * FROM Employees WHERE _id=?';
  const [result] = await db.query(query, [id]);
  return result[0];
};
