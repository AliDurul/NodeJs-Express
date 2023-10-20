/* -------------------------------------------------------
    NODEJS EXPRESS | CLARUSWAY FullStack Team
------------------------------------------------------- */

"use strict";
/* -------------------------------------------------------
    NODEJS EXPRESS | CLARUSWAY FullStack Team
------------------------------------------------------- */

const { Schema, model } = require("mongoose");


const ReservationSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    roomId: {
      type: Schema.Types.ObjectId,
      ref: "Room",
      required: true,
    },
    arrivalDate: {
      type: Date,
      trim: true,
      required: true,
      default: Date.now,
    },
    departureDate: {
      type: Date,
      trim: true,
      required: true,
      default: Date.now,
    },
    guestNumber: {
      type: BigInt,
      trim: true,
      default: 1,
    },
    night: {
      type: BigInt,
      trim: true,
      required: true,
    },
    price: {
      type: Number,
      trim: true,
      required: true,
    },
    totalPrice: {
      type: Number,
      trim: true,
      required: true,
    },
  },
  { collection: "reservation", timestamps: true }
);

module.exports = model("Reservation", ReservationSchema);
