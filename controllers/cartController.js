const { catchAsync } = require('../utils/error/handler')
const cartService = require('../services/cartService')

const getCart = catchAsync(async (req, res) => {
  const { id } = req.user
  const cartItems = await cartService.getCart(id)

  return res.status(200).json(cartItems)
})

const addCartItem = catchAsync(async (req, res) => {
  const { id } = req.user
  const { productId, sizeId } = req.body

  if (!(id && productId && sizeId)) {
    throw new Error('keyErr')
  }
  await cartService.addCartItem(id, productId, sizeId)
  return res.status(200).json({ message: 'ADD_SUCCESS' })
})

const deleteCartItem = catchAsync(async (req, res) => {
  const { cartId } = req.params
  console.log(cartId)

  if (!cartId) {
    throw new Error('emptyCartIdErr')
  }
  await cartService.deleteCartItem(cartId)
  return res.status(204).json({ message: 'DELETE_SUCCESS' })
})

module.exports = {
  getCart,
  addCartItem,
  deleteCartItem,
}
