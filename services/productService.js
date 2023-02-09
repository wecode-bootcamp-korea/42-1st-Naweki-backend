const productDao = require('../models/productDao')

const getProducts = async (page, offset) => {
  return productDao.getProducts(page, offset)
}

module.exports = {
  getProducts
}