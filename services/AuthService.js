const pool = require('../config/connectDB.js')
let getAllUsersService = async () => {

  const [rows, fields] = await pool.execute('select * from user');
  if (rows) {
    return rows;
  }
}
let updateUserService = async (reqBody) => {
  let { firstname, lastname, username, phone, address, email, avatar,fk_id_type_account = '1', idInput } = reqBody;
  let [rows, fields] = await pool.execute('update user set firstname = ?,lastname=?,username=?,phone=?,address=?,email=?,avatar=? where id = ?', [firstname, lastname, username, phone,address,email,avatar, idInput])
  if (rows) return rows;
}

let deleteUserService = async (id) => {
  let [rows, fields] = await pool.execute('delete from user where id = ?', [id]);
  if (rows) return rows;
}


module.exports =  {
  getAllUsersService,
  updateUserService,
  deleteUserService
}