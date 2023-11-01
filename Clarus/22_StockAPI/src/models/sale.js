"use strict";
/* -------------------------------------------------------
    NODEJS EXPRESS | CLARUSWAY FullStack Team
------------------------------------------------------- */
const { Schema, model } = require("mongoose");
/* ------------------------------------------------------- */
// Sales Model:
const SalesSchema = new Schema(
  {
    user_id: {
      type: Schema.Types.ObjectId,
      ref: "Account",
    },
    brand_id: {
      type: Schema.Types.ObjectId,
      ref: "Brand",
    },
    product_id: {
      type: Schema.Types.ObjectId,
      ref: "Product",
    },
    firm_id: {
      type: Schema.Types.ObjectId,
      ref:"Firm"
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
    },
    isCounted: {
        type: Boolean,
        default: false,
      },
      updated_id:{
        type: Schema.Types.ObjectId,
        ref:"Account",
      },
  },
  { collection: "sales", timestamps: true }
);
/* ------------------------------------------------------- */
module.exports = model("Sales", SalesSchema);
