const Post = require('../models/post');
const User = require('../models/user');
const express = require('express');
const router = express.Router();

const isLoggedIn = require("../middleware/isLoggedIn");
const checkValid = require("../middleware/checkValid");

// List posts
router.get('/posts', async (req, res, next) => {
  try {
    const posts = await Post.find();
    res.status(200).json(posts);  
  } catch (err) {
    next(err);   
  }
});

// Show Post
router.get('/posts/:id', checkValid.requestParams, async (req, res, next) => {
  try {
    console.log(req.params)
    const post = await Post.findById(req.params.id);
    res.status(200).json(post); 
  } catch (err) {
    next(err);   
  }
});

// Create Post
router.post('/posts', isLoggedIn, checkValid.requestBody, async (req, res, next) => {
  let newProject = req.body;
  newProject._user = req.currentUser;
  newProject.createdAt = new Date();
  
  try {
    const post = await Post.create(newProject)
    res.status(200).json(post);  
  } catch (err) {
    next(err);       
  }
});

// Update post
router.patch('/posts/:id', isLoggedIn, checkValid.requestBody, checkValid.requestParams, async (req, res, next) => {
  try {
    const post = await Post.findOneAndUpdate({_id: req.params.id}, req.body)
    res.status(200).json(post); 
  } catch (err) {
    next(err);   
  }
});

// Delete Post
router.delete('/posts/:id', isLoggedIn, checkValid.requestParams, async (req, res, next) => {
  try {
    const post = await Post.findOne({_id: req.params.id});
    if (post) {
      await post.remove();
      res.status(204).json({message: "ok"});
    } else {
      res.status(404).json({error: "Post not found"});
    }
  } catch (err) {
    next(err);   
  }
});

module.exports = router;

const getUserName = async (actualPost) => {
  const user = await User.findById(actualPost._user)
  return user.username
}
