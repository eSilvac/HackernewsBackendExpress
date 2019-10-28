const mongoose = require('mongoose')
const Schema = mongoose.Schema

let userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "is required"],
    unique: true
  },

  email: {
    type: String,
    required: [true, "is required"],
    unique: true
  },

  password: {
    type: String,
    required: [true, "is required"]
  },

  posts: [{ type: Schema.ObjectId, ref: 'Post'}]
});

module.exports = mongoose.model("User", userSchema)
