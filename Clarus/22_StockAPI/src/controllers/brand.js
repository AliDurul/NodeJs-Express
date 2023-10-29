"use strict";
const Brand = require("../models/brand");
/* -------------------------------------------------------
    NODEJS EXPRESS | CLARUSWAY FullStack Team
------------------------------------------------------- */
// Brand Controller:


module.exports = {
  list: async (req, res) => {
    const data = await res.getModelList(Brand);

    res.status(200).send({
      error: false,
      details: await res.getModelListDetails(Brand),
      data,
    });
  },

  create: async (req, res) => {


    const data = await Brand.create(req.body);

    res.status(201).send({
      error: false,
      data,
    });
  },

  read: async (req, res) => {
    const data = await Brand.findOne({ _id: req.params.id });

    res.status(200).send({
      error: false,
      data,
    });
  },

  update: async (req, res) => {
 

    const data = await Brand.updateOne({ _id: req.params.id }, req.body);

    res.status(202).send({
      error: false,
      data,
      new: await Brand.findOne({ _id: req.params.id }),
    });
  },

  delete: async (req, res) => {
    const data = await Brand.deleteOne({ _id: req.params.id });

    res.status(data.deletedCount ? 204 : 404).send({
      error: !data.deletedCount,
      data,
    });
  },
};
