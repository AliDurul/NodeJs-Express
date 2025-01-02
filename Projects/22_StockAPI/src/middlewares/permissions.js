"use strict"
/* -------------------------------------------------------
    NODEJS EXPRESS | CLARUSWAY FullStack Team
------------------------------------------------------- */
// Middleware: permissions

module.exports = {

    isActive: (req, res, next) => {

       
        if (req.user.is_active) {
            next()
        } else {
            res.errorStatusCode = 403
            throw new Error('NoPermission: You must communicate with your boss to update your status.')
        }
    },

    isAdmin: (req, res, next) => {

       
        if (req.user && req.user.is_superadmin) {
            next()
        } else {
            res.errorStatusCode = 403
            throw new Error('NoPermission: You must login and to be Admin.')
        }
    },

    isStaff: (req, res, next) => {

        
        if (req.user.is_active && (req.user.is_superadmin || req.user.is_staff)) {
            next()
        } else {
            res.errorStatusCode = 403
            throw new Error('NoPermission: You must login and to be Staff.')
        }
    },
}