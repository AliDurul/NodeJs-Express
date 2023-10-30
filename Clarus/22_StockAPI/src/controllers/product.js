"use strict";
const Product = require("../models/product");
const Brand = require("../models/brand");
const Category = require("./category");
/* -------------------------------------------------------
    NODEJS EXPRESS | CLARUSWAY FullStack Team
------------------------------------------------------- */
// Product Controller:

/* 
{
  "category_id":"653e2d241a418765b47a5978",
  "brand_id":"Ulker",
  "name":"Biskerem",
  "quantity":150
}

*/

module.exports = {
  list: async (req, res) => {
    const data = await res.getModelList(Product);

    res.status(200).send({
      error: false,
      details: await res.getModelListDetails(Product),
      data,
    });
  },

  create: async (req, res) => {
    const name = req.body.brand_id;

    const { _id } = await Brand.findOne({ name });
    const { _id : {id} } = await Category.findOne({ name });
    req.body.brand_id = _id;
    req.body.category_id = id;

    const data = await Product.create(req.body);

    res.status(201).send({
      error: false,
      data,
    });
  },

  read: async (req, res) => {
    const data = await Product.findOne({ _id: req.params.id });

    res.status(200).send({
      error: false,
      data,
    });
  },

  update: async (req, res) => {
    const data = await Product.updateOne({ _id: req.params.id }, req.body);

    res.status(202).send({
      error: false,
      data,
      new: await Product.findOne({ _id: req.params.id }),
    });
  },

  delete: async (req, res) => {
    const data = await Product.deleteOne({ _id: req.params.id });

    res.status(data.deletedCount ? 204 : 404).send({
      error: !data.deletedCount,
      data,
    });
  },
};
