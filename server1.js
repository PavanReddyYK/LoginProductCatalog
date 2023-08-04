
const express = require("express");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");
// const mysql = require("mysql2");
const port = 8445;
const controller = require('./controller/control1')

app.engine("html", require("ejs").renderFile);
app.set("view engine", "ejs");
app.set("views",path.join(__dirname,"Public","html"))
app.use(express.static(path.join(__dirname,"Public")))
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/',(req,res)=>{ 
    res.render('index.html');  // default EndPoint
}) 

app.post('/login', (req,res)=>{
    controller.login(req,res);
})

app.get('/home', (req,res)=>
{
    controller.dashboard(req,res)
})

app.post('/fetchData',(req,res)=>{
    controller.fetchData(req,res)
})

app.get('/Details',(req,res)=>{
    controller.displayData(req,res)
})

app.post('/showDetails',(req,res)=>{
    controller.showData(req,res)
})

app.post('/update',(req,res)=>{
    controller.updateData(req,res)
})

app.post('/deleteData',(req,res)=>{
    controller.deleteData(req,res)
})


app.listen(port,()=>{
    console.log(`server running on http://localhost:${port}`);
})