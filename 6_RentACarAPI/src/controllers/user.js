"use strict";
const user = require("../models/user");
/* -------------------------------------------------------
    NODEJS EXPRESS | CLARUSWAY FullStack Team
------------------------------------------------------- */
// User Controller:

const User = require("../models/user");

module.exports = {
  list: async (req, res) => {
    const data = await res.getModelList(User);

    res.status(200).send({
      error: false,
      details: await res.getModelListDetails(User),
      data,
    });
  },

  create: async (req, res) => {



    if ((!req.user.isStaff ) || (req.user.isStaff && !req.user.isAdmin) ) {
      req.body.isAdmin = false;
      req.body.isStaff = false;
    }

    const data = await User.create(req.body);

    res.status(201).send({
      error: false,
      data,
    });
  },

  read: async (req, res) => {
    const data = await User.findOne({ _id: req.params.id });

    res.status(200).send({
      error: false,
      data,
    });
  },

  update: async (req, res) => {
    if (!req.user.isAdmin) {
      // if (req.body.isAdmin == true) {
      //     res.errorStatusCode = 401
      //     throw new Error("You can not change your status unless admin!");
      //   }

      req.body.isAdmin = false;
      req.body.isStaff = false;
    }

    const data = await User.updateOne({ _id: req.params.id }, req.body);

    res.status(202).send({
      error: false,
      data,
      new: await User.findOne({ _id: req.params.id }),
    });
  },

  delete: async (req, res) => {
    const data = await User.deleteOne({ _id: req.params.id });

    res.status(data.deletedCount ? 204 : 404).send({
      error: !data.deletedCount,
      data,
    });
  },
};
