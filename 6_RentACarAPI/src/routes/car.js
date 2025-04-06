"use strict";
/* -------------------------------------------------------
    NODEJS EXPRESS | CLARUSWAY FullStack Team
------------------------------------------------------- */
const router = require("express").Router();
/* ------------------------------------------------------- */
// routes/customer:

const car = require("../controllers/car");
const permissons = require('../middlewares/permissions')

// URL: /cars

router.route("/")
  .get(permissons.isLogin, car.list)
  .post(permissons.isAdmin, car.create);

router
  .route("/:id")
  .get( permissons.isLogin, car.read)
  .put(permissons.isAdmin, car.update)
  .patch(permissons.isAdmin, car.update)
  .delete(permissons.isAdmin, car.delete);

/* ------------------------------------------------------- */
module.exports = router;
