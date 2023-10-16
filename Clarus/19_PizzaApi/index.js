"use strict";
/* -------------------------------------------------------
    NODEJS EXPRESS | CLARUSWAY FullStack Team
------------------------------------------------------- */

const express = require("express");
const app = express();

/* ------------------------------------------------------- */
// Required Modules:

// envVariables to process.env:
require("dotenv").config();
const PORT = process.env?.PORT || 8000;

// asyncErrors to errorHandler:
require("express-async-errors");

/* ------------------------------------------------------- */
// Configrations:

// Connect to DB:
require("./src/configs/dbConnection")();

/* ------------------------------------------------------- */
// Middlewares:
app.use(express.json());

app.use(require("./src/middlewares/logger"));

app.use(require("./src/middlewares/findSearchSortPage"));

/* ------------------------------------------------------- */
// Routes:

// Home path
app.get("/", (req, res) => {
  res.send({
    error: false,
    message: "Welcome to Pizaa API",
  });
});

// Auth
app.use("/auth", require("./src/routes/auth"));
// User
app.use("/users", require("./src/routes/user"));
// Topping
app.use("/topping", require("./src/routes/topping"));
// Pizza
app.use("/pizzas", require("./src/routes/pizza"));
// Order
app.use("/orders", require("./src/routes/order"));
/* ------------------------------------------------------- */

// errorHandler:
app.use(require("./src/middlewares/errorHandler"));

// RUN SERVER:
app.listen(PORT, () => console.log("http://127.0.0.1:" + PORT));
