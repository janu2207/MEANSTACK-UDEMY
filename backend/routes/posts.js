const express = require('express');


const postController = require('../controllers/posts');

const router = express.Router();
const checkAuth = require('../middleware/check-auth')

const extractFile = require('../middleware/file')



router.post("",checkAuth,
extractFile,postController.createPost)

  router.get("/:id",postController.getPost
  )

  router.put("/:id",
  checkAuth,
  extractFile,postController.updatePost
)

  router.get('',postController.getPosts);


    router.delete("/:id",checkAuth,postController.deletePost);

  module.exports = router;
