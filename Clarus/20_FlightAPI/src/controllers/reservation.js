"use strict";
/* -------------------------------------------------------
    NODEJS EXPRESS | CLARUSWAY FullStack Team
------------------------------------------------------- */

const Reservation = require("../models/reservation");

module.exports = {
  list: async (req, res) => {
   const data = await res.getModelList(Reservation, {}, ["flightId","createdId","passengers"]);

    res.status(200).send({
      error: false,
      dataCount: data.length,
      data,
    });
  },

  create: async (req, res) => {
    const data = await Reservation.create(req.body);

    res.status(201).send({
      error: false,
      data,
    });
  },

  read: async (req, res) => {
    const data = await Reservation.findOne({ _id: req.params.id }).populate(
      "createdId"
    );

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
};
