const express = require('express')
const router = express.Router()
const userRouter = require('./userRouter.js')
const orderRouter = require('./orderRouter.js')

router.use('/users', userRouter)
router.use('/order', orderRouter)

module.exports = router
