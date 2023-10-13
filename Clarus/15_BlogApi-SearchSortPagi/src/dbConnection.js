

const mongoose = require("mongoose");

mongoose.connect(process.env.MONGODB) 
  .then(()=>console.log("* DB Connected *"))
  .catch(()=>console.log("* DB Not Connected *"));
