const express = require('express')
const router = express.Router()
const userRouter = require('./userRouter.js')

router.use('/users', userRouter)

module.exports = router