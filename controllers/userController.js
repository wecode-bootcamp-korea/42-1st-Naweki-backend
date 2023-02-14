const userService = require('../services/userService')
const User = require('../classes/user')
const Address = require('../classes/address')
const { catchAsync } = require('../utils/error/handler')
const { checkEmail, checkPassword } = require('../utils/validation')

const lookUp = catchAsync(async (req, res) => {
  const { email } = req.body

  if (!checkEmail(email)) {
    throw new Error('invalidEmailErr')
  }

  const isDuplicateEmail = await userService.getUser(email)
  if (isDuplicateEmail) {
    throw new Error('duplicateEmailErr')
  }

  return res.status(200).json({ message: 'EMAIL_IS_VERIFIED' })
})

const signUp = catchAsync(async (req, res) => {
  const user = new User(req.body)

  if (!user.keyCheck()) {
    throw new Error('keyErr')
  }

  if (!checkEmail(user.email)) {
    throw new Error('invalidEmailErr')
  }

  if (!checkPassword(user.password)) {
    throw new Error('invalidPasswordErr')
  }

  const isDuplicateEmail = await userService.getUser(user.email)
  if (isDuplicateEmail) {
    throw new Error('duplicateEmailErr')
  }

  await userService.signUp(user)

  return res.status(201).json({ message: 'SIGNUP_SUCCESS' })
})

const login = catchAsync(async (req, res) => {
  const { email, password } = req.body
  if (!email || !password) {
    throw new Error('keyErr')
  }

  const token = await userService.login(email, password)
  return res.status(201).json({ JWT: token })
})

// Post /postAddress

// 1. 유저의 배송지 주소 추가하는 기능을 만든다 API 가 따로 있어야 하는지?
// 2. 유저의 배송지가 있을때 주문하기 버튼을 누를 수 있어야 한다.
// 배송지가 없을때는 주문하기 불가능.
// 3. 회원가입한 유저만 주문하기 버튼을 누를 수 있다 (accessToken 검증)
// 4. 배송지에서 필수 유저 정보는
// 성, 이름, 도로명 주소, 도 / 광역시, 시 / 구 / 군, 우편번호, 전화번호, 이메일
// 이다.
// 5. 결제 수단은 유저의 point 컬럼에 해당하는 값으로 계산한다.
// 주문하기 버튼을 눌렀을 때

const postAddress = catchAsync(async (req, res) => {
  const address = new Address(req.body)

  userService.postAddress(address)

  return res.status(201).json({ message: 'post Address' })
})

module.exports = {
  lookUp,
  signUp,
  login,
  postAddress
}
