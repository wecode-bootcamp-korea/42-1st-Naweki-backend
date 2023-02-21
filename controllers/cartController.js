const cartService = require('../services/cartService')
const { catchAsync } = require('../utils/error/handler')

const getCart = catchAsync(async (req, res) => {
  const { id: userId } = req.user

  if (!userId) {
    throw new Error('keyErr')
  }

  const cartItems = await cartService.getCart(userId)

  return res.status(200).json(cartItems)
})

const addCartItem = catchAsync(async (req, res) => {
  const { id: userId } = req.user
  const { productId, sizeId } = req.body

  if (!(userId && productId && sizeId)) {
    throw new Error('keyErr')
  }

  await cartService.addCartItem(userId, productId, sizeId)
  return res.status(200).json({ message: 'ADD_SUCCESS' })
})

const deleteCartItem = catchAsync(async (req, res) => {
  const { id: userId } = req.user
  const { cartId } = req.params

  if (!userId && !cartId) {
    throw new Error('keyErr')
  }

  await cartService.deleteCartItem(userId, cartId)
  return res.status(200).json({ message: 'DELETE_SUCCESS' })
})

const updateCartItem = catchAsync(async (req, res) => {
  const { cartId } = req.params
  const { sizeId, quantity } = req.body

  if (!cartId || (!sizeId && !quantity)) {
    throw new Error('keyErr')
  }

  await cartService.updateCartItem(cartId, sizeId, quantity)
  return res.status(200).json({ message: 'UPDATE_SUCCESS' })
})

module.exports = {
  getCart,
  addCartItem,
  deleteCartItem,
  updateCartItem,
}
