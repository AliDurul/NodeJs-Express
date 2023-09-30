const express = require("express");
const app = express();

require("dotenv").config();
const PORT = process.env.PORT || 8000;

/* ===================================================== *

app.get("/user/:id", (req, res) => {

  const id = req.params.id ?? 0;

  try {
    if (isNaN(id)) {
      res.statusCode = 400;
      throw new Error("ID is Not A Number", { cause: "params.id=" + id });
    } else {
      res.send({
        error: false,
        id: id,
      });
    }
  } catch (err) {
    res.send({
        error: true,
        message: err.message,
        cause: err.cause
      });
  }
});

/* ------------------------------------------------------------ */

app.get("/user/:id", (req, res) => {
  const id = req.params.id ?? 0;

  if (isNaN(id)) {
    res.statusCode = 400;
    throw new Error("ID is Not A Number", { cause: "params.id=" + id });
  } else {
    res.send({
      error: false,
      id: id,
    });
  }
});

const errorHandeler = (err, req, res, next) => {
  console.log("errorHandler runned");

  const statusCode = res.statusCode ?? 500;

  res.status(statusCode).send({
    error: true,
    message: err.message,
    cause: err.cause,
  });
};

app.use(errorHandeler);

/* ===================================================== */

app.listen(PORT, () => console.log("Running: http://127.0.0.1:" + PORT));
