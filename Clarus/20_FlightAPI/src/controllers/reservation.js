"use strict";
/* -------------------------------------------------------
    NODEJS EXPRESS | CLARUSWAY FullStack Team
------------------------------------------------------- */

const Reservation = require("../models/reservation");
const passenger = require("./passenger");

module.exports = {
  list: async (req, res) => {
    const data = await res.getModelList(Reservation, {}, [
      "flightId",
      "createdId",
      "passengers",
    ]);

    res.status(200).send({
      error: false,
      dataCount: data.length,
      data,
    });
  },

  create: async (req, res) => {
    const Passenger = require("../models/passenger");
    const passengers = req.body?.passengers;
    let passengersArry = [];


    await Promise.all(
      passengers.map(async (passenger) => {
        if (typeof passenger === "string") {
          const data = await Passenger.findOne({ _id: passenger });

          if (data) {
            if (passengersArry.includes(passenger)) {
              throw new Error("The ID you want to put is already in the queue");
            }

            passengersArry.push(passenger);
            return;
          }
        }

        const data = await Passenger.findOne({ email: passenger.email });
        
        if (data) {
          if (passengersArry.includes(passenger.email)) {
            throw new Error("The Email you want to put is already in the queue");
          }
          passengersArry.push(data._id.toString());
          return;
        }

       
      })
    );

    req.body.passengers = passengersArry

    const data = await Reservation.create(req.body);

    res.status(201).send({
      error: false,
      data,
    });
  },

  read: async (req, res) => {
    const data = await Reservation.findOne({ _id: req.params.id }).populate([
      "flightId",
      "createdId",
      "passengers",
    ]);

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
      newData: await Reservation.findOne({ _id: req.params.id }),
    });
  },
  delete: async (req, res) => {
    const data = await Reservation.deleteOne({ _id: req.params.id });

    res.status(data.deletedCount ? 204 : 404).send({
      error: !data.deletedCount,
      data,
    });
  },
  pushPassenger: async (req, res) => {
    const passenger = req.body?.passanger;

    const data = await Reservation.findOne({ _id: req.params?.id });

    if (data.passengers.includes(passenger)) {
      res.errorStatusCode = 403;
      throw new Error("This ID is already in the reservation.");
    } else {
      data.passengers.push(passenger);
      await data.save();

      res.status(202).send({
        error: false,
        passengerCount: data.passengers.length,
        data,
      });
    }
  },
  pullPassenger: async (req, res) => {
    const passenger = req.body?.passanger;

    const data = await Reservation.findOne({ _id: req.params?.id });

    if (!data.passengers.includes(passenger)) {
      res.errorStatusCode = 403;
      throw new Error("This ID is not already in the reservation.");
    } else {
      data.passengers.pull(passenger);
      await data.save();

      res.status(202).send({
        error: false,
        passengerCount: data.passengers.length,
        data,
      });
    }
  },
};
