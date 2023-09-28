"use strict";

const express = require("express");
const app = express();

require("dotenv").config();
const PORT = process.env.PORT || 8000;

//! --------------------------------

/* app.get("/", (req, res, next) => {
    
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
}); */

//! --------------------------------

const middleFunction1 = (req, res, next) => {
  req.name = "ali ";
  res.lastName = "durul";
  next();
};

const middleFunction2 = (req, res, next) => {
  res.send({
    Name: [req.name, res.lastName],
    msg: "this is func2",
  });
};

app.get("/",[middleFunction1,middleFunction2], (req, res) => {
  res.send({
    userInfo: [req.name, res.lastName],
    msg: "welcome home",
  });
});

app.listen(PORT, () => console.log("Running: http://127.0.0.1:" + PORT));

