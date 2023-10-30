"use strict";
const Purchase = require("../models/purchase");
const Product = require("../models/product");

/* -------------------------------------------------------
    NODEJS EXPRESS | CLARUSWAY FullStack Team
------------------------------------------------------- */
// Purchase Controller:

/* 
{
  "firm_id": "653e2a0b2519ac2f888aee93",
  "brand_id": "653e2b43c0ffd59215eab223",
  "category_id": "653e2d2a1a418765b47a597a",
  "name": "Biskrem",
  "quantity": 100,
  "price": 100
} 
*/

module.exports = {
  list: async (req, res) => {
    const data = await res.getModelList(Purchase, {}, [
      "firm_id",
      "brand_id",
      "product_id",
    ]);

    res.status(200).send({
      error: false,
      details: await res.getModelListDetails(Purchase),
      data,
    });
  },

  create: async (req, res) => {
    const { quantity, price, brand_id, name, category_id } = req.body;

    const productInfo = { quantity, brand_id, name, category_id };

    let productData = await Product.findOne({ name });

    // check if there is a product with same name
    if (productData) {
      const newQuantity = productData.quantity + quantity;
      await Product.updateOne(
        { _id: productData._id },
        { quantity: newQuantity }
      );
    } else {
      productData = await Product.create(productInfo);
    }
    // calculate total price
    req.body.price_total = quantity * price;
    // send productID
    req.body.product_id = productData._id.toString();
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
    if (req.body?.quantity || req.body?.price) {
      const purchase = await Purchase.findOne({ _id: req.params.id });

      const product = await Product.findOne({ _id: purchase.product_id });

      let difference = req.body.quantity - purchase.quantity;

      let newQuantity = difference + product.quantity;

      await Product.updateOne({ _id: purchase.product_id },{ quantity: newQuantity });

      req.body.price_total =
        (req.body?.quantity ? req.body?.quantity : purchase.quantity) *
        (req.body?.price ? req.body?.price : purchase.price);
    }

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
