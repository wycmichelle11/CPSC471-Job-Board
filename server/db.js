import mysql from "mysql2"
export const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '2119',
    database: 'jobboard', 
});