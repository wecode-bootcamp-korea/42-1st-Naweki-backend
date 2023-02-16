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

const getAddress = catchAsync(async (req, res) => {
  const result = await userService.getAddressByUserId(req.user.id)
  if (!result) new Error('failedToGetAddressErr')
  return res.status(200).json({ data: result })
})

const postAddress = catchAsync(async (req, res) => {
  const address = new Address(req.body)

  const result = await userService.postAddress(address)
  if (!result) new Error('failedToPostAddressErr')

  return res.status(201).json({ message: 'post Address' })
})

module.exports = {
  lookUp,
  signUp,
  login,
  postAddress,
  getAddress
}
