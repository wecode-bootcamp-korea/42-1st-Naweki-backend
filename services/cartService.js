const cartDao = require('../models/cartDao')
const jwt = require('jsonwebtoken')
const secretKey = process.env.SECRET_KEY

const getCart = async (token) => {
  try {
    const decoded = jwt.verify(token, secretKey)
    const userId = decoded.id

    return await cartDao.getCart(userId)
  } catch (error) {}
}

const addCartItem = async (product) => {
  try {
    return await cartDao.addCartItem(product)
  } catch (err) {
    throw err
  }
}

const deleteCartItem = async (cartId) => {
  try {
    return await cartDao.deleteCartItem(cartId)
  } catch (err) {
    throw err
  }
}

module.exports = {
  getCart,
  addCartItem,
  deleteCartItem,
}
