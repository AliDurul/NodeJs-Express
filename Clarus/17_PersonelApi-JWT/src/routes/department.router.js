"use strict"
/* -------------------------------------------------------
    EXPRESS - Personnel API
------------------------------------------------------- */
const router = require('express').Router()

const department = require('../controllers/department.controller')

const {isLogin,isAdmin,isAdminOrLead} = require('../middlewares/permissions')



// URL: /departments

router.route('/')
    .get(isLogin, department.list)
    .post(isAdmin, department.create)

router.route('/:id')
    .get(isAdminOrLead, department.read)
    .put(isAdminOrLead,department.update)
    .patch(isAdminOrLead,department.update)
    .delete(isAdmin,department.delete)

router.get('/:id/personnels', isAdminOrLead, department.personnels)

/* ------------------------------------------------------- */
module.exports = router