"use strict";
/* -------------------------------------------------------
    NODEJS EXPRESS | CLARUSWAY FullStack Team
------------------------------------------------------- */
const router = require("express").Router();
/* ------------------------------------------------------- */
// routes/customer:

const product = require("../controllers/product");
// URL: /products

router.route("/").get(product.list).post(product.create);

router
  .route("/:id")
  .get(product.read)
  .put(product.update)
  .patch(product.update)
  .delete(product.delete);

/* ------------------------------------------------------- */
module.exports = router;
