const { catchAsync } = require('../utils/error/handler')
const cartService = require('../services/cartService')
const Product = require('../classes/cart')

const getCart = catchAsync(async (req, res) => {
  const token = req.header.authorization
  if (!token) {
    throw new Error('keyErr')
  }
  const cartItems = await cartService.getCartItems(token)
  return res.status(200).json({ cart: cartItems })
})

const addCartItem = catchAsync(async (req, res) => {
  const product = new Product(req.body)
  if (!product.keycheck()) {
    throw new Error('keyErr')
  }
  return res.status(200).json({ message: 'ADD_SUCCESS' })
})

const deleteCartItem = catchAsync(async (req, res) => {
  const cartId = req.body
  if (!cartId) {
    throw new Error('keyErr')
  }

  const result = await cartService.deleteCartItem(cartId)
  return res.status(200).json({ message: 'DELETE_SUCCESS' })
})

// const updateItems
// const checkoutItems

module.exports = {
  getCart,
  addCartItem,
  deleteCartItem,
}
