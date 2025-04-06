"use strict";
/* -------------------------------------------------------
    NODEJS EXPRESS | CLARUSWAY FullStack Team
------------------------------------------------------- */
const { Schema, model } = require("mongoose");
const dateToLocaleString = require('../helpers/dateToLocaleString')
/* ------------------------------------------------------- *

/* ------------------------------------------------------- */
// Reservation Model:

const ReservationSchema = new Schema(
  {
    carID: {
      type: Schema.Types.ObjectId,
      ref: "Car",
    },
    userID: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    pickOfDate: {
      type: Date,
      required: true,
    },
    dropOfDate: {
      type: Date,
      required: true,
    },
    pickOfLocation: {
      type: String,
      trim: true,
      required: true,
    },
    dropOfLocation: {
      type: String,
      trim: true,
      required: true,
    },
    totalPrice: {
      type: Number,
      trim: true,
      required: true,
    },
    createdID: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    updatedID: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    status:{
      type:String,
      required:true
    }
  },
  { collection: "reservations", timestamps: true }
);

/* ------------------------------------------------------- */


module.exports = model("Reservation", ReservationSchema);
