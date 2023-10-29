"use strict";
const Categories = require("../models/category");
/* -------------------------------------------------------
    NODEJS EXPRESS | CLARUSWAY FullStack Team
------------------------------------------------------- */
// Categories Controller:


module.exports = {
  list: async (req, res) => {
    const data = await res.getModelList(Categories);

    res.status(200).send({
      error: false,
      details: await res.getModelListDetails(Categories),
      data,
    });
  },

  create: async (req, res) => {


    const data = await Categories.create(req.body);

    res.status(201).send({
      error: false,
      data,
    });
  },

  read: async (req, res) => {
    const data = await Categories.findOne({ _id: req.params.id });

    res.status(200).send({
      error: false,
      data,
    });
  },

  update: async (req, res) => {
 

    const data = await Categories.updateOne({ _id: req.params.id }, req.body);

    res.status(202).send({
      error: false,
      data,
      new: await Categories.findOne({ _id: req.params.id }),
    });
  },

  delete: async (req, res) => {
    const data = await Categories.deleteOne({ _id: req.params.id });

    res.status(data.deletedCount ? 204 : 404).send({
      error: !data.deletedCount,
      data,
    });
  },
};
