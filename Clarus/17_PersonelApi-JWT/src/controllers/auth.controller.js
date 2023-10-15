"use strict"
/* -------------------------------------------------------
    EXPRESS - Personnel API
------------------------------------------------------- */
// JWT
// npm i jsonwebtoken

const jwt = require('jsonwebtoken')
const Personnel = require('../models/personnel.model')
const checkUserAndSetToken = require('../helpers/checkUserAndSetToken')

module.exports = {

    login: async (req, res) => {
        /*
        const { username, password } = req.body

        if (username && password) {

            const user = await Personnel.findOne({ username, password })

            if (user) {

                if (user.isActive) {
                // Login OK

                    const accessData = {
                        _id: user._id,
                        departmentId: user.departmentId,
                        firstName: user.firstName,
                        lastName: user.lastName,
                        isActive: user.isActive,
                        isAdmin: user.isAdmin,
                        isLead: user.isLead,
                    }
                    const accessToken = jwt.sign(accessData, process.env.ACCESS_KEY, { expiresIn: '10m' })

                    const refreshData = {
                        username: user.username,
                        password: user.password
                    }
                    const refreshToken = jwt.sign(refreshData, process.env.REFRESH_KEY, { expiresIn: '3d' })

                    res.send({
                        error: false,
                        token: {
                            access: accessToken,
                            refresh: refreshToken
                        }
                    })

                } else {

                    res.errorStatusCode = 401
                    throw new Error('This account is not active.')
                }
            } else {

                res.errorStatusCode = 401
                throw new Error('Wrong username or password.')
            }
        } else {

            res.errorStatusCode = 401
            throw new Error('Please enter username and password.')
        }
        */
        const checkUser = await checkUserAndSetToken(req.body)
        if (checkUser.error) {
            res.errorStatusCode = 401
            throw new Error(checkUser.message)
        } else {
            res.send(checkUser)
        }
    },

    refresh: async (req, res) => {

        const refreshToken = req.body?.token?.refresh || null

        if (refreshToken) {

            const jwtData = jwt.verify(refreshToken, process.env.REFRESH_KEY)

            if (jwtData) {

                const checkUser = await checkUserAndSetToken(jwtData, false)
                if (checkUser.error) {
                    res.errorStatusCode = 401
                    throw new Error(checkUser.message)
                } else {
                    res.send(checkUser)
                }

            } else {
                res.errorStatusCode = 401
                throw new Error('Wroong JWT Token')
            }
        } else {
            res.errorStatusCode = 401
            throw new Error('Please entry token.refresh')
        }
    },

    logout: async (req, res) => {
        res.send({
            error: false,
            message: 'No need any doing for logout. You must deleted Bearer Token from your browser.'
        })
    },
}