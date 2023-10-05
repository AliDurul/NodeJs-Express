const mongoose = require('mongoose')


mongoose.connect(process.env.MONGODB || "mongodb://127.0.0.1:27017/" )
    .then(() => {
      console.log('* DB connected *'); 
    })
    .catch(() => {
      console.log('DB NOT CONNECTED');
    })

