const productDao = require('../models/productDao')
const { getCurrentTime, ONE_HOUR_IN_MILLISECONDS } = require('../utils/time')

const getProducts = async (filter) => {
  let products = await productDao.getProducts(filter)

  products = products.map((product) => ({
    id: product.id,
    name: product.name,
    price: Math.ceil(product.price),
    discountRate: product.discountRate,
    thumbnailImage: product.thumbnailImage,
    subCategory: product.subCategory,
    mainCategory: product.mainCategory,
    color: product.color,
    gender: product.gender,
    isNew: isNewProduct(product.createdAt),
    updatedAt: product.updatedAt,
  }))

  return products
}

const isNewProduct = (productCreatedTime) => {
  const currentTime = getCurrentTime()
  const productCreatedTimeInMs = new Date(productCreatedTime).getTime()

  return currentTime - productCreatedTimeInMs < ONE_HOUR_IN_MILLISECONDS
}

const getProductDetails = async (productId) => {
  const product = await productDao.getProductDetails(productId)

  return product
}

module.exports = {
  getProducts,
  getProductDetails,
}
