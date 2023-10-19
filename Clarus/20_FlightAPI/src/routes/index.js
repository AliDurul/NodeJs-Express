"use strict"
/* -------------------------------------------------------
    NODEJS EXPRESS | CLARUSWAY FullStack Team
------------------------------------------------------- */
const router = require('express').Router()
/* ------------------------------------------------------- */
// routes/user:


// URL: /

// auth:
router.use("/auth", require("./auth"));
// users
router.use("/users", require("./user"));
// flights
router.use("/flights", require("./flight"));
// passengers
router.use("/passengers", require("./passenger"));
// reservations
router.use("/reservations", require("./reservation"));

// document:
router.use("/documents", require("./document"));




/* ------------------------------------------------------- */
module.exports = router