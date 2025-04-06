"use strict"
/* -------------------------------------------------------
    NODEJS EXPRESS | CLARUSWAY FullStack Team
------------------------------------------------------- *
{
  "userId": "652d7681508462fafafa01a2",
  "pizzaId": "652d76c5508462fafafa01b0",
  "size": "Small",
  "quantity": 1,
  "price": 99.99
}
------------------------------------------------------- */
// Order Controller:

const Pizza = require('../models/pizza')
const Order = require('../models/order')

module.exports = {

    list: async (req, res) => {
        /*
            #swagger.tags = ["Orders"]
            #swagger.summary = "List Orders"
            #swagger.description = `
                You can send query with endpoint for search[], sort[], page and limit.
                <ul> Examples:
                    <li>URL/?<b>search[field1]=value1&search[field2]=value2</b></li>
                    <li>URL/?<b>sort[field1]=1&sort[field2]=-1</b></li>
                    <li>URL/?<b>page=2&limit=1</b></li>
                </ul>
            `
        */

        // const data = await res.getModelList(Order, {}, ['userId', 'pizzaId'])
        const data = await res.getModelList(Order, {}, [
            'userId',
            { path: 'pizzaId', populate: 'toppings' }
        ])

        res.status(200).send({
            error: false,
            details: await res.getModelListDetails(Order),
            data
        })
    },

    create: async (req, res) => {
        /*
            #swagger.tags = ["Orders"]
            #swagger.summary = "Create Order"
        */

        // Calculatings:
        req.body.quantity = req.body?.quantity || 1 // default: 1
        if (!req.body?.price) {
            const dataPizza = await Pizza.findOne({ _id: req.body.pizzaId }, { _id: 0, price: 1 })
            req.body.price = dataPizza.price
        }
        req.body.totalPrice = req.body.price * req.body.quantity

        const data = await Order.create(req.body)

        res.status(201).send({
            error: false,
            data
        })
    },

    read: async (req, res) => {
        /*
            #swagger.tags = ["Orders"]
            #swagger.summary = "Get Single Order"
        */

        const data = await Order.findOne({ _id: req.params.id }).populate([
            'userId',
            { path: 'pizzaId', populate: 'toppings' }
        ])

        res.status(200).send({
            error: false,
            data
        })

    },

    update: async (req, res) => {
        /*
            #swagger.tags = ["Orders"]
            #swagger.summary = "Update Order"
        */

        // Calculatings:
        req.body.quantity = req.body?.quantity || 1 // default: 1
        if (!req.body?.price) {
            const dataOrder = await Order.findOne({ _id: req.params.id }, { _id: 0, price: 1 })
            req.body.price = dataOrder.price
        }
        req.body.totalPrice = req.body.price * req.body.quantity

        const data = await Order.updateOne({ _id: req.params.id }, req.body)

        res.status(202).send({
            error: false,
            data,
            new: await Order.findOne({ _id: req.params.id })
        })

    },

    delete: async (req, res) => {
        /*
            #swagger.tags = ["Orders"]
            #swagger.summary = "Delete Order"
        */

        const data = await Order.deleteOne({ _id: req.params.id })

        res.status(data.deletedCount ? 204 : 404).send({
            error: !data.deletedCount,
            data
        })

    },
}