import mongoose from 'mongoose';

const employeesSchema = new mongoose.Schema({
  image: String,
  name: String,
  salary: Number,
  status: String,
  role: String,
  typeEmployee: String,
});

const Employees = mongoose.model('Employees', employeesSchema);

export default Employees;
