
const pool = require('../config/connectDB.js')

let updateTableService = async (reqBody) => {
  let { name,status, idInput } = reqBody;
  let [rows, fields] = await pool.execute('update tablefood set name = ?,status = ? where id = ?', [name,status,idInput])
  if (rows) return rows;
}

export {
  updateTableService
}