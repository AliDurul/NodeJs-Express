"use strict"
/* -------------------------------------------------------
    NODEJS EXPRESS | CLARUSWAY FullStack Team
------------------------------------------------------- */
const router = require('express').Router()
/* ------------------------------------------------------- */
// routes/user:

const reservation = require('../controllers/reservation')

// URL: /reservations

router.route('/')
    .get( reservation.list)
    .post(reservation.create)

router.route('/:id')
    .get( reservation.read)
    .put( reservation.update)
    .patch( reservation.update)
    .delete( reservation.delete)

/* ------------------------------------------------------- */
module.exports = router