"use strict";
/* -------------------------------------------------------
    NODEJS EXPRESS | CLARUSWAY FullStack Team
------------------------------------------------------- */
// Car Controller:

const Car = require("../models/car");
const Reservation = require("../models/reservation");

module.exports = {
  list: async (req, res) => {

    // check is date past
    if (req.body?.pickOfDate && req.body?.dropOfDate ) {
      const isPastDate = (new Date(req.body?.pickOfDate) > new Date()) && (new Date(req.body?.dropOfDate) > new Date());

      if (!isPastDate) {
        req.errorStatusCode = 401;
        throw new Error("You can not choose past dates.");
      }
    }

    const reservations = await Reservation.find({
      $or: [
        { pickOfDate: { $gte: req.body.pickOfDate, $lt: req.body.dropOfDate } },
        { dropOfDate: { $gt: req.body.pickOfDate, $lte: req.body.dropOfDate } },
      ],
    });

    const carsReserved = [];
    for (let reservation of reservations) carsReserved.push(reservation.carID.toString());

    const availableCars = await Car.find({
      _id: { $nin: carsReserved },
    });


    // const data = await res.getModelList(Car);

    res.status(200).send({
      error: false,
      details: await res.getModelListDetails(Car),
      availableCars,
    });
  },

  create: async (req, res) => {
    const model = req.body?.model;
    const currentYear = new Date().getFullYear();

    req.body.age = currentYear - model;

    const data = await Car.create(req.body);

    res.status(201).send({
      error: false,
      data,
    });
  },

  read: async (req, res) => {
    const data = await Car.findOne({ _id: req.params.id });

    res.status(200).send({
      error: false,
      data,
    });
  },

  update: async (req, res) => {
    const data = await Car.updateOne({ _id: req.params.id }, req.body);

    res.status(202).send({
      error: false,
      data,
      new: await Car.findOne({ _id: req.params.id }),
    });
  },

  delete: async (req, res) => {
    const data = await Car.deleteOne({ _id: req.params.id });

    res.status(data.deletedCount ? 204 : 404).send({
      error: !data.deletedCount,
      data,
    });
  },
};
