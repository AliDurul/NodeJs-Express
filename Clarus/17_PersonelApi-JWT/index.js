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

/* ------------------------------------------------------- */
//* Required Modules:

// envVariables to process.env:
require("dotenv").config();
const PORT = process.env?.PORT || 8000;

// asyncErrors to errorHandler:
require("express-async-errors");

/* ------------------------------------------------------- */
// Configrations:

// Connect to DB:
const { dbConnection } = require("./src/configs/dbConnection");
dbConnection();

/* ------------------------------------------------------- */
//* Middlewares:

// Accept JSON:
app.use(express.json());

// SessionsCookies:
app.use(require("cookie-session")({ secret: process.env.SECRET_KEY }));

// res.getModelList():
app.use(require("./src/middlewares/findSearchSortPage"));

// Authentication with JWT:
app.use(require('./src/middlewares/authenticated'));

/* ------------------------------------------------------- */
//* Routes:

// HomePath:
app.all("/", (req, res) => {
  res.send({
    error: false,
    message: "Welcome to PERSONNEL API",
    isLogin: req.isLogin,
    user: req.user,
  });
});

//auth
app.use("/auth", require("./src/routes/authRouter"));
// /departments
app.use("/departments", require("./src/routes/department.router"));
// /personnels
app.use("/personnels", require("./src/routes/personnel.router"));

/* ------------------------------------------------------- */

// errorHandler:
app.use(require("./src/middlewares/errorHandler"));

// RUN SERVER:
app.listen(PORT, () => console.log("http://127.0.0.1:" + PORT));

/* ------------------------------------------------------- */
// Syncronization (must be in commentLine):
// require('./src/helpers/sync')()
