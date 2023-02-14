const productDao = require('../models/productDao')
const { getCurrentTime, ONE_HOUR_IN_MILLISECONDS } = require('../utils/time')

const getProducts = async (filter) => {
  const products = await productDao.getProducts(filter)

  const joinedProducts = products.map(product => ({
    id: product.id,
    name: product.name,
    price: Math.ceil(product.price),
    thumbnail_image: product.thumbnail_image,
    isNew: isNewProduct(product.created_at),
    sub_category: product.category,
    category: product.sub_category,
  }))

  return joinedProducts
}

const isNewProduct = (productCreatedTime) => {
  const currentTime = getCurrentTime()
  const productCreatedTimeInMs = new Date(productCreatedTime).getTime()

  return (currentTime - productCreatedTimeInMs) < ONE_HOUR_IN_MILLISECONDS
}

module.exports = {
  getProducts
}
