"use strict";
/* -------------------------------------------------------
    NODEJS EXPRESS | CLARUSWAY FullStack Team
------------------------------------------------------- */
// Car Controller:

const Car = require("../models/car");
const Reservation = require("../models/reservation");

module.exports = {
  list: async (req, res) => {
    const isDateValid = req.body?.pickOfDate && req.body?.dropOfDate;
    // check is date past
    if (isDateValid) {
      const isPastDate =
        new Date(req.body?.pickOfDate) > new Date() &&
        new Date(req.body?.dropOfDate) > new Date();

      if (!isPastDate) {
        req.errorStatusCode = 401;
        throw new Error("You can not choose past dates.");
      }
    }
    // check the reservations for selected dates
    const reservedCars = await Reservation.find(
      {
        $or: [
          {pickOfDate: { $gte: req.body.pickOfDate, $lt: req.body.dropOfDate },},
          {dropOfDate: { $gt: req.body.pickOfDate, $lte: req.body.dropOfDate },},
        ],
      },{ _id: 0, carID: 1 }).distinct("carID");

    //check if user is customer. if user customer show them only working cars
    let condition = {};
    if (isDateValid && !req.user.isStaff) condition.isPublish = true;
    condition._id = { $nin: reservedCars }

    // list only for available cars for selected dates
    const availableCars = await res.getModelList(Car, condition)

  
    res.status(200).send({
      error: false,
      details: await res.getModelListDetails(Car,filters),
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
