"use strict"
/* -------------------------------------------------------
    NODEJS EXPRESS | CLARUSWAY FullStack Team
------------------------------------------------------- */
const router = require('express').Router()
/* ------------------------------------------------------- */
// routes/user:

const room = require('../controllers/room')
const permissions = require('../middlewares/permissions')


// URL: /rooms

router.route('/')
    .get(permissions.isLogin, room.list)
    .post(permissions.isAdmin, room.create)

router.route('/:id')
    .get(permissions.isLogin, room.read)
    .put(permissions.isAdmin, room.update)
    .patch(permissions.isAdmin, room.update)
    .delete(permissions.isAdmin, room.delete)

/* ------------------------------------------------------- */
module.exports = router