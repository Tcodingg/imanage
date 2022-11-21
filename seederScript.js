import dotenv from 'dotenv';
dotenv.config;

import Employees from './models/employees.js';
import connectDB from './config/db.js';
import { seedData } from './seedData.js';

const importData = async () => {
  try {
    connectDB();
    await Employees.deleteMany({});
    await Employees.insertMany(seedData);
    console.log('Data imported success');
    process.exit();
  } catch (error) {
    console.log(`There is error with data import : ${error}`);
    process.exit();
  }
};

importData();
