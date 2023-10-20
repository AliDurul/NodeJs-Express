
const router = require('express').Router()


// auth:
router.use('/auth', require('./auth'))
// document:
router.use('/documents', require('./document'))
// users
router.use('/users', require('./user'))
// reservation
router.use('/reservations', require('./reservation'))
// room
router.use('/rooms', require('./room'))

module.exports = router