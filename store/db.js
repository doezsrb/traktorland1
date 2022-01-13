//import mysql from 'serverless-mysql';
var GOOGLE_CLOUD_DB_USER = process.env.GOOGLE_CLOUD_DB_USER;
var GOOGLE_CLOUD_DB_PASSWORD = process.env.GOOGLE_CLOUD_DB_PASSWORD;
var GOOGLE_CLOUD_DB_TABLE = process.env.GOOGLE_CLOUD_DB_TABLE;
var GOOGLE_CLOUD_DB_HOST = process.env.GOOGLE_CLOUD_DB_HOST;
// const con = mysql({
// 	config:{
// 		host: GOOGLE_CLOUD_DB_HOST,
//     	database: GOOGLE_CLOUD_DB_TABLE,
//     	user: GOOGLE_CLOUD_DB_USER,
//     	password: GOOGLE_CLOUD_DB_PASSWORD
// 	}
// })
import mysql from "mysql";

const con = mysql.createConnection({
  host: "188.93.122.197",
  user: "sajt",
  password: "1",
  database: "gazzele_webmarjanovic",

  connectTimeout: 60 * 60 * 1000,
  acquireTimeout: 60 * 60 * 1000,
  timeout: 60 * 60 * 1000,
});
// con.getConnection((err, connection) => {
//     if (err) {
//         if (err.code === 'PROTOCOL_CONNECTION_LOST') {
//             console.error('Database connection was closed.')
//         }
//         if (err.code === 'ER_CON_COUNT_ERROR') {
//             console.error('Database has too many connections.')
//         }
//         if (err.code === 'ECONNREFUSED') {
//             console.error('Database connection was refused.')
//         }

//     }
//     if (connection) connection.release()
//     return
// })
// const con2 = mysql.createPool({
// 	host:'5.57.72.163',
// 	user:'sajt',
// 	password:'1',
// 	database:'gazzele_web',
// 	connectionLimit : 10,
//     connectTimeout  : 60 * 60 * 1000,
//     acquireTimeout  : 60 * 60 * 1000,
//     timeout         : 60 * 60 * 1000,
// })

export default con;
