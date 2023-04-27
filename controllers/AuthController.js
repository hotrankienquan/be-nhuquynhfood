const pool = require('../config/connectDB.js')
const { v4 } = require("uuid");
const { getAllUsersService, updateUserService, deleteUserService } = require("../services/AuthService.js");

let checkUserNameExist = (username) => {
  return new Promise(async (resolve, reject) => {
    try {
      let [rows, fields] = await pool.execute("select * from user where username = ? limit 1",
        [username]);
      if (rows.length != 0) {
        resolve(true)
      } else {
        resolve(false)
      }
    } catch (e) {
      reject(e)
    }
  })
}
let getAllUsers = async (req, res) => {
  let rows = await getAllUsersService();
  return res.status(200).json({
    message: 'ok',
    data: rows
  })
}
let getUserNeedUpdate = async (req, res) => {
  console.log(req.body)
  const [rows] = await pool.execute('select * from user where id = ? limit 1', [req.body.id])
  if (rows) {
    let newObj = { ...rows[0], password: null ,fk_id_type_account :null}
    
    return res.status(200).json({errCode:0, message: 'ok', data:newObj})
  }
}
let updateUser = async (req, res) => {
  let rows = await updateUserService(req.body);
  console.log(rows)
  return res.status(200).json({
    message: 'update success',
    errCode: 0,
    data: rows
  })
}
let deleteUser = async (req, res) => {
  let idRequest = req.params.id;
  let rows = await deleteUserService(idRequest);
  if (rows) {
    return res.status(200).json({
      message: "delete successfully",
      errCode: 0
    })
  }
}
// api đăng nhập 
let handleSignIn = async (req, res) => {
  const { username, password } = req.body;
  let check = await checkUserNameExist(username);
  if (check === true) {
    // có tổn tại, xử lí tiếp login 
    let [rows, fields] = await pool.execute('select * from user where username = ? limit 1', [username]);
    // chcek thong tin hợp lệ

    if (rows) {
      let udb = rows[0].username;
      let pdb = rows[0].password;
      if (username == udb && password == pdb) {
        let [rows2] = await pool.execute('select * from user where username = ? limit 1', [username]);
        rows2[0].password = null;
        return res.status(200).json({
          errCode: 0,
          errMessage: 'Đăng nhập thành công',
          rows2
        })
      } else if (username !== udb || password !== pdb) {
        return res.status(404).json({
          errCode: 1,
          errMessage: 'Đăng nhập thất bại'
        })
      }
    }

    return;
  } else {
    return res.status(500).json({
      errCode: 1,
      errMessage: 'Username không có trong hệ thống, vui lòng đăng ký mới'
    })
  }
}
// api đăng ký
let addNewUser = async (req, res) => {
  const { firstname, lastname, username, password, phone = '', address = '', email = '', avatar='' } = req.body;
  let check = await checkUserNameExist(username);
  if (check === true) {
    return res.status(200).json({
      errCode: 1,
      errMessage: 'Đã tồn tại username này, mời bạn nhập username khác'
    })
  } else {
    let [rows, fields] = await pool.execute('insert into user(id,firstname,lastname,username, password,phone,address,email,avatar,fk_id_type_account) values(?,?,?,?,?,?,?,?,?,?)', [v4(), firstname, lastname, username, password, phone, address, email, avatar, '1']);
    // role = 0 là user bthuong, 1 là admin
    if (rows) {
      let [rows2] = await pool.execute('select * from user where username = ? limit 1', [username]);

      return res.status(200).json({
        errCode: 0,
        errMessage: "Đăng ký thành công",
        dataUser: rows,
        rows2: rows2
      })
    }
  }
}
let handleChangePassword = async (req, res) => {
  let { old_password, new_password,id } = req.body;

  if (old_password == null && new_password == null) return;
  let [user] = await pool.execute('select * from user where id = ? limit 1', [id]);
  if (user[0] && user[0].password == old_password) {

    let [updatedUser] = await pool.execute('update user set password = ? where id = ?', [new_password, id]);
    if (!updatedUser) return res.status(404).json({errCode:1, errMessage:'error 1'})
    return res.status(200).json({
      errCode: 0,
      errMessage: 'change password successful'
    })
  } else {
    return res.status(404).json({errCode:1, errMessage:'error 2'})
  }
}
module.exports = {
  getAllUsers,getUserNeedUpdate,
  updateUser,
  addNewUser,deleteUser,
  handleSignIn,
  handleChangePassword
}