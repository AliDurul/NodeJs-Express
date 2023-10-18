"use strict";
/* -------------------------------------------------------
    NODEJS EXPRESS | CLARUSWAY FullStack Team
------------------------------------------------------- */

const { Schema, model } = require("mongoose");

const FlightSchema = new Schema(
  {
    flightNumber: {
      type: String,
      trim: true,
      required: true,
      unique: false,
    },
    airline: {
      type: String,
      trim: true,
      required: true,
      unique: false,
    },
    departure: {
      type: String,
      trim: true,
      required: true,
    },
    departureDate: {
      type: Date,
      trim: true,
      required: true,
      default: Date.now,
    },
    arrival: {
      type: String,
      trim: true,
      required: true,
    },
    arrivalDate: {
      type: Date,
      trim: true,
      required: true,
      default: Date.now,
    },
    createdId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { collection: "flights", timestamps: true }
);


module.exports = model('Flight',FlightSchema )