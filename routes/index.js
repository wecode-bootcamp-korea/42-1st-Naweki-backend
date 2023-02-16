const express = require('express')
const router = express.Router()
const userRouter = require('./userRouter')
const productRouter = require('./productRouter')
const orderRouter = require('./orderRouter')

router.use('/users', userRouter)
router.use('/products', productRouter)
router.use('/checkout', orderRouter)

module.exports = router
