const orderService = require('../services/orderService')
const { catchAsync } = require('../utils/error/handler')
const { isEmpty } = require('../utils/utils')

const getOrderFromCart = catchAsync(async (req, res) => {
  const { id: userId } = req.user
  const order = await orderService.getOrderFromCart(userId)
  return res.status(200).json({ data: order })
})

const checkout = catchAsync(async (req, res) => {
  const { cart, shippingAddress } = req.body
  const { id: userId } = req.user
  if (!cart || !shippingAddress) throw new Error('keyErr')
  if (isEmpty(shippingAddress)) throw new Error('emptyAddressErr')
  if (isEmpty(cart)) throw new Error('emptyCartErr')

  const orderId = await orderService.checkout(userId, cart)

  if (!orderId) {
    return res.status(400).json({ data: 'orderFailedErr' })
  }

  const order = await orderService.getOrder(req.user, orderId)

  return res.status(200).json({ data: order })
})

module.exports = {
  getOrderFromCart,
  checkout,
}