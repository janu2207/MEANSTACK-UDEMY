const path = require('path')
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mongoose = require('mongoose');
const postRoutes = require('./routes/posts');
const userRoutes = require('./routes/user')
mongoose.connect ("mongodb+srv://janu2207:"+process.env.MONGO_ATLAS_PASSWORD+"@cluster0-sgdxc.mongodb.net/test").then(()=>{
  console.log("Connected to db");
}).catch((error)=>{
  console.log("Connection failed");
})
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use("/images",express.static(path.join("backend/images")));
app.use("/",(req,res,next)=>{
  res.setHeader("Access-Control-Allow-Origin","*");
  res.setHeader("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept, Authorization")
  res.setHeader("Access-Control-Allow-Methods",
  "GET, POST, PATCH, PUT, DELETE, OPTIONS, PUT")
  next();
})




app.use("/api/posts",postRoutes);

app.use("/api/user",userRoutes);


module.exports = app;
