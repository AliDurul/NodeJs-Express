/* -------------------------------------------------------
    NODEJS EXPRESS | CLARUSWAY FullStack Team
------------------------------------------------------- */

"use strict";
/* -------------------------------------------------------
    NODEJS EXPRESS | CLARUSWAY FullStack Team
------------------------------------------------------- */

const { Schema, model } = require("mongoose");

const RoomSchema = new Schema(
  {
    roomNumber: {
      type: Number,
      trim: true,
      enum: [1, 2, 3, 4, 5, 6],
      required: true,
    },
    image: {
      type: String,
      trim: true,
    },
    bedType: {
      type: String,
      trim: true,
      enum: ["single", "family", "bigFamily"],
      required: true,
    },
    price: {
      type: Number,
      trim: true,
      required: true,
    },
  },
  { collection: "rooms", timestamps: true }
);

module.exports = model("Room", RoomSchema);
