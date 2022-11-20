import connectDB from '../../../config/db';

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req, res) => {
  const { method } = req;

  await connectDB();

  if (method === 'GET') {
    res.send('this is home');
  }
};
