"use strict"
/* -------------------------------------------------------
    EXPRESS - Personnel API
------------------------------------------------------- */
const router = require('express').Router()
/* ------------------------------------------------------- */

const auth = require('../controllers/auth.controller')

// URL: /auth

// AuthHome:
router.all('/', (req, res) => {
    res.send({
        login: '/auth/login/',
        refresh: '/auth/refresh/',
    })
})

router.post('/login', auth.login)
router.post('/refresh', auth.refresh)
router.get('/logout', auth.logout)

/* ------------------------------------------------------- */
module.exports = router