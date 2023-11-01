"use strict";
/* -------------------------------------------------------
    NODEJS EXPRESS | CLARUSWAY FullStack Team
------------------------------------------------------- */
const router = require("express").Router();
/* ------------------------------------------------------- */
// routes/customer:
const sales = require("../controllers/sale");

const permissions = require("../middlewares/permissions");

// URL: /products
router
  .route("/")
  .get(permissions.isStaff, sales.list)
  .post(permissions.isStaff, sales.create);

router
  .route("/:id")
  .get(permissions.isStaff, sales.read)
  .put(permissions.isAdmin, sales.update)
  .patch(permissions.isAdmin, sales.update)
  .delete(permissions.isAdmin, sales.delete);
/* ------------------------------------------------------- */
module.exports = router;
