"use strict";
/* -------------------------------------------------------
    NODEJS EXPRESS | CLARUSWAY FullStack Team
------------------------------------------------------- */

const jwt = require("jsonwebtoken");

const User = require("../models/user");

module.exports = {
  login: async (req, res) => {
    const { username, password } = req.body;

    if (username && password) {
      const user = await User.findOne({ username, password });

      if (user) {
        if (user.isActive) {
          const data = {
            access: jwt.sign(user.toJSON(), process.env.ACCESS_KEY, {
              expiresIn: "10m",
            }),
            refresh: jwt.sign(
              { _id: user._id, password: user.password },
              process.env.REFRESH_KEY,
              { expiresIn: "3d" }
            ),
          };

          res.send({
            error: false,
            token: {
              access: data.access,
              refresh: data.refresh,
            },
          });
        } else {
          res.errorStatusCode = 401;
          throw new Error("This account is not Active.");
        }
      } else {
        res.errorStatusCode = 401;
        throw new Error("Wrong username or password.");
      }
    } else {
      res.errorStatusCode = 401;
      throw new Error("Please provide username and password.");
    }
  },
  refresh: async (req, res) => {
    const refreshToken = req.body?.token?.refresh;
    if (refreshToken) {
      jwt.verify(
        refreshToken,
        process.env.REFRESH_KEY,
        async function (err, userData) {
          if (err) {
            res.errorStatusCode = 401;
            throw new Error("Please enter valid token.refresh !");
          } else {
            const { _id, password } = userData;
            if (_id && password) {
              const user = await User.findOne({ _id });
              if (user && user.password == password) {
                if (user.isActive) {

                  const data = {
                    access: jwt.sign(user.toJSON(), process.env.ACCESS_KEY, {expiresIn: "10m",}),
                    refresh: null,
                  };

                  res.send({
                    error: false,
                    token: data,
                  });
                  
                } else {
                  res.errorStatusCode = 401;
                  throw new Error("User is not active");
                }
              } else {
                res.errorStatusCode = 401;
                throw new Error("Wrong id or password!");
              }
            } else {
              res.errorStatusCode = 401;
              throw new Error("Please enter id and password !");
            }
          }
        }
      );
    } else {
      res.errorStatusCode = 401;
      throw new Error("Please enter token.refresh !");
    }
  },
  logout: async (req, res) => {},
};
