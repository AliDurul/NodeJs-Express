"use strict"
/* -------------------------------------------------------
    NODEJS EXPRESS | CLARUSWAY FullStack Team
------------------------------------------------------- */
const router = require('express').Router()
const auth = require('../controllers/auth')
/* ------------------------------------------------------- */

router.post('/login', auth.login)
router.post('/refresh', auth.refresh)
router.get('/logout', auth.logout)





/* ------------------------------------------------------- */
module.exports = router