const express = require('express')
const app = express()

require('dotenv').config()
const PORT = process.env.PORT 


app.use(express.json())


app.all('/',(req,res) => {
  res.send({
    msg:'this is home'
  })
})


app.listen(PORT, console.log('-- Server is running --'))