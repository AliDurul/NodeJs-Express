const mongoose = require('mongoose')


mongoose.connect(process.env.MONGODB )
    .then(() => {
      console.log('* DB connected *'); 
    })
    .catch(() => {
      console.log('DB NOT CONNECTED');
    })

