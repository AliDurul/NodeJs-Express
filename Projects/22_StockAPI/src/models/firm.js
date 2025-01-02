"use strict";
/* -------------------------------------------------------
    NODEJS EXPRESS | CLARUSWAY FullStack Team
------------------------------------------------------- */
const { Schema, model } = require("mongoose");
/* ------------------------------------------------------- */
// Customer Model:


const FirmsSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
    },
    phone: {
      type: String,
      trim: true,
      required: true,
    },

    address: {
      type: String,
      trim: true,
      required: true,
    },

    image: {
      type: String,
      trim: true,
      required: true,
    },
    isProvider: {
      type: Boolean,
      required: true
    },
  },
  { collection: "firms", timestamps: true }
);

/* ------------------------------------------------------- */
module.exports = model("Firm", FirmsSchema);
