const orderDao = require('../models/orderDao')

const getProductsFromCartByUserId = async (userId) => {
  return await orderDao.getProductsFromCartByUserId(userId)
}

const insertCart = async (userId, productOptionsId) => {
  return await orderDao.insertCart(userId, productOptionsId)
}

const postOrder = () => {
  orderDao.postOrder()
}

module.exports = {
  getProductsFromCartByUserId,
  postOrder,
  insertCart
}