import mysql from 'mysql2';
import dotenv from 'dotenv';
dotenv.config();

const db = mysql
  .createPool({
    host: process.env.MYSQL_HOST,
    database: process.env.MYSQL_DATABASE,
    user: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD,
  })
  .promise();

export default db;
