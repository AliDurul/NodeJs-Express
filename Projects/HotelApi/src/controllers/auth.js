"use strict";
/* -------------------------------------------------------
    NODEJS EXPRESS | CLARUSWAY FullStack Team
------------------------------------------------------- */
// Auth Controller:

const jwt = require("jsonwebtoken");
const setToken = require("../helpers/setToken");

const User = require("../models/user");

module.exports = {
  login: async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
      res.errorStatusCode = 401;
      throw new Error("Username and Password are required!");
    }

    const user = await User.findOne({ username, password });
    if (!user) {
      res.errorStatusCode = 402;
      throw new Error(" Invalid Username or Password!");
    }

    if (!user.isActive) {
      res.errorStatusCode = 402;
      throw new Error(" User is not active!");
    }

    const { email, isActive, isAdmin, _id } = user;
    const accessData = { email, isActive, isAdmin, username,_id };
    const refreshData = { _id, password };

    res.send({
      error: false,
      Token: {
        access: jwt.sign(accessData, process.env.ACCESS_KEY, {
          expiresIn: "1d",
        }),
        refresh: jwt.sign(refreshData, process.env.REFRESH_KEY, {
          expiresIn: "1d",
        }),
      },
    });
  },

  refresh: async (req, res) => {
    const refreshToken = req.body?.token?.refresh;

    if (!refreshToken) {
      res.errorStatusCode = 401;
      throw new Error("Please provide refresh token!");
    }

    jwt.verify(refreshToken,process.env.REFRESH_KEY,async function (err, userData) {

        if (err) {
          res.status(401).send({
            error: true,
            message: err.message,
            err
          });
        }

        const { _id, password } = userData;

        if (!_id || !password) {
          res.errorStatusCode = 401;
          throw new Error("Please provide ID and password in refresh token!");
        }

        const user = await User.findOne({ _id, password });

        if (!user) {
          res.errorStatusCode = 401;
          throw new Error("Invalid ID or Password!!");
        }

        if (!user.isActive) {
          res.errorStatusCode = 402;
          throw new Error(" User is not active!");
        }

        
    const { email, isActive, isAdmin, username } = user;
    const accessData = { email, isActive, isAdmin, username };

        res.send({
          error: false,
          Token: {
            access: jwt.sign(accessData, process.env.ACCESS_KEY, {expiresIn: "30m",}),
            refresh: null
          },
        });

      }
    );
  },

  logout: async (req, res) => {
    /*
            #swagger.tags = ['Authentication']
            #swagger.summary = 'Logout'
            #swagger.description = 'No need any doing for logout. You must deleted Bearer Token from your browser.'
        */

    res.send({
      error: false,
      message:
        "No need any doing for logout. You must deleted Bearer Token from your browser.",
    });
  },
};
