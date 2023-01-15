const mongoose = require("mongoose");
const todoSchema = new mongoose.Schema({
  text: String,
  isCompleted: Boolean,
});
const Todo = mongoose.model("Todo", todoSchema);
module.exports = Todo;
