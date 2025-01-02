"use strict"
/* -------------------------------------------------------
    EXPRESS - Personnel API
------------------------------------------------------- */
// Middleware: permissions

module.exports = {

    isLogin: (req, res, next) => {

        if (req.user) {
            next()
        } else {
            res.errorStatusCode = 403
            throw new Error('NoPermission: You must login.')
        }
    },

    isAdmin: (req, res, next) => {

        if (req.user && req.user.isAdmin) {
            next()
        } else {
            res.errorStatusCode = 403
            throw new Error('NoPermission: You must login and to be Admin.')
        }
    },

    isAdminOrLead: (req, res, next) => {

        const departmentId = req.params?.id || null

        if (
            req.user &&
            (req.user.isAdmin || (req.user.isLead && req.user.departmentId == departmentId))
        ) {
            next()
        } else {
            res.errorStatusCode = 403
            throw new Error('NoPermission: You must login and to be Admin or Department Lead.')
        }
    },

    isAdminOrOwner: (req, res, next) => {
        
        const userId = req.params?.id || null

        if (
            req.user &&
            (req.user.isAdmin || (req.user._id == userId))
        ) {
            next()
        } else {
            res.errorStatusCode = 403
            throw new Error('NoPermission: You must login and to be Admin or Owner.')
        }
    },
}