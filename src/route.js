const express=require('express');
const app=express();
const Todo=require('./todo');
const router=new express.Router();
app.use(router);
module.exports=router;
