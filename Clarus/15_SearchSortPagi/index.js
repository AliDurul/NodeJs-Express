"use strict";
/* -------------------------------------------------------
    EXPRESSJS - BLOG Project with Mongoose
------------------------------------------------------- */

const express = require("express");
const app = express();

require("dotenv").config();
const PORT = process.env.PORT || 8000;

/* ------------------------------------------------------- */
// SessionCookies:
// https://www.npmjs.com/package/cookie-session
//* $ npm i cookie-session

const session = require("cookie-session");

app.use(
  session({
    // name:cookie,
    secret:process.env.SECRET_KEY,
    maxAge: 1000 * 60 * 60 * 24
  })
);

/* ------------------------------------------------------- */

app.use(express.json()); //?convert json to object

require("./src/dbConnection"); //?db connection

//? home page
app.all("/", (req, res) => {
  res.send("WELCOME TO BLOG API");
});

app.use("/user", require("./src/routes/userRoute"));
app.use("/blog", require("./src/routes/blogRoute"));

/* ------------------------------------------------------- */

//! sync
// require('./src/sync')()


app.use(require("./src/errorHandler"));
app.listen(PORT, () => console.log("Running: http://127.0.0.1:" + PORT));
