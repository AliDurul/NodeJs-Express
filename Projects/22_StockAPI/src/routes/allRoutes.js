const router = require('express').Router()


// auth:
router.use('/auth', require('./auth'))

// document:
router.use('/documents', require('./document'))
// account:
router.use('/accounts', require('./account'))
// firm:
router.use('/firms', require('./firm'))
// brand:
router.use('/brands', require('./brand'))
// category:
router.use('/categories', require('./category'))
// product:
router.use('/products', require('./product'))
// purchase:
router.use('/purchases', require('./purchase'))
// sale:
router.use('/sales', require('./sale'))




module.exports = router