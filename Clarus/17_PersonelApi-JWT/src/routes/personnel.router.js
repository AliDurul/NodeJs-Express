"use strict";
/* -------------------------------------------------------
    EXPRESS - Personnel API
------------------------------------------------------- */
const router = require("express").Router();
/* ------------------------------------------------------- */

const personnel = require("../controllers/personnel.controller");

const {
  isLogin,
  isAdmin,
  isAdminOrLead,
  isAdminOrOwner,
} = require("../middlewares/permissions");

// URL: /personnels

// Login/logout:
router.post("/login", personnel.login);
router.all("/logout", personnel.logout);

router.route("/").get(isAdmin, personnel.list).post(isAdmin, personnel.create);

router
  .route("/:id")
  .get(isAdminOrOwner, personnel.read)
  .put(isAdminOrOwner, personnel.update)
  .patch(isAdminOrOwner, personnel.update)
  .delete(isAdmin, personnel.delete);

/* ------------------------------------------------------- */
module.exports = router;
