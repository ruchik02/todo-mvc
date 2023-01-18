const express = require("express");
const app = express();
const port = 8080;
const path = require("path");
const fs = require("fs");
const staticPath = path.join(__dirname, "../public");
app.use(express.static(staticPath));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
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
    console.log(todos, "21");
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
  try{
    let response = await fs.promises.readFile("src/db.json", "utf8");
    let todos = await JSON.parse(response);
    let id= req.params.id;
    console.log(id,"51");
    const filterData=todos.filter((item)=>item.id!=id);
    await fs.promises.writeFile('src/db.json', JSON.stringify(filterData));
    res.send(filterData);
  }catch(err){
    res.send(err);
  }
});
// clear completed
app.get("/clearcompleted",async(req,res)=>{
  try{
    let response=await fs.promises.readFile('src/db.json','utf-8');
    let todos=await JSON.parse(response);
    const filterData = todos.filter(item => item.completed);
    console.log(filterData,"65");
    await fs.promises.writeFile('src/db.json',JSON.stringify(filterData));
   res.send(filterData);
  }catch(err){
    res.send(err);
  }
 });
//  checked functionality
app.patch("/markcomplete/:id",async(req,res)=>{
  try {
    let response=await fs.promises.readFile('src/db.json','utf-8');
    let todos=await JSON.parse(response);
    let id=req.params.id;
    let todo = todos.find(item => item.id === parseInt(id));
    if (todo) {
        todo.completed = true;
    }
   await fs.promises.writeFile('src/db.json',JSON.stringify(todos));
   res.send(todos);
  }catch(err){
    res.send(err);
  }
})
// markuncompleted
app.patch("/markuncomplete/:id",async(req,res)=>{
  try {
    let response=await fs.promises.readFile('src/db.json','utf-8');
    let todos=await JSON.parse(response);
    let id=req.params.id;
    let todo = todos.find(item => item.id === parseInt(id));
    if (todo) {
        todo.completed = false;
    }
    await fs.promises.writeFile('src/db.json',JSON.stringify(todos));
   res.send(todos);
  } catch (error) {
    res.send(error);
  }
})
//  markallcompleted
app.get("/markallcompleted",async(req,res)=>{
  let response=await fs.promises.readFile('src/db.json','utf-8');
  let todos=await JSON.parse(response);
  for(let i=0;i<todos.length;i++)
  {
    if(todos[i].completed==false)
    todos[i].completed=true;
    console.log(todos[i],"113");
  }
  await fs.promises.writeFile('src/db.json',JSON.stringify(todos));
  res.send(todos);
})

// uncompleted
app.get("/markalluncompleted",async(req,res)=>{
  let response=await fs.promises.readFile('src/db.json','utf-8');
  let todos=await JSON.parse(response);
  for(let i=0;i<todos.length;i++)
  {
    if(todos[i].completed==true)
    todos[i].completed=false;
    console.log(todos[i],"128");
  }
  await fs.promises.writeFile('src/db.json',JSON.stringify(todos));
  res.send(todos);
})

app.listen(port, () => {
  console.log(`listening to port no. ${port} `);
});