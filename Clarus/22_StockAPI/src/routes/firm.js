"use strict";
/* -------------------------------------------------------
    NODEJS EXPRESS | CLARUSWAY FullStack Team
------------------------------------------------------- */
const router = require("express").Router();
/* ------------------------------------------------------- */
// routes/customer:

const firm = require("../controllers/firm");
// URL: /firms

router.route("/").get(firm.list).post(firm.create);

router
  .route("/:id")
  .get(firm.read)
  .put(firm.update)
  .patch(firm.update)
  .delete(firm.delete);

/* ------------------------------------------------------- */
module.exports = router;
