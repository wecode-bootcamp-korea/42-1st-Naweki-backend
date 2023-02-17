const express = require('express')
const cartController = require('../controllers/cartController')
const { validateToken } = require('../middlewares/auth.js')

const router = express.Router()

router.get('/', validateToken, cartController.getCart)
router.post('/', validateToken, cartController.addCartItem)
router.delete('/:cartId?', validateToken, cartController.deleteCartItem)

module.exports = router
