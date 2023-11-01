"use strict";
/* -------------------------------------------------------
    NODEJS EXPRESS | CLARUSWAY FullStack Team
------------------------------------------------------- */
const router = require("express").Router();
/* ------------------------------------------------------- */
// routes/customer:
const sales = require("../controllers/sale");
// URL: /products
router.route("/")
.get(sales.list)
.post(sales.create);

router
  .route("/:id")
  .get(sales.read)
  .put(sales.update)
  .patch(sales.update)
  .delete(sales.delete);
/* ------------------------------------------------------- */
module.exports = router;
