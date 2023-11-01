"use strict";
/* -------------------------------------------------------
    NODEJS EXPRESS | CLARUSWAY FullStack Team
------------------------------------------------------- */
const router = require("express").Router();
/* ------------------------------------------------------- */
// routes/customer:

const product = require("../controllers/product");
// URL: /products
const permissions = require("../middlewares/permissions");

router.route("/").get(permissions.isStaff, product.list);

router
  .route("/:id")
  .get(permissions.isStaff, product.read)
  .put(permissions.isAdmin, product.update)
  .patch(permissions.isAdmin, product.update)
  .delete(permissions.isAdmin, product.delete);

/* ------------------------------------------------------- */
module.exports = router;
