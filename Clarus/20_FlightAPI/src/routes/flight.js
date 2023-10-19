"use strict";
/* -------------------------------------------------------
    NODEJS EXPRESS | CLARUSWAY FullStack Team
------------------------------------------------------- */

const router = require("express").Router();

const flight = require("../controllers/flight");

const permissions = require("../middlewares/permissions");

router.use(permissions.isStaff);

router.route("/")
    .get(flight.list)
    .post(permissions.isAdmin, flight.create);

router.route("/:id")
  .get(flight.read)
  .put(flight.update)
  .patch(flight.update)
  .delete(flight.delete);

module.exports = router;
