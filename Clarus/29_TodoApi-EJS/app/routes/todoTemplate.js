"use strict";
/* -------------------------------------------------------
    EXPRESSJS - TODO Project with Sequelize
------------------------------------------------------- */
const router = require('express').Router()

// Call TODO Controller:
const todoTemplate = require('../controllers/todoTemplate')

// router.route('/')
//     .get(todoTemplate.list) // LIST
//     .post(todoTemplate.create) // CREATE

// router.route('/:id')
//     .get(todoTemplate.read) // READ
//     .put(todoTemplate.update) // UPDATE
//     .delete(todoTemplate.delete) // DELETE

// router.get('/', todoTemplate.list)

// router.get('/create', todoTemplate.create) // Form View
// router.post('/create', todoTemplate.create) // Form Processing

// router.get('/:id', todoTemplate.read)

// router.get('/:id/update', todoTemplate.update) // Form View
// router.post('/:id/update', todoTemplate.update) // Form Processing

// router.get('/:id/delete', todoTemplate.delete)

router.all('/', todoTemplate.list)
router.all('/create', todoTemplate.create)
router.all('/:id', todoTemplate.read)
router.all('/:id/update', todoTemplate.update)
router.all('/:id/delete', todoTemplate.delete)

module.exports = router