import mysql from 'mysql2'

import dotenv from 'dotenv'
dotenv.config({ path: 'D:\\NodeExample\\backend\\.env' })

console.log('Environment variables:', {
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    port: process.env.MYSQL_PORT,
});

const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    port: process.env.MYSQL_PORT || 3307
}).promise()

// async function getUsers() {
//     const [rows] = await pool.query("SELECT * FROM users")
//     return rows 
// }

// const users = await getUsers(); 
// console.log(users);

export default pool;