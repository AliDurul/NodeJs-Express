"use strict"
/* -------------------------------------------------------
    NODEJS EXPRESS | CLARUSWAY FullStack Team
------------------------------------------------------- */
// Reservation Controller:

const Reservation = require('../models/reservation')
const Car = require('../models/car')


module.exports = {

    list: async (req, res) => {


        const data = await res.getModelList(Reservation)

        res.status(200).send({
            error: false,
            details: await res.getModelListDetails(Reservation),
            data
        })
    },

    create: async (req, res) => {


        const pickOfDate = new Date(req.body.pickOfDate)
        const dropOfDate = new Date(req.body.dropOfDate)
        const daysDifference = (dropOfDate - pickOfDate) / (1000 * 60 * 60 * 24)

        const carInfo = await Car.findOne({_id:req.body.carID})

        

        req.body.totalPrice = daysDifference * carInfo.priceOfHrs

        const data = await Reservation.create(req.body)

        res.status(201).send({
            error: false,
            data
        })
    },

    read: async (req, res) => {
    

        const data = await Reservation.findOne({ _id: req.params.id })

        res.status(200).send({
            error: false,
            data
        })

    },

    update: async (req, res) => {
   

        const data = await Reservation.updateOne({ _id: req.params.id }, req.body)

        res.status(202).send({
            error: false,
            data,
            new: await Reservation.findOne({ _id: req.params.id })
        })

    },

    delete: async (req, res) => {
    

        const data = await Reservation.deleteOne({ _id: req.params.id })

        res.status(data.deletedCount ? 204 : 404).send({
            error: !data.deletedCount,
            data
        })

    },
}