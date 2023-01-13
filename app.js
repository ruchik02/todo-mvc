const express = require("express");
const app = express();
const port = 8000;
const path = require("path");
const fs = require("fs");
const staticPath = path.join(__dirname, "../public");
app.use(express.static(staticPath));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", async (req, res) => {
  try {
    let response = await fs.promises.readFile("src/db.json", "utf8");
    let todos = await JSON.parse(response);
    res.status(200).json(todos);
    fs.readFile("src/db.json", (err, data) => {
      if (err) throw err;
      let jsonData = JSON.parse(data);
    });
    console.log(todos, "14");
  } catch (err) {
    console.error(err);
  }
});

app.post("/addtodos", async (req, res) => {
  try {
    const text = req.body.text;
    const isCompleted = req.body.isCompleted;
    let response = await fs.promises.readFile("src/db.json", "utf8");
    let todos = await JSON.parse(response);
    const todo = {
      task: text,
      isCompleted: isCompleted,
      id: Date.now(),
    };
    todos.push(todo);
    await fs.promises.writeFile("src/db.json", JSON.stringify(todos));
    // res.status(201).send("To-do item added successfully");
    res.redirect("/");
  } catch (err) {
    console.error(err);
  }
});

app.listen(port, () => {
  console.log(`listening to port no. ${port} `);
});
