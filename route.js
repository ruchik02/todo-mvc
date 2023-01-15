const express = require("express");
const app = express();
const Todo = require("./todo");
const router = express.Router();
app.use(router);
router.get("/gettodos", async (req, res) => {
  const result = await Todo.find();
  console.log(result);
  res.send(result);
});
router.post("/addtodo", async (req, res) => {
  try {
    console.log(req.body);
    const text1 = req.body.text;
    const isCompleted = req.body.completed;
    if (text1.trim() != "") {
      const todo = new Todo({
        text: text1,
        completed: isCompleted,
      });
      const todo1 = await todo.save();
      const todos = await Todo.find();
      res.send(todos);
    } else {
      console.log(todo);
    }
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});

module.exports = router;
