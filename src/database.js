const mongoose = require("mongoose");
const link="mongodb+srv://ruchi:ruchika@cluster0.p47ebfa.mongodb.net/test";
mongoose.set('strictQuery','false');
mongoose.connect(link, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(()=>
    console.log("connection successful")
).catch((err)=>
console.log(err));
