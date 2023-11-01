"use strict";
/* -------------------------------------------------------
    NODEJS EXPRESS | CLARUSWAY FullStack Team
------------------------------------------------------- */
const router = require("express").Router();
/* ------------------------------------------------------- */
// routes/customer:

const purchase = require("../controllers/purchase");
// URL: /purchases
const permissions = require("../middlewares/permissions");


router.route("/").get(permissions.isStaff,purchase.list).post(permissions.isStaff,purchase.create);

router
  .route("/:id")
  .get(permissions.isStaff,purchase.read)
  .put(permissions.isAdmin,purchase.update)
  .patch(permissions.isAdmin,purchase.update)
  .delete(permissions.isAdmin,purchase.delete);

/* ------------------------------------------------------- */
module.exports = router;
