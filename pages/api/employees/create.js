import nextConnect from 'next-connect';
import multer from 'multer';
import db from '../../../config/db';

const upload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/assets/images/employees');
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

handler.use(upload.single('image')); // attribute name you are sending the file by

handler.post(async (req, res) => {
  const name = req.body.name;
  const image = req.file?.filename;
  const role = req.body.role;
  const typeEmployee = req.body.typeEmployee;
  const status = req.body.status;
  const salary = req.body.salary;
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
});

export default handler;

const getEmployee = async (id) => {
  const [data] = await db.query('SELECT * FROM Employees WHERE _id=?', [id]);
  return data[0];
};

export const config = {
  api: {
    bodyParser: false, // Disallow body parsing, consume as stream
  },
};
