const { catchAsync } = require('../utils/error/handler')
const orderService = require('../services/orderService')

// Post /order

// 주문하기 버튼을 눌렀을 때
// API 는 하나
// uuid 는 서비스에서 생성
// 확장성을 고려하면 배송지 API 구현하는게 좋을듯
// Transaction 이용
// 6. UUID 생성한다 uuid 모듈 이용 (order_items.order_id, orders.order_number)
// 7. 장바구니(cart)에 있는 상품들을 하나씩
// order_items 테이블에 추가한다.
// 8. orders_items 에 추가한 아이템들을 포함하는 데이터를 토대로
// orders 테이블에 같은 UUID 로 추가하고 orders.order_status_id 를 변경한다.
// 9. orders.user_id 이용, 유저의 장바구니의 아이템들을 삭제한다.
// 10. user의 최신 주문 내역을 response 로 준다 UUID 이용.
// 주문하기에서 필요한 정보 1. 유저의 배송지 2. 주문 상품 목록 3. 주문 상품 목록의 가격의 합계

// 주문하기 버튼 눌렀을때 필요한 정보
// 1. 상품정보 2. 상품 가격의 합, 배송지 정보

const insertCart = catchAsync(async (req, res) => {
  const { user_id, product_options_id, quantity } = req.body

  if (!user_id || !product_options_id || !quantity) {
    throw new Error('keyErr')
  }

  orderService.insertCart(user_id, product_options_id, quantity)
  return res.status('200').json({ message: 'insertCart' })
})

// ### 주문하기 API
// 1. token 에서 user_id 불러와서
// cart 조회 -> 상품목록 가져와서 response
// 2. token 에서 user_id 불러와서 배송지 정보 가져오기

const getOrderFromCart = catchAsync(async (req, res) => {
  const { id: userId } = req.user
  const order = await orderService.getOrderFromCart(userId)
  return res.status(200).json({ data: order })
})

const postOrders = catchAsync(async (req, res) => {
  const { cart, shippingAddress } = req.body
  if (!cart || !shippingAddress) throw new Error('keyErr')
  if (isEmpty(shippingAddress)) throw new Error('emptyAddressErr')
  if (isEmpty(cart)) throw new Error('EMPTY_CART')

  const order = orderService.postOrders(req.user, shippingAddress, cart)

  return res.status(200).json({ data: [] })
})

const isEmpty = (obj) => {
  return Object.keys(obj).length == 0
}

module.exports = {
  getOrderFromCart,
  postOrders,
  insertCart
}