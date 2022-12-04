import nextConnect from 'next-connect';
import multer from 'multer';
import employees from '../../../models/employees';

const upload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/assets/images/employees'); // images is the folder located in the public
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

  const newEmployee = {
    name,
    image,
    role,
    typeEmployee,
    status,
    salary,
  };

  const addEmployee = new employees(newEmployee);

  try {
    await addEmployee.save();
    res.status(201).json(addEmployee);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
});

export default handler;

export const config = {
  api: {
    bodyParser: false, // Disallow body parsing, consume as stream
  },
};
