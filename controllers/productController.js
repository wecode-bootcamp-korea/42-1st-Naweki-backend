const { catchAsync } = require('../utils/error/handler')
const productService = require('../services/productService')
const { DEFAULT_PAGE, DEFAULT_LIMIT } = require('../utils/constants')

const getProducts = catchAsync(async (req, res) => {
  const { category, subCategory, color, gender, sort } = req.query
  const [limit, offset] = getPageAndLimit(req)

  const filter = {
    category: category,
    sub_category: subCategory,
    gender: gender,
    color: color,
    limit: limit,
    offset: offset,
    sort: sort,
  }

  const products = await productService.getProducts(filter)
  return res.status(200).json({ data: products })
})

const getPageAndLimit = (req) => {
  let { page, limit } = req.query
  page = parseInt(page)
  limit = parseInt(limit)
  if (!page) page = DEFAULT_PAGE
  if (!limit) limit = DEFAULT_LIMIT

  const offset = (page - 1) * limit

  return [limit, offset]
}

const getProductDetails = catchAsync(async (req, res) => {
  const { productId } = req.params
  const details = await productService.getProductDetails(productId)
  return res.status(200).json({ product: details })
})

module.exports = {
  getProducts,
  getProductDetails,
}
