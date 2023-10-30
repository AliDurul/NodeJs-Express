"use strict";
/* -------------------------------------------------------
    NODEJS EXPRESS | CLARUSWAY FullStack Team
------------------------------------------------------- */
const { Schema, model } = require("mongoose");
/* ------------------------------------------------------- */
// Customer Model:


const PurchasesSchema = new Schema(
  {
    user_id: {
      type: Schema.Types.ObjectId,
      ref:"Account",
    },
    firm_id: {
      type: Schema.Types.ObjectId,
      ref:"Firm",
    },
    brand_id: {
        type: Schema.Types.ObjectId,
        ref:"Brand",
      },
    product_id: {
        type: Schema.Types.ObjectId,
        ref:"Product",
      },
    quantity: {
      type: Number,
      trim: true,
      required: true,
    },
    price: {
      type: Number,
      trim: true,
      required: true,
    },
    price_total: {
      type: Number,
      trim: true,
      required: true,
    },

  },
  { collection: "purchase", timestamps: true }
);

/* ------------------------------------------------------- */
module.exports = model("Purchase", PurchasesSchema);
