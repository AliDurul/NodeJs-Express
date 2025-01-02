"use strict";
/* -------------------------------------------------------
    NODEJS EXPRESS | CLARUSWAY FullStack Team
------------------------------------------------------- */
const { Schema, model } = require("mongoose");
/* ------------------------------------------------------- */
// Customer Model:
const passwordEncrypt = require("../helpers/passwordEncrypt");
const validator = require("validator");

const AccountSchema = new Schema(
  {
    username: {
      type: String,
      trim: true,
      required: true,
    },
    first_name: {
      type: String,
      trim: true,
      required: true,
    },
    last_name: {
      type: String,
      trim: true,
      required: true,
    },

    password: {
      type: String,
      trim: true,
      required: true,
      set: (password) => passwordEncrypt(password),
    },

    email: {
      type: String,
      trim: true,
      required: [true, "Email field must be required"],
      unique: [true, "There is this email. Email field must be unique"],
      validate: [validator.isEmail, "Email type is not correct."],
    },

    is_active: {
      type: Boolean,
      default: true,
    },

    is_staff: {
      type: Boolean,
      default: false,
    },

    is_superadmin: {
      type: Boolean,
      default: false,
    },
  },
  { collection: "accounts", timestamps: true }
);

/* ------------------------------------------------------- */
module.exports = model("Account", AccountSchema);
