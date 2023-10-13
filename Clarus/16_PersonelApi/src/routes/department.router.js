"use strict"
/* -------------------------------------------------------
    EXPRESS - Personnel API
------------------------------------------------------- */
const router = require('express').Router()
const {Department} = require('../controllers/department.controller')
/* ------------------------------------------------------- */

router.route('/department')
    .get(Department.list)
    .post(Department.create)

router.route('/department/:departmentId')
    .get(Department.read)
    .put(Department.update)
    .delete(Department.delete)




/* ------------------------------------------------------- */
module.exports = router