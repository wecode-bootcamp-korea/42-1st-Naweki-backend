const productDao = require('../models/productDao')
const { getCurrentTime } = require('../utils/time')

const getProducts = async (filter) => {
  const products = await productDao.getProducts(filter)
  const productsIds = products.map(product => product.id)
  const productOptions = await productDao.getProductOptions(productsIds, filter)

  const productOptionsObj = {}
  productOptions.forEach(po => {
    productOptionsObj[po.id] = po.options
  })

  const joinedProducts = products.map(product => ({
    id: product.id,
    name: product.name,
    price: Math.ceil(product.price),
    thumbnail_image: product.thumbnail_image,
    isNew: isNewProduct(product.created_at),
    sub_category: product.category,
    category: product.sub_category,
    options: productOptionsObj[product.id]
  }))

  return joinedProducts
}

const isNewProduct = (productCreatedTime) => {
  const timestamp = new Date(productCreatedTime).getTime()
  const currentTime = getCurrentTime()
  const diff = new Date(currentTime - timestamp)

  if (diff.getHours() < 1) return true

  return false
}

module.exports = {
  getProducts
}
