"use strict"
/* -------------------------------------------------------
    EXPRESS - Personnel API
------------------------------------------------------- */
const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {

    const auth = req.headers?.authorization || null // get Authorization
    const accessToken = auth ? auth.split(' ')[1] : null // get JWT

    req.isLogin = false

    jwt.verify(accessToken, process.env.ACCESS_KEY, function(err, user) {
        if (err) {
            req.user = null
            console.log('JWT Login: NO')
        } else {
            req.isLogin = true
            req.user = user
            // req.user = user.isActive ? user : null
            console.log('JWT Login: YES')
        }
    })
    next()
}