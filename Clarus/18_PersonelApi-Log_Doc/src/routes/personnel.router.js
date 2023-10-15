"use strict"
/* -------------------------------------------------------
    EXPRESS - Personnel API
------------------------------------------------------- */
const router = require('express').Router()
/* ------------------------------------------------------- */

const personnel = require('../controllers/personnel.controller')
const permissions = require('../middlewares/permissions')

// URL: /personnels

// Login/logout:
// router.post('/login', personnel.login)
// router.all('/logout', personnel.logout)

router.route('/')
    .get(permissions.isAdmin, personnel.list)
    .post(permissions.isAdmin, personnel.create)

router.route('/:id')
    .get(permissions.isAdminOrOwner, personnel.read)
    .put(permissions.isAdminOrOwner, personnel.update)
    .patch(permissions.isAdminOrOwner, personnel.update)
    .delete(permissions.isAdmin, personnel.delete)

/* ------------------------------------------------------- */
module.exports = router