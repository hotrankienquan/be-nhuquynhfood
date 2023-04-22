// get the client
// import mysql from 'mysql2'
const mysql = require('mysql2/promise');
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

module.exports = pool;