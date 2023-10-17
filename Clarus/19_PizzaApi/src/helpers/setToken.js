"use strict"
/* -------------------------------------------------------
    NODEJS EXPRESS | CLARUSWAY FullStack Team
------------------------------------------------------- */
// $ npm i jsonwebtoken
// setToken(userData:object, isRefresh?:boolean):

const jwt = require('jsonwebtoken')

module.exports = function (userData, isRefresh = false) {

    const data = {
        access: userData.toJSON(),
        refresh: { _id: userData._id, password: userData.password },
        shortExpiresIn: '30m',
        longExpiresIn: '3d',
    }

    return {
        access: jwt.sign(data.access, process.env.ACCESS_KEY, { expiresIn: data.shortExpiresIn }),
        refresh: (isRefresh ? undefined : jwt.sign(data.refresh, process.env.REFRESH_KEY, { expiresIn: data.longExpiresIn }))
    }
}