"use strict";
/* -------------------------------------------------------
    NODEJS EXPRESS | CLARUSWAY FullStack Team
------------------------------------------------------- */
const router = require("express").Router();
/* ------------------------------------------------------- */
// routes/customer:

const firm = require("../controllers/firm");
// URL: /firms

const permissions  = require('../middlewares/permissions')
router.use(permissions.isStaff)

router.route("/").get(permissions.isStaff,firm.list).post(permissions.isStaff,firm.create);

router
  .route("/:id")
  .get(permissions.isStaff,firm.read)
  .put(permissions.isAdmin,firm.update)
  .patch(permissions.isAdmin,firm.update)
  .delete(permissions.isAdmin,firm.delete);

/* ------------------------------------------------------- */
module.exports = router;
