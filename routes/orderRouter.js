const express = require('express')
const orderController = require('../controllers/orderController')

const router = express.Router()

router.post('/', orderController.postOrder)

module.exports = router