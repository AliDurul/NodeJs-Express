"use strict";
/* -------------------------------------------------------
    NODEJS EXPRESS | CLARUSWAY FullStack Team
------------------------------------------------------- */
const { Schema, model } = require("mongoose");
/* ------------------------------------------------------- */
// Customer Model:


const CategoriesSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
    },
  },
  { collection: "categories", timestamps: true }
);

/* ------------------------------------------------------- */
module.exports = model("Category", CategoriesSchema);
