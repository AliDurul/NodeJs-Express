require("express-async-errors");

const User = require("../models/userModel");

module.exports.User = {
  list: async (req, res) => {
    // const data = await User.find();
    const data = await req.getModelList(User)

    res.status(200).send({
      error: false,
      count: data.length,
      result: data,
    });
  },
  create: async (req, res) => {
    const data = await User.create(req.body);
    res.status(201).send({
      error: false,
      body: req.body,
      result: data,
    });
  },
  read: async (req, res) => {
    const data = await User.findById(req.params.userId);

    res.status(200).send({
      error: false,
      result: data,
    });
  },
  update: async (req, res) => {
    const data = await User.updateOne({ _id: req.params.userId }, req.body, {
      runValidators: true,
    });
    res.status(202).send({
      error: false,
      body: req.body,
      result: data,
      newData: await User.findById(req.params.userId),
    });
  },
  delete: async (req, res) => {
    const data = await User.deleteOne({ _id: req.params.userId });
    res.sendStatus(data.deletedCount >= 1 ? 204 : 404);
  },

  login: async (req, res) => {
    const { email, password } = req.body;

    if (email && password) {
      const user = await User.findOne({ email: email, password: password });
      if (user) {
        req.session = {
          user: {
            email: user.email,
            password: user.password,
          },
        };

        if (req.body?.rememberMe) {
          req.sessionOptions.maxAge = 1000 * 60 * 60 * 24 * 3;
        }

        res.status(200).send({
          error: false,
          result: user,
        });
      } else {
        res.errorStatusCode = 401;
        throw new Error("Login parameters are not true.");
      }
    } else {
      res.errorStatusCode = 400;
      throw new Error("Please provide an email and password.");
    }
  },

  logout: async (req, res) => {
    req.session = null;
    res.status(200).send({
      error: false,
    });
  },
};
