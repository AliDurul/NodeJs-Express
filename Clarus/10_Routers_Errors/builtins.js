"use strict";
/* -------------------------------------------------------
    EXPRESSJS - BUILTIN MIDDLEWARES
------------------------------------------------------- */

const express = require("express");
const app = express();

require("dotenv").config();
const PORT = process.env.PORT || 8000;

/* ------------------------------------------------------- */

/* Data Receiving */
//? Read json data
app.use(express.json())
//? Read text data
app.use(express.text())
//? Read form data
// extended must be define. (if true, it supported nested form-data.)
app.use(express.urlencoded({ extended: true })) 

//? receive sent-data with req.body:
app.all('/', (req, res) => {
    res.send({
        received: true,
        body: req.body
    })
})

/* Call staticFiles from real-path */
app.use('/img', express.static('./public/images'))

/* ------------------------------------------------------- */

app.listen(PORT, () => console.log("Running: http://127.0.0.1:" + PORT));