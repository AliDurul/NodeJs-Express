"use strict";
/* -------------------------------------------------------
    NODEJS EXPRESS | CLARUSWAY FullStack Team
------------------------------------------------------- */
// Reservation Controller:

const Reservation = require("../models/reservation");
const Car = require("../models/car");

module.exports = {
  list: async (req, res) => {
    const isPastDate =
      new Date(req.body?.pickOfDate) > new Date() &&
      new Date(req.body?.dropOfDate) > new Date();

    if (!isPastDate) {
      req.errorStatusCode = 401;
      throw new Error("You can not choose past dates.");
    }

    const data = await res.getModelList(Reservation);

    res.status(200).send({
      error: false,
      details: await res.getModelListDetails(Reservation),
      data,
    });
  },

  create: async (req, res) => {
    // userId
    if (req.user.isStaff && !req.body.userID) {
      throw new Error("Please provide userID for this reservation");
    } else if (!req.user.isStaff) {
      req.body.userID = req.user._id;
    }

    // check if the car is available
    const reservations = await Reservation.find({
      carID: req.body.carID,
      $or: [
        { pickOfDate: { $gte: req.body.pickOfDate, $lt: req.body.dropOfDate } },
        { dropOfDate: { $gt: req.body.pickOfDate, $lte: req.body.dropOfDate } },
      ],
    });
    if (reservations.length) {
      const reservedDates = [];

      for (let reservation of reservations) {
        let newObj = {
          startDate: reservation.pickOfDate,
          endDate: reservation.dropOfDate,
        };

        reservedDates.push(newObj);
      }

      //Create a custom error object with your array
      let errorWithArray = new Error(
        "The car is not available with these dates."
      );
      errorWithArray.reservedDates = reservedDates;
      // Throw the error
      throw errorWithArray;
    }
    // createdID and updatedID
    req.body.createdID = req.user._id;
    req.body.updatedID = req.user._id;

    // check if the user is able to rent
    const users = await Reservation.find({
      userID: req.body.userID,
      $or: [
        { pickOfDate: { $gte: req.body.pickOfDate, $lt: req.body.dropOfDate } },
        { dropOfDate: { $gt: req.body.pickOfDate, $lte: req.body.dropOfDate } },
      ],
    });
    if (users.length) {
      const userReserved = [];

      for (let reservation of users) {
        let newObj = {
          startDate: reservation.pickOfDate,
          endDate: reservation.dropOfDate,
        };

        userReserved.push(newObj);
      }

      //Create a custom error object with your array
      let errorWithArray = new Error(
        "Same user can not rent a car on same dates."
      );
      errorWithArray.reservedDates = userReserved;
      // Throw the error
      throw errorWithArray;
    }

    // calculation of renting days
    const pickOfDate = new Date(req.body.pickOfDate);
    const dropOfDate = new Date(req.body.dropOfDate);
    const daysDifference = (dropOfDate - pickOfDate) / (1000 * 60 * 60 * 24);
    const carInfo = await Car.findOne({ _id: req.body.carID });
    req.body.totalPrice = daysDifference * carInfo.dailyPrice;

        // status
        req.user.isStaff
        ? (req.body.status = "Approved")
        : (req.body.status = "Pending");

    const data = await Reservation.create(req.body);

    if(req.body.status === "Approved"){
    console.log('email sent');
    }

    res.status(201).send({
      error: false,
      data,
    });
  },

  read: async (req, res) => {
    const data = await Reservation.findOne({ _id: req.params.id });

    res.status(200).send({
      error: false,
      data,
    });
  },

  update: async (req, res) => {
    const data = await Reservation.updateOne({ _id: req.params.id }, req.body);

    res.status(202).send({
      error: false,
      data,
      new: await Reservation.findOne({ _id: req.params.id }),
    });
  },

  delete: async (req, res) => {
    const data = await Reservation.deleteOne({ _id: req.params.id });

    res.status(data.deletedCount ? 204 : 404).send({
      error: !data.deletedCount,
      data,
    });
  },
};
