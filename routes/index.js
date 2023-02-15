const express = require('express')
const router = express.Router()
const userRouter = require('./userRouter')
const productRouter = require('./productRouter')
const cartRouter = require('./cartRouter')

router.use('/users', userRouter)
router.use('/products', productRouter)
router.use('/cart', cartRouter)

module.exports = router
