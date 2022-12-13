import nextConnect from 'next-connect';
import multer from 'multer';
import employees from '../../../../models/employees';
import fs from 'fs';

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

    let result;
    try {
      const employee = await employees.findById(id);
      if (image) {
        let imagePath = `public/assets/images/employees/${employee.image}`;
        fs.unlinkSync(imagePath);

        result = await employees.findByIdAndUpdate(
          id,
          {
            name,
            image,
            role,
            typeEmployee,
            status,
            salary,
          },

          { new: true }
        );
      } else {
        result = await employees.findByIdAndUpdate(
          id,
          {
            image: employee.image,
            name,
            role,
            typeEmployee,
            status,
            salary,
          },
          { new: true }
        );
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
