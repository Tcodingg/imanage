import mongoose from 'mongoose';

const employeesSchema = new mongoose.Schema({
  image: String,
  name: String,
  salary: Number,
  status: String,
  role: String,
  typeEmployee: String,
});

export default mongoose.models.Employees ||
  mongoose.model('Employees', employeesSchema);
