const { catchAsync } = require('../utils/error/handler')
const orderService = require('../services/orderService')

const insertCart = catchAsync(async (req, res) => {
  const { user_id, product_options_id, quantity } = req.body

  if (!user_id || !product_options_id || !quantity) {
    throw new Error('keyErr')
  }

  orderService.insertCart(user_id, product_options_id, quantity)
  return res.status('200').json({ message: 'insertCart' })
})

const getOrderFromCart = catchAsync(async (req, res) => {
  const { id: userId } = req.user
  const order = await orderService.getOrderFromCart(userId)
  return res.status(200).json({ data: order })
})

const postOrders = catchAsync(async (req, res) => {
  const { cart, shippingAddress } = req.body
  if (!cart || !shippingAddress) throw new Error('keyErr')
  if (isEmpty(shippingAddress)) throw new Error('emptyAddressErr')
  if (isEmpty(cart)) throw new Error('EMPTY_CART')

  const orderId = await orderService.postOrders(req.user, shippingAddress, cart)

  if (!orderId) {
    return res.status(200).json({ data: 'Order Failed' })
  }

  const order = await orderService.getOrder(req.user, orderId)

  return res.status(200).json({ data: order })
})

const isEmpty = (obj) => {
  return Object.keys(obj).length == 0
}

module.exports = {
  getOrderFromCart,
  postOrders,
  insertCart
}