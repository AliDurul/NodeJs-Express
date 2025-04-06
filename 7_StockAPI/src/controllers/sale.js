"use strict";
const Sale = require("../models/sale");
const Product = require("../models/product");
/* -------------------------------------------------------
    NODEJS EXPRESS | CLARUSWAY FullStack Team
------------------------------------------------------- */
// Sale Controller:

module.exports = {
  list: async (req, res) => {
    const data = await res.getModelList(Sale);

    res.status(200).send({
      error: false,
      details: await res.getModelListDetails(Sale),
      data,
    });
  },

  create: async (req, res) => {
    const { quantity, price } = req.body;
    // check quantity if it is 0
    if (req.body.quantity <= 0) {
      req.errorStatusCode = 401;
      throw new Error(
        `The quantity can not less or equal to 0 `
      );
    }

    const { brand_id, quantity: Pquantity } = await Product.findOne({
      _id: req.body.product_id
    });

    // checxk if quantity of product 
    if (req.body.quantity > Pquantity) {
      req.errorStatusCode = 401;
      throw new Error(
        `Not enough stock to do this transaction. Current Stock: ${Pquantity}`
      );
    }

    req.body.price_total = quantity * price;
    req.body.user_id = req.user._id;
    req.body.updated_id = req.user._id;
    req.body.brand_id = brand_id.toString()

    const data = await Sale.create(req.body);

    res.status(201).send({
      error: false,
      data,
    });
  },

  read: async (req, res) => {
    const data = await Sale.findOne({ _id: req.params.id }).populate('product_id');

    res.status(200).send({
      error: false,
      data,
    });
  },

  update: async (req, res) => {

    if(req.body?.quantity || req.body?.price){
      req.errorStatusCode = 401
      throw new Error('You can not change Price or Quantity. If it is neccesary create new Sale.')
    }

    if(req.body.isCounted){

      const sale = await Sale.findOne({ _id: req.params.id }).populate('product_id');
      const { product_id: { _id, quantity: prdQuantity }, quantity: saleQuantity, isCounted } = sale

      if( req.body.isCounted !== isCounted){
        const quantity = prdQuantity - saleQuantity

        await Product.updateOne({ _id }, {quantity});
      }

    }
    req.body.updated_id = req.user._id

    const data = await Sale.updateOne({ _id: req.params.id }, req.body);

    res.status(202).send({
      error: false,
      data,
      new: await Sale.findOne({ _id: req.params.id }),
    });
  },

  delete: async (req, res) => {
    const data = await Sale.deleteOne({ _id: req.params.id });

    res.status(data.deletedCount ? 204 : 404).send({
      error: !data.deletedCount,
      data,
    });
  },
};
