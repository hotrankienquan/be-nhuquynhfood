const pool = require('../config/connectDB.js')
const { v4 } = require("uuid");
const { updateTableService } = require('../services/TableService.js');
let addNewTable = async (req, res) => {
  let { name, status = 0 } = req.body;
  let [rows] = await pool.execute('insert into tablefood(id,name, status) values(?,?,?)', [v4(), name, status]);
  if (rows) {
    return res.status(200).json({
      errCode: 0,
      errMessage: 'ok'
    })
  }
}
let getAllTable = async (req, res) => {
  const [rows, fields] = await pool.execute('select * from tablefood');
  return res.status(200).json({
    message: 'ok',
    data: rows
  })
}
let editTable = async (req, res) => {
  let { name, status, id } = req.body
  let [rows, fields] = await pool.execute('update tablefood set name = ?,status=? where id = ?', [name, status, id])
  return res.status(200).json({
    message: 'update success',
    data: rows
  })
}
let deleteTable = async (req, res) => {
  const [rows, fields] = await pool.execute('delete from tablefood where id = ?', [req.body.id]);
  return res.status(200).json({
    message: 'ok',
    data: rows
  })
}
let orderTable = async (req, res) => {
  // status invoice = 2, 
  let { nameCustomer: name, timeEat: time_eat, fk_id_user, idTable } = req.body;
  let [checkExistName] = await pool.execute('select * from invoice_table where name = ? limit 1', [name]);
  if (checkExistName.length !== 0) {
    return res.status(404).json({
      errCode: 1,
      errMessage: 'tên này đã có, vui lòng chọn tên khác'
    })
  }

  let [rows, fields] = await pool.execute('insert into invoice_table(id,name,time_eat,fk_id_user,fk_table) values(?,?,?,?,?)', [v4(), name, time_eat, fk_id_user,idTable]);
  if (rows) {
    await pool.execute('update tablefood set status = 1 where id = ?', [idTable])

    let [rows2] = await pool.execute('select * from invoice_table where name = ? limit 1', [name])
    if (rows2) {

      return res.status(200).json({
        errCode: 0,
        message: 'đặt bàn thành công',
        key_table: rows2[0].fk_table,
        id_invoice: rows2[0].id
      })
    }
  }
}
let getAllOrderTable = async (req, res) => {
  let [rows] = await pool.execute('SELECT fk_id_tablefood,invoice_table.name,invoice_table.time_eat,total_price,description_order_food FROM invoice_detail, invoice_table where invoice_detail.fk_id_invoice = invoice_table.id');

  return res.status(200).json({
    errCode: 0,
    message: 'ok',
    data: rows
  })
}
let deleteOrderTable = async (req, res) => {
  let id = req.params.id;
  console.log(req.params)
  await pool.execute('delete from invoice_table where id = ?', [id]);
  return res.status(200).json({
    message: 'ok'
  })
}
let acceptTable = async (req, res) => {
  const STATUS_ACCEPT_TABLE = 2;
  console.log(req.body);
  let { table_id } = req.body;
  await pool.execute(`update tablefood set status = ${STATUS_ACCEPT_TABLE} where id = ?`, [table_id]);
  return res.status(200).json({
    message: 'ok',
    errCode: 0
  })
}
let resetTable = async (req, res) => {
  console.log('reset table')
  const RESET_TABLE = 0;
  let { table_id } = req.body;
  await pool.execute(`update tablefood set status = ${RESET_TABLE} where id = ?`, [table_id]);
  return res.status(200).json({
    message: 'ok',
    errCode: 0
  })
}
let getTableNeedUpdate = async (req, res) => {
  const [rows] = await pool.execute('select * from tablefood where id = ? limit 1', [req.body.id])
  return res.status(200).json({errCode:0, message: 'ok', data:rows})
}

let updateTable = async (req, res) => {
  let rows = await updateTableService(req.body);
  return res.status(200).json({
    message: 'update success',
    data: rows
  })
}
module.exports = {
  getAllTable, addNewTable, editTable, deleteTable,
  orderTable, getAllOrderTable, deleteOrderTable,
  acceptTable,
  resetTable,
  getTableNeedUpdate,
  updateTable
}