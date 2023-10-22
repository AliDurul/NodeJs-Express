"use strict"
/* -------------------------------------------------------
    NODEJS EXPRESS | CLARUSWAY FullStack Team
------------------------------------------------------- */
const router = require('express').Router()
/* ------------------------------------------------------- */
// routes/customer:

const permissions = require('../middlewares/permissions')
const customer = require('../controllers/customer')

// URL: /customers

router.route('/')
    .get(permissions.isAdmin, customer.list)
    .post(customer.create)

router.route('/:id')
    .get(permissions.isLogin, customer.read)
    .put(permissions.isLogin, customer.update)
    .patch(permissions.isLogin, customer.update)
    .delete(permissions.isAdmin, customer.delete)

/* ------------------------------------------------------- */
module.exports = router