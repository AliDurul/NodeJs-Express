"use strict"
/* -------------------------------------------------------
    NODEJS EXPRESS | CLARUSWAY FullStack Team
------------------------------------------------------- */
const router = require('express').Router()
/* ------------------------------------------------------- */
// routes/user:

const room = require('../controllers/room')

// URL: /rooms

router.route('/')
    .get( room.list)
    .post(room.create)

router.route('/:id')
    .get( room.read)
    .put( room.update)
    .patch( room.update)
    .delete( room.delete)

/* ------------------------------------------------------- */
module.exports = router