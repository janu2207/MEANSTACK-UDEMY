const express = require('express');

const router = express.Router();

const Post = require('../models/post');



router.post("",(req,res,next)=>{
  const post = new Post({
    _id :req.body.id,
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

  router.get("/:id",(req,res,next)=>{
    Post.findById(req.params.id).then((post)=>{
      if(post){
        res.status(200).json(post);

      }
      else{
        res.status(404).json({message:'post not found'});
      }
    })
  })

  router.put("/:id",(req,res,next)=>{
    const post = new Post({
      _id: req.body.id,
      title: req.body.title,
      content: req.body.content
    });
    Post.updateOne({_id:req.params.id},post).then((result)=>{
      console.log(res);
      res.status(200).json({message:"Update successful!"})
    })
  })

  router.get('',(req,res,next)=>{
    Post.find().then((posts)=>{

    res.status(200).json({
      message:'Posts retrieved seuucess',
      posts:posts
    });
    })


    });

    router.delete("/:id",(req,res,next)=>{
    console.log(req.params.id)
    Post.deleteOne({_id:req.params.id}).then(result=>{
      console.log(result);
      res.status(200).json({message:'post deleted'});

    })
  });

  module.exports = router;