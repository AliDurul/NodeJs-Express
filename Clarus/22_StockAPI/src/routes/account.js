"use strict";
/* -------------------------------------------------------
    NODEJS EXPRESS | CLARUSWAY FullStack Team
------------------------------------------------------- */
const router = require("express").Router();
/* ------------------------------------------------------- */
// routes/customer:

const account = require("../controllers/account");
const permissions = require("../middlewares/permissions");
// URL: /accounts

router.use(permissions.isAdmin);

router.route("/").get(account.list).post(account.create);

router
  .route("/:id")
  .get(account.read)
  .put(account.update)
  .patch(account.update)
  .delete(account.delete);

/* ------------------------------------------------------- */
module.exports = router;
