"use strict";
/* -------------------------------------------------------
    NODEJS EXPRESS | CLARUSWAY FullStack Team
------------------------------------------------------- */
const { Schema, model } = require("mongoose");
/* ------------------------------------------------------- *

/* ------------------------------------------------------- */
// Car Model:

const CarSchema = new Schema(
  {
    createdID: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    carClass: {
      type: String,
      trim: true,
      required: true,
      enum: ["Economic", "Middle", "Lux", "Bus", "Caravan"],
    },
    plateNo: {
      type: String,
      trim: true,
      required: true,
    },
    brand: {
      type: String,
      trim: true,
      required: true,
    },
    model: {
      type: Number,
      trim: true,
      required: true,
    },
    gearType: {
      type: String,
      trim: true,
      enum: ["Automatic", "Manuel"],
      default: "Automatic",
    },
    fuelType: {
      type: String,
      trim: true,
      enum: ["Petrol", "Diesel", "Electric"],
      default: "Petrol",
    },
    seats: {
      type: Number,
      trim: true,
      enum: [4, 5, 6, 7, 8, 9],
    },
    luggage: {
      type: Number,
      trim: true,
      enum: [2, 3, 4],
    },
    age: {
      type: Number,
      trim: true,
      required: true,
    },
    priceOfHrs: {
      type: Number,
      trim: true,
      required: true,
    },
  },
  { collection: "cars", timestamps: true }
);

/* ------------------------------------------------------- */
module.exports = model("Car", CarSchema);
