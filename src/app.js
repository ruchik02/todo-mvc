const express=require('express');
require('./database')
const router=require('./route');
const app=express();
const port=8000;
const path=require('path');
const staticPath=path.join(__dirname,"../public");
app.use(express.static(staticPath));
app.use(express.urlencoded({ extended: false }))
app.use(router);
app.listen(port,()=>{
    console.log(`listening to port no. ${port} `);
});