const mongoose = require("mongoose");
require("dotenv").config();

mongoose.set("strictQuery", "false");
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("connection successful"))
  .catch((err) => console.log(err));
