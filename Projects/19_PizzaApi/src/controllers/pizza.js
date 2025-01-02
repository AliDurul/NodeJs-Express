"use strict"
/* -------------------------------------------------------
    NODEJS EXPRESS | CLARUSWAY FullStack Team
------------------------------------------------------- */
// Pizza Controller:

const Pizza = require('../models/pizza')

module.exports = {

    list: async (req, res) => {
        /*
            #swagger.tags = ["Pizzas"]
            #swagger.summary = "List Pizzas"
            #swagger.description = `
                You can send query with endpoint for search[], sort[], page and limit.
                <ul> Examples:
                    <li>URL/?<b>search[field1]=value1&search[field2]=value2</b></li>
                    <li>URL/?<b>sort[field1]=1&sort[field2]=-1</b></li>
                    <li>URL/?<b>page=2&limit=1</b></li>
                </ul>
            `
        */

        const data = await res.getModelList(Pizza, {}, 'toppings')

        res.status(200).send({
            error: false,
            details: await res.getModelListDetails(Pizza),
            data
        })
    },

    create: async (req, res) => {
        /*
            #swagger.tags = ["Pizzas"]
            #swagger.summary = "Create Pizza"
        */

        const data = await Pizza.create(req.body)

        res.status(201).send({
            error: false,
            data
        })
    },

    read: async (req, res) => {
        /*
            #swagger.tags = ["Pizzas"]
            #swagger.summary = "Get Single Pizza"
        */

        const data = await Pizza.findOne({ _id: req.params.id }).populate('toppings')

        res.status(200).send({
            error: false,
            data
        })

    },

    update: async (req, res) => {
        /*
            #swagger.tags = ["Pizzas"]
            #swagger.summary = "Update Pizza"
        */

        const data = await Pizza.updateOne({ _id: req.params.id }, req.body)

        res.status(202).send({
            error: false,
            data,
            new: await Pizza.findOne({ _id: req.params.id })
        })

    },

    delete: async (req, res) => {
        /*
            #swagger.tags = ["Pizzas"]
            #swagger.summary = "Delete Pizza"
        */

        const data = await Pizza.deleteOne({ _id: req.params.id })

        res.status(data.deletedCount ? 204 : 404).send({
            error: !data.deletedCount,
            data
        })

    },

    // Add toppings to Pizza.toppings:
    pushToppings: async (req, res) => {
        /*
            #swagger.tags = ["Pizzas"]
            #swagger.summary = "Add Toppings to Pizza"
        */

        const toppings = req.body?.toppings // ObjectId or [ ObjectIds ]

        // const data = await Pizza.findOne({ _id: req.params.id })
        // data.toppings.push(toppings)
        // await data.save()
        const data = await Pizza.updateOne({ _id: req.params.id }, { $push: { toppings: toppings } })
        const newData = await Pizza.findOne({ _id: req.params.id }).populate('toppings')

        res.status(202).send({
            error: false,
            data,
            toppingsCount: newData.toppings.length,
            new: newData
        })
    },

    // Remove toppings from Pizza.toppings:
    pullToppings: async (req, res) => {
        /*
            #swagger.tags = ["Pizzas"]
            #swagger.summary = "Remove Toppings from Pizza"
        */

        const toppings = req.body?.toppings // ObjectId

        // const data = await Pizza.findOne({ _id: req.params.id })
        // data.toppings.pull(toppings)
        // await data.save()
        const data = await Pizza.updateOne({ _id: req.params.id }, { $pull: { toppings: toppings } })
        const newData = await Pizza.findOne({ _id: req.params.id }).populate('toppings')

        res.status(202).send({
            error: false,
            data,
            toppingsCount: newData.toppings.length,
            new: newData
        })
    },
}