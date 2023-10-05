"use strict"
/* -------------------------------------------------------
    EXPRESSJS - BLOG Project with Mongoose
------------------------------------------------------- */
/*
 * $ npm init -y
 * $ npm i express dotenv express-async-errors
 * $ npm i mongoose
*/

const express = require('express')
const app = express()

require('dotenv').config()
const PORT = process.env.PORT || 8000

/* ------------------------------------------------------- */

app.use(express.json())




app.all('/', (req, res) => {
    res.send('WELCOME TO BLOG API')
})



require('./src/dbConnection')


app.use(require("./src/errorHandler"))
app.listen(PORT, () => console.log('Running: http://127.0.0.1:' + PORT))