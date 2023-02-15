const express = require('express')
const orderController = require('../controllers/orderController')
const { validateToken } = require('../middlewares/auth')

const router = express.Router()

router.get('/', validateToken, orderController.getOrderFromCart)
router.post('/', validateToken, orderController.postOrders)

module.exports = router