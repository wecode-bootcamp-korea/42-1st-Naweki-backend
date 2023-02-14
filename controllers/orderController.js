const { catchAsync } = require('../utils/error/handler')

// Post /postAddress

// 배송지 추가 버튼을 눌렀을 때
// 1. 유저의 배송지 주소 추가하는 기능을 만든다 API 가 따로 있어야 하는지?
// 2. 유저의 배송지가 있을때 주문하기 버튼을 누를 수 있어야 한다.
// 배송지가 없을때는 주문하기 불가능.
// 3. 회원가입한 유저만 주문하기 버튼을 누를 수 있다 (accessToken 검증)
// 4. 배송지에서 필수 유저 정보는
// 성, 이름, 도로명 주소, 도 / 광역시, 시 / 구 / 군, 우편번호, 전화번호, 이메일
// 이다.
// 5. 결제 수단은 유저의 point 컬럼에 해당하는 값으로 계산한다.

// Post /order

// 주문하기 버튼을 눌렀을 때
// Transaction 이용
// 6 UUID 생성한다 uuid 모듈 이용 (order_items.order_id, orders.order_number)
// 7. 장바구니(cart)에 있는 상품들을 하나씩
// order_items 테이블에 추가한다.
// 8. orders_items 에 추가한 아이템들을 포함하는 데이터를
// orders 테이블에 같은 UUID 로 추가하고 orders.order_status_id 를 변경한다.
// 9. orders.user_id 이용, 유저의 장바구니의 아이템들을 삭제한다.
// 10. user의 최신 주문 내역을 response 로 준다 UUID 이용.

// 1. 배송지 주소 저장 및 계속 APi
const postUserAddress = catchAsync(async (req, res) => {

})

// 1. 주문하기 API
const postOrder = catchAsync(async (req, res) => {
  console.log('postOrder')
})

module.exports = {
  postOrder
}