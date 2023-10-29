"use strict";
const Purchase = require("../models/purchase");
const Product = require("../models/product");

/* -------------------------------------------------------
    NODEJS EXPRESS | CLARUSWAY FullStack Team
------------------------------------------------------- */
// Purchase Controller:

module.exports = {
  list: async (req, res) => {
    const data = await res.getModelList(Purchase);

    res.status(200).send({
      error: false,
      details: await res.getModelListDetails(Purchase),
      data,
    });
  },

  create: async (req, res) => {
    const { quantity, price, brand_id, name, category_id } = req.body;

    const productInfo = { quantity, brand_id, name, category_id };

    let productData = await Product.findOne({name})

    // check if there is a product with same name
    if(productData){
        const newQuantity = productData.quantity + quantity
        console.log('ife girdi');
       await Product.updateOne({ _id: productData._id }, {quantity: newQuantity});

    } else{
        productData = await Product.create(productInfo);
    }


    // calculate total price
    req.body.price_total = quantity * price;
    // send productID
    req.body.product_id = productData._id.toString()
    // give user ID dinamicly
    req.body.user_id = req.user._id;

    const data = await Purchase.create(req.body);

    res.status(201).send({
      error: false,
        data,
    });
  },

  read: async (req, res) => {
    const data = await Purchase.findOne({ _id: req.params.id });

    res.status(200).send({
      error: false,
      data,
    });
  },

  update: async (req, res) => {
    const data = await Purchase.updateOne({ _id: req.params.id }, req.body);

    res.status(202).send({
      error: false,
      data,
      new: await Purchase.findOne({ _id: req.params.id }),
    });
  },

  delete: async (req, res) => {
    const data = await Purchase.deleteOne({ _id: req.params.id });

    res.status(data.deletedCount ? 204 : 404).send({
      error: !data.deletedCount,
      data,
    });
  },
};
