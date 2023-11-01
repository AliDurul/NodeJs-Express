"use strict";
/* -------------------------------------------------------
    NODEJS EXPRESS | CLARUSWAY FullStack Team
------------------------------------------------------- */
const router = require("express").Router();
/* ------------------------------------------------------- */
// routes/customer:

const brand = require("../controllers/brand");
const permissions = require("../middlewares/permissions");

// URL: /brands

router
  .route("/")
  .get(permissions.isStaff, brand.list)
  .post(permissions.isStaff, brand.create);

router
  .route("/:id")
  .get(permissions.isStaff, brand.read)
  .put(permissions.isStaff, brand.update)
  .patch(permissions.isAdmin, brand.update)
  .delete(permissions.isAdmin, brand.delete);

/* ------------------------------------------------------- */
module.exports = router;
