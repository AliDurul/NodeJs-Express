"use strict"
/* -------------------------------------------------------
    NODEJS EXPRESS | CLARUSWAY FullStack Team
------------------------------------------------------- */
const router = require('express').Router()
/* ------------------------------------------------------- */
// routes/order:

const permissions = require('../middlewares/permissions')
const order = require('../controllers/order')

// URL: /orders

// router.route('/')
//     .get(permissions.isLogin, order.list)
//     .post(permissions.isLogin, order.create)

// router.route('/:id')
//     .get(permissions.isLogin, order.read)
//     .put(permissions.isLogin, rder.update)
//     .patch(permissions.isLogin, order.update)
//     .delete(permissions.isAdmin, order.delete)

router.use(permissions.isLogin)

router.route('/')
    .get(order.list)
    .post(order.create)

router.route('/:id')
    .get(order.read)
    .put(order.update)
    .patch(order.update)
    .delete(permissions.isAdmin, order.delete)

/* ------------------------------------------------------- */
module.exports = router