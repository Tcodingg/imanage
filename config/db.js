require('dotenv').config;

import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB, {
      userNewUrlParser: true,
      userUnifiedTopology: true,
    });

    console.log('connect to database');
  } catch (error) {
    console.log(`Database connection failed: ${error}`);
  }
};

export default connectDB;
