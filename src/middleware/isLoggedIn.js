const jwt = require('jsonwebtoken');
const User = require('../models/user');

const requireUser = async (req, res, next) => {
  const token = req.headers["authorization"];
  
  if (token == null) {
    res.status(401).json({ error: "No Authorized" });
  } else {
    try {
      const payload = jwt.verify(token, process.env.JWT_SECRET);
      const userId = payload.userId;
      const user = await User.findOne({ _id: userId });
      if (user) {
        console.log("Usuario válido");
        req.currentUser = userId
        next();
      } else {
        res.status(404).json({ error: "User not found" });
      }

    } catch (err) {
      console.log("asdsa")
      console.log(err)
      res.status(401).json({ error: "Invalid token" });
    }
  }
}

module.exports = requireUser;
