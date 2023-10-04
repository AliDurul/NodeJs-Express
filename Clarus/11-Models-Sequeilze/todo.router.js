"use strict";
/* -------------------------------------------------------
    EXPRESSJS - TODO Project with Sequelize
------------------------------------------------------- */
const router = require('express').Router()

const Todo = require('./todo.model')

// LIST:
router.get('/', async (req, res) => {

    // const data = await Todo.findAll()
    const data = await Todo.findAndCountAll()
    res.status(200).send({
        error: false,
        result: data
    })
})

// CREATE:
router.post('/', async (req, res) => {

    // const data = await Todo.create({
    //     title: 'Test Title',
    //     description: 'Test Description',
    // })
    // console.log( typeof req.body, req.body )
    const data = await Todo.create(req.body)
    res.status(201).send({
        error: false,
        body: req.body, // Send Data
        message: 'Created',
        result: data // Receive Data
    })
})

// READ:
router.get('/:id', async (req, res) => {

    // https://sequelize.org/docs/v6/core-concepts/model-querying-finders/
    // const data = await Todo.findOne({ where: { id: req.params.id } })
    
    const data = await Todo.findByPk(req.params.id)
    res.status(200).send({
        error: false,
        result: data
    })

})

// UPDATE:
router.put('/:id', async (req, res) => {

    // Model.update({ newData }, { filter })
    const isUpdated = await Todo.update(req.body, { where: { id: req.params.id } })
    // isUpdated return: [ 1 ] or [ 0 ]
    res.status(202).send({
        error: false,
        body: req.body, // Send Data
        message: 'Updated',
        isUpdated: Boolean(isUpdated[0]),
        result: await Todo.findByPk(req.params.id)
    })
})

// DELETE:
router.delete('/:id', async (req, res) => {

    // Model.destroy({ filter })
    const isDeleted = await Todo.destroy({ where: { id: req.params.id } })
    // isDeleted return: 1 or 0
    if (isDeleted) {
        res.sendStatus(204)
    } else {
        res.sendStatus(404)
    }
    // res.status(204).send({
    //     error: false,
    //     message: 'Deleted',
    //     isDeleted: Boolean(isDeleted)
    // })
})

module.exports = router