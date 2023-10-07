"use strict"
/* -------------------------------------------------------
    EXPRESSJS - BLOG Project with Mongoose
------------------------------------------------------- */

const express = require('express')
const app = express()

require('dotenv').config()
const PORT = process.env.PORT || 8000

/* ------------------------------------------------------- */

app.use(express.json()) //?convert json to object


require('./src/dbConnection') //?db connection


//? home page
app.all('/', (req, res) => { 
    res.send('WELCOME TO BLOG API')
})

app.use('/user', require('./src/routes/userRoute'))
app.use('/blog', require('./src/routes/blogRoute'))




/* ------------------------------------------------------- */

app.use(require("./src/errorHandler"))
//sync
// require('./src/sync')()
app.listen(PORT, () => console.log('Running: http://127.0.0.1:' + PORT))