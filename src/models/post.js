const mongoose = require('mongoose')
const Schema = mongoose.Schema

let projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "is required"]
  },
  
  url: {
    type: String,
    required: [true, "is required"]
  },
  
  createdAt: Date,

  _user: { type: Schema.Types.ObjectId, ref: 'User'}
});

module.exports = mongoose.model("Project", projectSchema)
