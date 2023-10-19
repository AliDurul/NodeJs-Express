"use strict"
/* -------------------------------------------------------
    NODEJS EXPRESS | CLARUSWAY FullStack Team
------------------------------------------------------- */
// $ npm i jsonwebtoken
// app.use(authentication):

const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
  const accessToken =  req.headers?.authorization ?  req.headers?.authorization.split(" ")[1] : null;

  jwt.verify(accessToken, process.env.ACCESS_KEY,  (err, userData) =>  err ? (req.user = null) : (req.user = userData));

  next();
}