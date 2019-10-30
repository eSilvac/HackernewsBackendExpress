const jwt = require('jsonwebtoken');
const path = require('path');
const express = require('express');

const router = express.Router();

// Model
const User = require('../models/user');

// Middleware
const isLoggedIn = require("../middleware/isLoggedIn");
const checkValid = require("../middleware/checkValid");

router.get('/current-user', async (req, res, next) => {
  const token = req.headers["authorization"];
  
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    const userId = payload.userId;
    const user = await User.findById(userId, "_id email username");
    if (user) {
      res.status(200).json(user);

    } else {
      res.status(204).json({ msg: "User not found" });
    }
  } catch (err) {
    res.status(204).json({ msg: "User not found" });
  }
});

router.get('/user/:id', checkValid.requestBody, async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id, "email username");
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
});

router.post('/users', checkValid.requestBody, async (req, res, next) => {
  try {
    const user = await User.create(req.body)
    const token = jwt.sign({
      userId: user._id,
      exp: Math.floor(Date.now() / 1000) + (60 * 60)
    }, process.env.JWT_SECRET);
    

    res.status(201).json({ token });
  } catch (err) {
    next(err); 
  }
});

router.post('/session', checkValid.requestBody, async (req, res, next) => {
  try {
    const user = await User.findOne(req.body)
    
    if (user) {
      const token = jwt.sign({
        userId: user._id,
        exp: Math.floor(Date.now() / 1000) + (60 * 60)
      }, process.env.JWT_SECRET);
      
      res.status(201).json({ token });
    } else {
      res.status(404).json({ error: "User not found." });
    }
      
  } catch (err) {
    next(err);  
  }
});


module.exports = router;
