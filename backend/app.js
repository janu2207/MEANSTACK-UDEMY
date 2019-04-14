const express = require('express');
const bodyParser = require('body-parser');
const Post = require('./models/post');
const app = express();
const mongoose = require('mongoose');
mongoose.connect ("mongodb+srv://janu2207:Jalend12@cluster0-sgdxc.mongodb.net/test?retryWrites=true").then(()=>{
  console.log("Connected to db");
}).catch((error)=>{
  console.log("Connection failed");
})
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.use("/",(req,res,next)=>{
  res.setHeader("Access-Control-Allow-Origin","*");
  res.setHeader("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept")
  res.setHeader("Access-Control-Allow-Methods",
  "GET, POST, PATCH, DELETE, OPTIONS, PUT")
  next();
})

app.post("/api/posts",(req,res,next)=>{
const post = new Post({
  title:req.body.title,
  content :req.body.content
})
console.log(post);
post.save().then(result=>{
  res.status(201).json({
    message:'Post added ',
    postId: result._id
  });
});


})
app.get('/api/posts',(req,res,next)=>{
  Post.find().then((posts)=>{

  res.status(200).json({
    message:'Posts retrieved seuucess',
    posts:posts
  });
  })


  });

app.delete("/api/posts/:id",(req,res,next)=>{
  console.log(req.params.id)
  Post.deleteOne({_id:req.params.id}).then(result=>{
    console.log(result);
    res.status(200).json({message:'post deleted'});

  })
});

module.exports = app;
