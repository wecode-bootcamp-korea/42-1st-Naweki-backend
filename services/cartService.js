const cartDao = require('../models/cartDao')

const getCart = async (userId) => {
  try {
    return await cartDao.getCart(userId)
  } catch (error) {
    throw error
  }
}

const addCartItem = async (userId, productId, sizeId) => {
  try {
    const lookup = await cartDao.lookupBySizeId(userId, productId, sizeId)
    if (lookup) {
      const cartId = lookup.id
      const quantity = lookup.quantity + 1
      return await cartDao.updateCartItem(cartId, sizeId, quantity)
    }

    return await cartDao.addCartItem(userId, productId, sizeId)
  } catch (err) {
    throw err
  }
}

const deleteCartItem = async (userId, cartId) => {
  try {
    const lookup = await cartDao.lookupByCartId(userId, cartId)
    if (lookup.result == 0) {
      throw new Error('noCartItemErr')
    }
    return await cartDao.deleteCartItem(cartId)
  } catch (err) {
    throw err
  }
}

const updateCartItem = async (cartId, sizeId, quantity) => {
  try {
    const lookup = await cartDao.lookupByCartId(cartId)
    if (lookup.result == 1) {
      await cartDao.updateCartItem(cartId, sizeId, quantity)
    } else {
      throw new Error('noCartItemErr')
    }
  } catch (err) {
    throw err
  }
}

module.exports = {
  getCart,
  addCartItem,
  deleteCartItem,
  updateCartItem,
}
