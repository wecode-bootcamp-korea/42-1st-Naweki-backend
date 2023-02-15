const express = require('express')
const orderController = require('../controllers/orderController')
const { validateToken } = require('../middlewares/auth')

const router = express.Router()

router.get('/', validateToken, orderController.getOrderFromCart)
router.post('/', validateToken, orderController.postOrder)
router.post('/cart', orderController.insertCart)

module.exports = router