const router = require('express').Router()



// auth:
router.use('/auth', require('./auth'))
// document:
router.use('/documents', require('./document'))
// users
router.use('/users', require('./user'))
// cars
router.use('/cars', require('./car'))
// reservations
router.use('/reservations', require('./reservation'))





module.exports = router