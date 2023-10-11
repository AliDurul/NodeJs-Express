const express = require('express')
const app = express()

require('dotenv').config()
const PORT = process.env.PORT 

app.use(express.json())

require('./src/dbConnection')


app.all('/',(req,res) => {
  res.send({
    msg:'this is home'
  })
})


app.use(require('./src/errorHandler'))

app.listen(PORT, console.log('-- Server is running --'))