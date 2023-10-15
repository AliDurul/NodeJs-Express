"use strict"
/* -------------------------------------------------------
    NODEJS EXPRESS | CLARUSWAY FullStack Team
------------------------------------------------------- */
// $ npm i jsonwebtoken
// setToken(userData:object, isRefresh?:boolean):

const jwt = require('jsonwebtoken')

module.exports = function (userData, isRefresh = false) {

    const data = {
        access: userData,
        refresh: { _id: userData._id, password: userData.password },
        shortExpiresIn: '10m',
        longExpiresIn: '3d',
    }

    return {
        token: {
            access: jwt.sign(data.access, process.env.ACCESS_KEY, { expiresIn: data.shortExpiresIn }),
            refresh: (isRefresh ? null : jwt.sign(data.refresh, process.env.REFRESH_KEY, { expiresIn: data.longExpiresIn }))
        }
    }
}