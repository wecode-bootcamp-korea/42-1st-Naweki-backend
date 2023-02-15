const express = require('express')
const cartController = require('../controllers/cartController')
const { validateToken } = require('../middlewares/auth.js')

const router = express.Router()

router.get('/', validateToken, cartController.getCart)
router.post('/', validateToken, cartController.addCartItem)
router.delete('/', validateToken, cartController.deleteCartItem)
// router.patch('/', validateToken, cartController.updateCartItems)
// router.post('/checkout', validateToken, cartController.checkoutItems)

module.exports = router
