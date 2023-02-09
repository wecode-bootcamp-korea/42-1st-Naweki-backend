const { catchAsync } = require('../utils/error/handler')
const productService = require('../services/productService')

// 1. 모든 상품을 가져온다
// 2. 페이징 기능 구현
// 3. 제품에 대한 색상, 신발, 성별 가져오기


// 제품 목록 페이지에서 보여줘야 하는 정보
// 1. 신상품이면 신상품
// 2. 제품 이름
// 3. 서브카테고리
// 4. 서브카테고리 없으면 카테고리 이름 보여주기
// 5. 색상 몇개 가지고 있는지
// 6. 가격
// 7. 할인가  있으면 몇 % 할인인지
// 8. 성별

const getProducts = catchAsync(async (req, res) => {
  let { page, limit } = req.query
  page = parseInt(page)
  limit = parseInt(limit)
  if (!page) page = 1
  if (!limit) limit = 5

  const offset = (page - 1) * limit

  const products = await productService.getProducts(limit, offset)
  return res.status(200).json({ message: products })
})

module.exports = {
  getProducts
}