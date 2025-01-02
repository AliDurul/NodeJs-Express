"use strict";
/* -------------------------------------------------------
    EXPRESSJS - TODO Project with Sequelize
------------------------------------------------------- */
const router = require('express').Router()

// Call TODO Controller:
const todo = require('../controllers/todo')


router.route('/')
    .get( todo.list ) // LIST
    .post( todo.create ) // CREATE

router.route('/:id')
    .get( todo.read ) // READ
    .put( todo.update ) // UPDATE
    .delete( todo.delete ) // DELETE

module.exports = router