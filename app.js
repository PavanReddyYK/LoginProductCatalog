const express = require("express");
const app = express()
const port = 4546
const path = require("path");
const bodyParser = require('body-parser')
const {users,products,sessions}=require('./helper/DB');
// const mysql = require('mysql') 

app.engine("html", require("ejs").renderFile);
app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())


const mysql = require("mysql2");
let dateNow = new Date    // toLocalString()              toLocal()

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "training1",
});

connection.connect((err) => {
  if (err) {
    return console.error("Error connecting to MySQL:", err);
  }
  console.log("Connected to MySQL database!");
});

const insertQuery =
  "INSERT INTO user_info (user_id, user_name, user_phone,user_password, user_address,user_type,created_ts, updated_ts) VALUES (?, ?, ?, ?, ?, ?,?,?)";
users.forEach((user) => {
  const insertData = [
    user.user_id,
    user.user_name,
    user.user_phone,
    user.user_password,
    user.user_address,
    user.user_type,
    dateNow,
    dateNow
  ];
// const insertQuery =
//   "INSERT INTO product_info (product_id, product_name, product_image, product_desc, product_price, product_currency,created_ts, updated_ts) VALUES (?, ?, ?, ?, ?, ?,?,?)";
// products.forEach((product) => {
//   const insertData = [
//     product.product_id,
//     product.product_name,
//     product.product_image,
//     product.description,
//     product.price,
//     product.currency,
//     dateNow,
//     dateNow
//   ];

// const insertQuery =
//   "INSERT INTO session_info (session_id, user_id, created_ts, updated_ts) VALUES (?, ?, ?, ?)";
// sessions.forEach((id) => {
//   const insertData = [
//     id.session_id,
//     id.user_id,
//     dateNow,
//     dateNow
//   ];


  connection.query(insertQuery, insertData, (err, result) => {
    if (err) {
      console.error("Error inserting data:", err);
    }
  });
});

// connection.end((err) => {
//     if (err) {
//       console.error('Error closing the database connection:', err);
//     } else {
//       console.log('Database connection closed!');
//     }
//   });
  