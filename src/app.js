const express = require("express");
const app = express();
const port = 8000;
const path = require("path");
const fs = require("fs");
const staticPath = path.join(__dirname, "../public");
app.use(express.static(staticPath));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
let todo=[];
// get todos
app.get("/gettodos", async (req, res) => {
  try {
    let response = await fs.promises.readFile("src/db.json", "utf8");
    let todos = await JSON.parse(response);
    res.status(200).json(todos);
    fs.readFile("src/db.json", (err, data) => {
      if (err) throw err;
      let jsonData = JSON.parse(data);
      console.log(jsonData,"19")
    });
    console.log(todos, "20");
  } catch (err) {
    console.error(err);
  }
});
// post add list items
app.post("/addtodo", async (req, res) => {
  try {
    const text = req.body.text;
    const completed = req.body.completed;
    let response = await fs.promises.readFile("src/db.json", "utf8");
    let todos = await JSON.parse(response);
    const todo = {
      text: text,
      completed: completed,
      id: Date.now(),
    };
    todos.push(todo);
    await fs.promises.writeFile("src/db.json", JSON.stringify(todos));
    res.send(todos);
  } catch (err) {
    console.error(err);
  }
});
// delete item
app.delete("/removetodo/:id",async(req,res)=>{
  try {
    let response = await fs.promises.readFile("src/db.json", "utf8");
    let todos = await JSON.parse(response);
    let id= req.params.id;
    console.log(id,"48");
    fs.readFile('src/db.json',(err,data)=>{
      if(err)
      throw err;
      let jsonData=JSON.parse(data);
      jsonData.splice(id,1);
      fs.writeFile('src/db.json', JSON.stringify(jsonData), (err) => {
        if (err) throw err;
        console.log('Data written to file');
        console.log("58",jsonData)
      });
    });
    console.log("Todo is deleted Successfully!");
    res.send(todos);
  }
   catch (error) {
    res.send(error); 
  }
  });


app.listen(port, () => {
  console.log(`listening to port no. ${port} `);
});