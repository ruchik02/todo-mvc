const express=require('express');
const app=express();
const port=8000;
const path=require('path');
const fs=require('fs');
const staticPath=path.join(__dirname,"../public");
app.use(express.static(staticPath));
app.use(express.json());
app.use(express.urlencoded({ extended: false }))
app.get('/', async (req, res) => {
    try {
        let response = await fetch('db.json');
        let todos = await response.json();
        res.status(200).json(todos);
        fs.readFile('db.json',(err,data)=>{
            if(err) throw err;
            let jsonData=JSON.parse(data);
          })
        console.log(todos,"14");
    } catch (err) {
        console.error(err);
        let data = await fs.promises.readFile('db.json', 'utf8');
        let todos = JSON.parse(data);
        res.status(200).json(todos);
        console.log(todos,"20");
    }
});
app.post('/addtodos', async (req, res) => {
    try {
        let result=req.body.todo;
        const text=req.body.text;
        const isCompleted = req.body.isCompleted;
        let response = await fetch('db.json');
        let todos = await response.json();
        const todo = {
            task: result,
            isCompleted: false,
            id:Date.now()
          };
        // todos.push(todo);
        await fetch('db.json', {
            method: 'PUT',
            body: JSON.stringify(todos),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        // res.status(201).send("To-do item added successfully");
        res.redirect('/');
    } catch (err) {
        console.error(err);
        let data = await
         fs.promises.readFile('db.json', 'utf8');
        let todos = JSON.parse(data);
        // todos.push(todo);
        await fs.promises.writeFile('db.json', JSON.stringify(todos));
        res.status(201).send("To-do item added successfully");
    }
});


app.listen(port,()=>{
    console.log(`listening to port no. ${port} `);
})
