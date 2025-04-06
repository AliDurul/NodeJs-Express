"use strict"
/* -------------------------------------------------------
    NODEJS EXPRESS | CLARUSWAY FullStack Team
------------------------------------------------------- */
// $ npm i jsonwebtoken
// setToken(userData:object, isRefresh?:boolean):

const jwt = require('jsonwebtoken')

module.exports = function (user, isRefresh = false) {

    const {password , ...accessData} = user._doc;
    const _id = accessData._id
    const refreshData = { _id , password };

    return {
        access: jwt.sign(accessData, process.env.ACCESS_KEY, {expiresIn: "1d"}),
        refresh: isRefresh ? null : jwt.sign(refreshData, process.env.REFRESH_KEY, {expiresIn: "3d",}) 
    }
}