"use strict";
/* -------------------------------------------------------
    NODEJS EXPRESS | CLARUSWAY FullStack Team
------------------------------------------------------- */

const Passenger = require("../models/passenger");

module.exports = {
  list: async (req, res) => {
    const data = await res.getModelList(Passenger, {}, "createdId");

    res.status(200).send({
      error: false,
      dataCount: data.length,
      data,
    });
  },

  create: async (req, res) => {
    const data = await Passenger.create(req.body);

    res.status(201).send({
      error: false,
      data,
    });
  },

  read: async (req, res) => {
    const data = await Passenger.findOne({ _id: req.params.id }).populate(
      "createdId"
    );

    res.status(200).send({
      error: false,
      data,
    });
  },
  update: async (req, res) => {
    const data = await Passenger.updateOne({ _id: req.params.id }, req.body);

    res.status(202).send({
      error: false,
      data,
      newData: await Passenger.findOne({ _id: req.params.id }),
    });
  },
  delete: async (req, res) => {
    const data = await Passenger.deleteOne({ _id: req.params.id });

    res.status(data.deletedCount ? 204 : 404).send({
      error: !data.deletedCount,
      data,
    });
  },
};
