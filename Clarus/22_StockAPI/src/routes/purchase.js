"use strict";
/* -------------------------------------------------------
    NODEJS EXPRESS | CLARUSWAY FullStack Team
------------------------------------------------------- */
const router = require("express").Router();
/* ------------------------------------------------------- */
// routes/customer:

const purchase = require("../controllers/purchase");
// URL: /purchases

router.route("/").get(purchase.list).post(purchase.create);

router
  .route("/:id")
  .get(purchase.read)
  .put(purchase.update)
  .patch(purchase.update)
  .delete(purchase.delete);

/* ------------------------------------------------------- */
module.exports = router;
