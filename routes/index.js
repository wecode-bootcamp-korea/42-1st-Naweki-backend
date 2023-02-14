const express = require('express')
const router = express.Router()
const userRouter = require('./userRouter.js')
const productRouter = require('./productRouter')
const orderRouter = require('./orderRouter.js')

router.use('/users', userRouter)
router.use('/products', productRouter)
router.use('/order', orderRouter)

module.exports = router
