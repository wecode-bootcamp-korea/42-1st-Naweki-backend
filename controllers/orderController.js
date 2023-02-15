const orderService = require('../services/orderService')
const { catchAsync } = require('../utils/error/handler')
const { isEmpty } = require('../utils/utils')

const getOrderFromCart = catchAsync(async (req, res) => {
  const { id: userId } = req.user
  const order = await orderService.getOrderFromCart(userId)
  return res.status(200).json({ data: order })
})

const postOrders = catchAsync(async (req, res) => {
  const { cart, shippingAddress } = req.body
  const { id: userId } = req.user
  if (!cart || !shippingAddress) throw new Error('keyErr')
  if (isEmpty(shippingAddress)) throw new Error('emptyAddressErr')
  if (isEmpty(cart)) throw new Error('EMPTY_CART')

  const orderId = await orderService.postOrders(userId, shippingAddress, cart)

  if (!orderId) {
    return res.status(400).json({ data: 'Order Failed' })
  }

  const order = await orderService.getOrder(userId, orderId)

  return res.status(200).json({ data: order })
})

module.exports = {
  getOrderFromCart,
  postOrders,
}