import mysql from 'mysql2';
import dotenv from 'dotenv';

dotenv.config();

const connectionPool = mysql.createPool({
    host:process.env.DB_HOST,
    user:process.env.DB_USER,
    password:process.env.DB_PASS,
    port:process.env.DB_PORT,
    database:process.env.DB_NAME
}).promise();

export default connectionPool;