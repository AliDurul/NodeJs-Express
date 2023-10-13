"use strict"
/* -------------------------------------------------------
    EXPRESS - Personnel API
------------------------------------------------------- */
const router = require('express').Router()
const {Personnel} = require('../controllers/personnel.controller')
/* ------------------------------------------------------- */
router.route('/personnel')
    .get(Personnel.list)
    .post(Personnel.create)

router.route('/personnel/:personnelId')
    .get(Personnel.read)
    .put(Personnel.update)
    .delete(Personnel.delete)


/* ------------------------------------------------------- */
module.exports = router