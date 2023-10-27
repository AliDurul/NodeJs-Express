"use strict";
/* -------------------------------------------------------
    NODEJS EXPRESS | CLARUSWAY FullStack Team
------------------------------------------------------- */
// Reservation Controller:

const Reservation = require("../models/reservation");
const sendEmail = require("../helpers/mail");
const Car = require("../models/car");

module.exports = {
  list: async (req, res) => {
    const filters = {};
    //  show the reservations only for the current user
    if (!req.user.isStaff) filters.userID = req.user._id;

    // dates cheked if it is past
    if (req.body?.pickOfDate && req.body?.dropOfDate) {
      const isPastDate =
        new Date(req.body?.pickOfDate) > new Date() &&
        new Date(req.body?.dropOfDate) > new Date();

      if (!isPastDate) {
        req.errorStatusCode = 401;
        throw new Error("You can not choose past dates.");
      }
    }

    const data = await res.getModelList(Reservation, filters, [
      "userID",
      "carID",
    ]);

    res.status(200).send({
      error: false,
      details: await res.getModelListDetails(Reservation, filters),
      data,
    });
  },

  create: async (req, res) => {
    // check is userID in req.body
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
    // check if status isn approved
    if (req.body.status === "Approved") {
      sendEmail();
    }

    res.status(201).send({
      error: false,
      data,
    });
  },

  read: async (req, res) => {
    const data = await Reservation.findOne({ _id: req.params.id }).populate([
      "carID",
      "userID",
    ]);

    res.status(200).send({
      error: false,
      data,
    });
  },

  update: async (req, res) => {
    // update selected reservation
    const data = await Reservation.updateOne({ _id: req.params.id }, req.body);
    // list updated data
    const updatedData = await Reservation.findOne({
      _id: req.params.id,
    }).populate(["carID", "userID"]);

    // destruction inf about reservation
    const {
      userID: { firstName, email },
      carID: { brand, plateNo },
      _id,
      pickOfDate,
      dropOfDate,
      pickOfLocation,
      dropOfLocation,
      totalPrice,
    } = updatedData;
    //send email if it is approved
    if (updatedData.status === "Approved") {
      sendEmail(
        email,
        firstName,
        _id,
        brand,
        plateNo,
        pickOfDate,
        dropOfDate,
        pickOfLocation,
        dropOfLocation,
        totalPrice
      );
    }

    res.status(202).send({
      error: false,
      updatedData,
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
