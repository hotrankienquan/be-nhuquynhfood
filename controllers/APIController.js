const pool = require('../config/connectDB.js')
const { v4 } = require("uuid");
var nodemailer = require('nodemailer');
require("dotenv").config();

let addNewFood = async (req, res) => {
  let { name, price, image } = req.body;
  console.log(req.body);

  const params = [name, price, image];
  const convertStringParam = params.map((param, i) => param.toString());
  const [rows, fields] = await pool.execute(
    "insert into food(name, price,image) values(?,?,?)",
    convertStringParam
  );

  return res.status(200).json({
    message: "ok",
    data: rows,
  });
};
// let addNewFood = async (req, res) => {
//   let { name, price, image } = req.body;
//   const [rows, fields] = await pool.execute('insert into food(id,name, price,image) values(?,?,?,?)', [v4(), name, price, image]);

//   return res.status(200).json({
//     message: 'ok',
//     data: rows
//   })
// }
let getAllFood = async (req, res) => {
  const [rows, fields] = await pool.execute('select * from food');
  return res.status(200).json({
    message: 'ok',
    data: rows
  })
}
let editFood = async (req, res) => {
  let { name, price, image, id } = req.body
  let [rows, fields] = await pool.execute('update food set name = ?,price=?,image=? where id = ?', [name, price, image, id])

  return res.status(200).json({
    message: 'update success',
    data: rows
  })
}
let deleteFood = async (req, res) => {
  let id = req.params.id;
  console.log(req.params)
  await pool.execute('delete from food where id = ?', [id]);
  return res.status(200).json({
    message: 'delete food successfully',
    errCode: 0
  })
}


let updateInvoice = async (req, res) => {
  const FINISHED = 3
  let { fk_table, total_price, final_food_arr,arr_id_food,fk_id_invoice, emailUser, firstname} = req.body;
  let convertFinalFood = JSON.stringify(final_food_arr);
  let convertArrFood = JSON.stringify(arr_id_food);
  let [row] = await pool.execute('insert into invoice_detail(fk_id_tablefood,fk_id_food,fk_id_invoice,total_price,description_order_food) values(?,?,?,?,?)',
    [fk_table,convertArrFood,fk_id_invoice,total_price,convertFinalFood]
  );
  await pool.execute(`update tablefood set status = ${FINISHED} where id = ?`, [fk_table]);
  if (row) {
    sendEmail(firstname,emailUser)
    res.status(200).json({
      errCode: 0,
      errMessage: 'đặt món thành công'
    })
  }

}
// ----



let getFoodNeedUpdate = async (req, res) => {
  const [rows] = await pool.execute('select * from food where id = ? limit 1', [req.body.id])
  return res.status(200).json({errCode:0, message: 'ok', data:rows})
}
// --nodemailer


// var transporter = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//     user: 'tonystark1404@gmail.com',
//     pass: 'to@nl1aNh5492'
//   }
// });

// var mailOptions = {
//   from: 'tonystark1404@gmail.com',
//   to: 'hotrankienquan144@gmail.com',
//   subject: 'Sending Email using Node.js',
//   text: 'That was easy!'
// };

// transporter.sendMail(mailOptions, function(error, info){
//   if (error) {
//     console.log(error);
//   } else {
//     console.log('Email sent: ' + info.response);
//   }
// }); 

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'hotrankienquan144',
        pass: 'ekoycfitbaxkfjif'
    }
});


async function sendEmail(firstname, email_to) {
    const result = await transporter.sendMail({
        from: 'hotrankienquan144@gmail.com',
        to: email_to ||  'tonystark1404@gmail.com',
        subject: 'Thư từ nhà hàng như quỳnh',
        html:`<h2>Cảm ơn ${firstname} đã sử dụng dịch vụ nhà hàng như quỳnh food</h2>`
    });

    
}
// ----

let orderFood = async (req, res) => {
  let { name, time_eat, status = 2 } = req.body;
  let [rows] = await pool.execute('insert into invoice_table(id,name,time_eat) values(?,?,?)', [v4(), name, time_eat]);
  return res.status(200).json({
    errCode: 0,
    message: 'đặt bàn thành công'
  })
}
let getAllOrderFood = async (req, res) => {
  let [rows] = await pool.execute('select * from invoice_table');

  return res.status(200).json({
    errCode: 0,
    message: 'ok',
    data: rows
  })
}
let deleteOrderFood = async (req, res) => {
  let id = req.params.id;
  console.log(req.params)
  await pool.execute('delete from invoice_table where id = ?', [id]);
  return res.status(200).json({
    message: 'ok'
  })
}


let addHistoryBooking = async (req, res) => {
  console.log(req.body)
  let { name_customer, time, id_invoice } = req.body;
  let content = `${name_customer} đã đặt bàn vào lúc ${time}`;
   let [rows] = await pool.execute('insert into history_booking set content = ?, id_invoice=?', [content,id_invoice]);
  if (rows)
  {
    
    return res.status(200).json({message:'ok',errCode:0})
  }
}
let getAllHistory = async (req, res) => {
  let [rows] = await pool.execute('select * from history_booking')
  if (rows) {
    console.log(rows)
   return res.status(200).json({message:'ok',errCode:0 ,data:rows})
  }
}
let getDataChart = async (req, res) => {
  let [rows] = await pool.execute('SELECT invoice_table.time_eat, sum(invoice_detail.total_price) as total, invoice_table.name FROM invoice_detail,invoice_table where invoice_detail.fk_id_invoice = invoice_table.id group by invoice_table.name')
  if (rows) return res.status(200).json({ errCode:0,data:rows})
}
module.exports = {
  
  addNewFood, getAllFood, editFood, deleteFood,
  
  orderFood, getAllOrderFood, deleteOrderFood,
  updateInvoice,
  getFoodNeedUpdate,
  
  
  addHistoryBooking,
  getAllHistory,
  getDataChart
}