const express = require('express')
const router = express.Router()
const userRouter = require('./userRouter')
const productRouter = require('./productRouter')
const orderRouter = require('./orderRouter')
const cartRouter = require('./cartRouter')

router.use('/users', userRouter)
router.use('/products', productRouter)
router.use('/order', orderRouter)
router.use('/cart', cartRouter)

router.use('/users', userRouter)
router.use('/products', productRouter)
router.use('/cart', cartRouter)
router.use('/checkout', orderRouter)

module.exports = router
