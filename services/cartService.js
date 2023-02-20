const cartDao = require('../models/cartDao')
const jwt = require('jsonwebtoken')

const getCart = async (id) => {
  try {
    return await cartDao.getCart(id)
  } catch (error) {
    throw error
  }
}

const addCartItem = async (id, productId, sizeId) => {
  try {
    return await cartDao.addCartItem(id, productId, sizeId)
  } catch (err) {
    throw err
  }
}

const deleteCartItem = async (cartId) => {
  try {
    const lookup = await cartDao.lookup(cartId)
    if (lookup.result == 0) {
      throw new Error('noCartItemErr')
    }
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
