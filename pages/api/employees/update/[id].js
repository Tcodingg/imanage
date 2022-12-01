import nextConnect from 'next-connect';
import multer from 'multer';
import employees from '../../../../models/employees';

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
    const id = req.query.id;
    const name = req.body.name;
    const image = req.file?.filename;
    const role = req.body.role;
    const typeEmployee = req.body.typeEmployee;
    const status = req.body.status;
    const salary = req.body.salary;

    const updateEmployee = {
      name,
      image,
      role,
      typeEmployee,
      status,
      salary,
    };
    try {
      const employee = await employees.findById(id);
      console.log(image);
      res.status(200).json(employee);
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
