// get the client
// import mysql from 'mysql2'
const mysql = require('mysql2/promise');
// create the connection to database
require("dotenv").config();
const pool = mysql.createPool({
	host: process.env.MYSQL_HOST,
	user: process.env.MYSQL_USER,
	database: process.env.MYSQL_DB,
	password: process.env.MYSQL_PASSWORD,
	port: process.env.MYSQL_PORT
});
// const pool = mysql.createPool({
// 	host: "buudzxhro1efskecwqu7-mysql.services.clever-cloud.com",
// 	user: "u9vuc6qosofss30z",
// 	database: "buudzxhro1efskecwqu7",
// 	password: "XUO8TmEEXfeyEMo7AeL7",
// 	port: 3306
// });
console.log("check ket noi db thanh cong", pool)
// const pool = mysql.createPool({
// 	host: 'localhost',
// 	user: 'root',
// 	database: 'food-nhuquynh'
// });
// const pool = mysql.createPool({
//   host: 'localhost',
//   user: 'kienquan_kienquan',
//   database: 'kienquan_nodejs'
// });

// simple query
// connection.query(
//   'SELECT * FROM `users`',
//   function (err, results, fields) {
//     console.log(results); // results contains rows returned by server
//     console.log(fields); // fields contains extra meta data about results, if available
//   }
// );

// with placeholder
// connection.query(
//   'SELECT * FROM `table` WHERE `name` = ? AND `age` > ?',
//   ['Page', 45],
//   function (err, results) {
//     console.log(results);
//   }
// );
module.exports = pool;