"use strict";
/* -------------------------------------------------------
    EXPRESS - Personnel API
------------------------------------------------------- */
/*
    $ npm i express dotenv mongoose express-async-errors
    $ npm i cookie-session
    $ npm i jsonwebtoken
*/

const express = require("express");
const app = express();

//* ------------------------------------------------------- */
//* required modules:

// .env config
require("dotenv").config();
const PORT = process.env.PORT;

// async errors
require("express-async-errors");

// db connection
const { dbConnection } = require("./src/configs/dbConnection");
dbConnection();

//* ------------------------------------------------------- */
//* Middlewares: 

// accept json
app.use(express.json())

// session cookies
app.use(require('cookie-session')({secret:process.env.SECRTET_KEY}))

// search-Sort-Pagination
app.use(require('./src/middlewares/findSearchSortPage'))

//* ------------------------------------------------------- */
//* Routes: 
 
app.use(require('./src/routes/department.router'))
app.use(require('./src/routes/personnel.router'))



//* ------------------------------------------------------- */

// errorHandler:
app.use(require("./src/middlewares/errorHandler"));

// RUN SERVER:
app.listen(PORT, () => console.log("http://127.0.0.1:" + PORT));

/* ------------------------------------------------------- */
// Syncronization (must be in commentLine):
// require('./src/helpers/sync')()
