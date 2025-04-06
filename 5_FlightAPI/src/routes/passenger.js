"use strict"
/* -------------------------------------------------------
    NODEJS EXPRESS | CLARUSWAY FullStack Team
------------------------------------------------------- */

const router = require('express').Router()

const passenger = require('../controllers/passenger')
const permissions = require('../middlewares/permissions')

router.use(permissions.isStaff)

router.route('/')
    .get(passenger.list)
    .post(passenger.create)

router.route('/:id')
    .get(passenger.read)
    .put(passenger.update)
    .patch(passenger.update)
    .delete(passenger.delete)
    

module.exports = router