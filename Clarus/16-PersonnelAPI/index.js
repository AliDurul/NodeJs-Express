"use strict"
/* -------------------------------------------------------
    EXPRESS - Personnel API
------------------------------------------------------- */
/*
    $ npm i express dotenv mongoose express-async-errors
    $ npm i cookie-session
    $ npm i jsonwebtoken
*/

const express = require('express')
const app = express()

/* ------------------------------------------------------- */

//? REQUIRED MODULES
require('dotenv').config()
const PORT = process.env?.PORT

//? ASYNCERROR 
require('express-async-errors')

//?DB CONNECTION
const {dbConnection} = require('./src/configs/dbConnection')
dbConnection()

//? ACCEPT JSON
app.use(express.json())

//? SESSION COOKIES
app.use(require('cookie-session')({secret:process.env.SECRET_KEY}))

//? res.getModelList()
app.use(require('./src/middlewares/findSearchSortPage'))

//? HomePath:
app.all('/', (req, res) => {
    res.send({
        error: false,
        message: 'Welcome to PERSONNEL API',
    })
})








/* ------------------------------------------------------- */
//? errorHandler:
app.use(require('./src/middlewares/errorHandler'))

//? RUN SERVER:
app.listen(PORT, () => console.log('http://127.0.0.1:' + PORT))

/* ------------------------------------------------------- */
// Syncronization (must be in commentLine):
// require('./src/helpers/sync')()