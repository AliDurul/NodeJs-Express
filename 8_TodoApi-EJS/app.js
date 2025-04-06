"use strict";
/* -------------------------------------------------------
    EXPRESSJS - TODO Project with Sequelize
------------------------------------------------------- */

const express = require("express");
const app = express();

require("dotenv").config();
const PORT = process.env.PORT || 8000;

/* ------------------------------------------------------- */
// TEMPLATE:
// npm i ejs
// https://ejs.co/
// https://www.npmjs.com/package/ejs
// https://github.com/mde/ejs/wiki/Using-EJS-with-Express

app.set('view engine', 'ejs')
// Default folder: './views'
app.set('views', './public')

/* ------------------------------------------------------- */
// Accept json data & convert to object:
app.use(express.json())

// Accept form data & convert to object:
app.use(express.urlencoded({ extended: true })) // Allow array-form-elements

// Router:
app.all('/', (req, res) => {

    // call ejs file in ./views/
    // res.render('index.ejs')
    res.render('index')

})

app.use('/view', require('./app/routes/todoTemplate'))
app.use('/api', require('./app/routes/todo'))

// DatabaseConnection:
const { dbConnection } = require('./app/dbConnection')
dbConnection() // sequelize.sync() must run after model defines.

// errorHandler (Catch Errors):
app.use(require('./app/errorHandler'))

/* ------------------------------------------------------- */
app.listen(PORT, () => console.log("Running: http://127.0.0.1:" + PORT));