// import express from 'express'
const express = require('express')
const APIController = require('../controllers/APIController')
const AuthController = require('../controllers/AuthController')
const TableController = require('../controllers/TableController')
const router = express.Router()
const APIRoute = (app) => {

  // middleware that is specific to this router
  router.use((req, res, next) => {
    console.log('Time: ', Date.now())
    next()
  })

  router.post('/get-user-need-update', AuthController.getUserNeedUpdate);
  router.post('/update-user', AuthController.updateUser)
  router.post('/add-new-user', AuthController.addNewUser)
  router.post('/sign-in', AuthController.handleSignIn)
  router.get('/manage/get-all-user', AuthController.getAllUsers);
  router.delete('/manage/delete-user/:id', AuthController.deleteUser)


  router.get('/get-all-table', TableController.getAllTable)
  router.post('/manage/add-new-table', TableController.addNewTable)
  router.put('/manage/edit-table', TableController.editTable);
  router.delete('/manage/delete-table', TableController.deleteTable);
  router.put('/manage/reset-table', TableController.resetTable);
  router.post('/order-table', TableController.orderTable)
  router.delete('/manage/delete-order-table/:id', TableController.deleteOrderTable)
  router.get('/manage/get-all-order-table', TableController.getAllOrderTable)
  router.post('/get-table-need-update', TableController.getTableNeedUpdate)
  router.post('/update-table', TableController.updateTable)
  // admin accept table
  router.put('/manage/accept-table', TableController.acceptTable);


  
  router.post('/manage/add-new-food', APIController.addNewFood)
  router.get('/get-all-food', APIController.getAllFood);
  router.put('/manage/edit-food', APIController.editFood);
  router.delete('/manage/delete-food/:id', APIController.deleteFood);
  router.post('/get-food-need-update', APIController.getFoodNeedUpdate);

  router.post('/order-food', APIController.orderFood)
  // router.get('/manage/get-all-order-food', APIController.getAllOrderFood)
  router.delete('/manage/delete-order-food/:id', APIController.deleteOrderFood)
  // router.post('/handle-upload-file', upload.single('myFile'), APIController.handleUploadFile)

  // ----update table invoice with food order
  router.post('/update-invoice', APIController.updateInvoice);


  
  
  // history
  router.post('/add-history-booking', APIController.addHistoryBooking)
  router.get('/get-all-history', APIController.getAllHistory)
  
  router.get('/get-data-chart',APIController.getDataChart)
  return app.use('/api/v1', router)
}
module.exports = APIRoute;