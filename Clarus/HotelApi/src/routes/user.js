"use strict"
/* -------------------------------------------------------
    NODEJS EXPRESS | CLARUSWAY FullStack Team
------------------------------------------------------- */
const router = require('express').Router()
/* ------------------------------------------------------- */
// routes/user:

const permissions = require('../middlewares/permissions')
const user = require('../controllers/user')

// URL: /users

router.route('/')
    .get(permissions.isAdmin, user.list)
    .post( permissions.isAdmin,user.create)

router.route('/:id')
    .get(permissions.isLogin, user.read)
    .put(permissions.isAdmin, user.update)
    .patch(permissions.isAdmin, user.update)
    .delete(permissions.isAdmin, user.delete)

/* ------------------------------------------------------- */
module.exports = router