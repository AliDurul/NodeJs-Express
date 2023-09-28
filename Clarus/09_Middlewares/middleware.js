"use strict";

const express = require("express");
const app = express();

require("dotenv").config();
const PORT = process.env.PORT || 8000;

//--------------------------------

app.get("/", (req, res, next) => {
    
  req.inReq = "custom data";
  res.InResponse = "custom data response";

  next();

  res.send({
    msg: "middleware...",
  });
});

app.get("/", (req, res, next) => {
    

  res.send({
    msg: "ortadaki",
  });
});

app.get("/", (req, res) => {
  res.send({
    customData: [req.inReq, res.InResponse],
    msg: "welcome",
  });
});

app.listen(PORT, () => console.log("Running: http://127.0.0.1:" + PORT));
