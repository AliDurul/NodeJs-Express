"use strict"
/* -------------------------------------------------------
    NODEJS EXPRESS | CLARUSWAY FullStack Team
------------------------------------------------------- */

const router = require('express').Router()

const reservation = require('../controllers/reservation')

router.route('/')
    .get(reservation.list)
    .post(reservation.create)

router.route('/:id')
    .get(reservation.read)
    .put(reservation.update)
    .patch(reservation.update)
    .delete(reservation.delete)

router.patch('/:id/push', reservation.pushPassenger)
router.patch('/:id/pull', reservation.pullPassenger)
    

module.exports = router