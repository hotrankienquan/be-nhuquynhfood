import express from "express";
import bodyParser from "body-parser"; // lay cac tham so tu client
import cors from 'cors';

import APIRoute from './route/api'
require("dotenv").config();

let app = express();
app.use(cors())
app.use(function (req, res, next) {
  // cho phép URL_REACT nào đc phép gọi đến api
  // Website you wish to allow to connect
  res.setHeader("Access-Control-Allow-Origin", "*");

  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );

  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );

  res.setHeader("Access-Control-Allow-Credentials", true);

  next();
});


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
APIRoute(app);

// connectDB();
let port = process.env.PORT || 6969;
// port === undefined => gan port = 6969
app.listen(port, () => {
  //callback
  console.log("backend nodejs is running in the port: ", port);
});
