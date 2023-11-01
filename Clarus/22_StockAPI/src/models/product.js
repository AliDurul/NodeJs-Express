"use strict";
/* -------------------------------------------------------
    NODEJS EXPRESS | CLARUSWAY FullStack Team
------------------------------------------------------- */
const { Schema, model } = require("mongoose");
/* ------------------------------------------------------- */
// Customer Model:


const ProductsSchema = new Schema(
  {
    category_id: {
      type: Schema.Types.ObjectId,
      ref:"Category",
    },
    brand_id: {
        type: Schema.Types.ObjectId,
        ref:"Brand",
      },
    name: {
      type: String,
      trim: true,
      required: true,
    },
    quantity: {
      type: Number,
      default:0
    },

  },
  { collection: "products", timestamps: true }
);

/* ------------------------------------------------------- */
module.exports = model("Product", ProductsSchema);
