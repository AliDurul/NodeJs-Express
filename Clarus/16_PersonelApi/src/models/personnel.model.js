"use strict";
/* -------------------------------------------------------
    EXPRESS - Personnel API
------------------------------------------------------- */
const { mongoose } = require("../configs/dbConnection");
const passwordEncrypt = require('../helpers/passwordEncrypt')
/* ------------------------------------------------------- */

const personnelSchema = new mongoose.Schema(
  {
    departmentId: {
      type: mongoose.Schema.ObjectId,
      ref: "Department",
      required: true,
    },
    userName: {
      type: String,
      trim: true,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      trim: true,
      required: true,
      set: (password)=>passwordEncrypt(password)
    },
    firstName: String,
    lastName: String,
    phone: {
      type: String,
      trim: true,
      required: true,
    },
    email: {
      type: String,
      trim: true,
      required: true,
      validate: [
        (email) => email.includes("@") && email.includes("."),
        "Enter valid email address !",
      ],
    },
    title: {
      type: String,
      trim: true,
      required: true,
    },
    salary: {
      type: Number,
      trim: true,
      required: true,
    },
    description: {
      type: String,
      trim: true,
      required: true,
    },
    isActive: {
      type: Boolean,
      default: false,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    isLead: {
      type: Boolean,
      default: false,
    },
    startedAt: {
      type: Date,
      default: Date(),
    },
  },
  { collection: "personnels", timestamps: true }
);

module.exports = mongoose.model('Personnel', personnelSchema)
