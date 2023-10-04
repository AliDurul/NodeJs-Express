"use strict";
/* -------------------------------------------------------
    EXPRESSJS - TODO Project with Sequelize
------------------------------------------------------- */

const express = require("express");
const app = express();

require("dotenv").config();
const PORT = process.env.PORT || 8000;

app.use(express.json())

app.use(require('./app/routes/todo'))




const dbConnection = require('./app/dbConnections')
dbConnection()

app.use(require("./app/errorHandler"))

app.listen(PORT, () => console.log("Running: http://127.0.0.1:" + PORT));
