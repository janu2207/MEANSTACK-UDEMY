const express = require('express');
const app = express();


app.use('/api/posts',(req,res,next)=>{
  const posts=[
    {id:'1234',title:'First serverisde post',content:'From server'},
    {id:'123',title:'Sec serverisde post',content:'From server'}

  ];
  res.status(200).json({
    message:'Posts seuucess',
    posts:posts
  });
  });

module.exports = app;
