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
    if (req.body?.pickOfDate && req.body?.dropOfDate) {
      const isPastDate =
        new Date(req.body?.pickOfDate) > new Date() &&
        new Date(req.body?.dropOfDate) > new Date();

      if (!isPastDate) {
        req.errorStatusCode = 401;
        throw new Error("You can not choose past dates.");
      }

    }
// check the reservations for selected dates
    const reservations = await Reservation.find({
      $or: [
        { pickOfDate: { $gte: req.body.pickOfDate, $lt: req.body.dropOfDate } },
        { dropOfDate: { $gt: req.body.pickOfDate, $lte: req.body.dropOfDate } },
      ],
    });
// get the ID`s for reserved car
    const carsReserved = [];
    for (let reservation of reservations)
      carsReserved.push(reservation.carID.toString());

    let condition ;
    //check if user is customer. if user customer show them only working cars
    if((req.body?.pickOfDate && req.body?.dropOfDate) && (!req.user.isStaff || req.user.isStaff) ){
      condition = { isPublish: true }
    }else{
      condition = {}
    }
// list only for available cars for selected dates
    const availableCars = await Car.find({
      ...condition,
      _id: { $nin: carsReserved },
    });

    res.status(200).send({
      error: false,
      details: await res.getModelListDetails(Car),
      availableCars,
    });
  },

  create: async (req, res) => {
    const model = req.body?.model;
    const currentYear = new Date().getFullYear();
// calculate age of car
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
