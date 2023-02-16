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
  if (!cart || !shippingAddress) throw new Error('keyErr')
  if (isEmpty(shippingAddress)) throw new Error('emptyAddressErr')
  if (isEmpty(cart)) throw new Error('emptyCartErr')

  const orderId = await orderService.checkout(req.user, cart)

  if (!orderId) {
    return res.status(400).json({ data: 'orderFailedErr' })
  }

  return res.status(200).json({ data: 'orderSuccess' })
})

module.exports = {
  getOrderFromCart,
  checkout,
}