const path = require('path')
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mongoose = require('mongoose');
const postRoutes = require('./routes/posts');
mongoose.connect ("mongodb+srv://janu2207:Jalend12@cluster0-sgdxc.mongodb.net/test?retryWrites=true").then(()=>{
  console.log("Connected to db");
}).catch((error)=>{
  console.log("Connection failed");
})
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use("/images",express.static(path.join("backend/images")));
app.use("/",(req,res,next)=>{
  res.setHeader("Access-Control-Allow-Origin","*");
  res.setHeader("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept")
  res.setHeader("Access-Control-Allow-Methods",
  "GET, POST, PATCH, PUT, DELETE, OPTIONS, PUT")
  next();
})



app.use("/api/posts",postRoutes);



module.exports = app;
