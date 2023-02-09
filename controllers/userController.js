const userService = require('../services/userService')
const User = require('../classes/user')
const { catchAsync } = require('../utils/error/handler')
const { checkEmail, checkPassword } = require('../utils/validation')
const {
  keyErr,
  invalidEmailErr,
  invalidPasswordErr,
  duplicateEmailErr,
} = require('../utils/error/userErrMsg')

const lookUp = catchAsync(async (req, res) => {
  const { email } = req.body

  if (!checkEmail(email)) {
    return res
      .status(invalidEmailErr.statusCode)
      .json({ message: invalidEmailErr.message })
  }

  const isDuplicateEmail = await userService.getUser(email)
  if (isDuplicateEmail) {
    return res
      .status(duplicateEmailErr.statusCode)
      .json({ message: duplicateEmailErr.message })
  }

  return res.status(200).json({ message: 'EMAIL_IS_VERIFIED' })
})

const signUp = catchAsync(async (req, res) => {
  const user = new User(req.body)

  if (!user.keyCheck()) {
    return res.status(keyErr.statusCode).json({ message: keyErr.message })
  }

  if (!checkEmail(user.email)) {
    return res
      .status(invalidEmailErr.statusCode)
      .json({ message: invalidEmailErr.message })
  }

  if (!checkPassword(user.password)) {
    return res
      .status(invalidPasswordErr.statusCode)
      .json({ message: invalidPasswordErr.message })
  }

  const isDuplicateEmail = await userService.getUser(user.email)
  if (isDuplicateEmail) {
    return res
      .status(duplicateEmailErr.statusCode)
      .json({ message: duplicateEmailErr.message })
  }

  await userService.signUp(user)

  return res.status(201).json({ message: 'SIGNUP_SUCCESS' })
})

const login = catchAsync(async (req, res) => {
  const { email, password } = req.body
  if (!email || !password) {
    return res.status(keyErr.statusCode).json({ message: keyErr.message })
  }

  const token = await userService.login(email, password)
  return res.status(201).json({ JWT: token })
})

module.exports = {
  lookUp,
  signUp,
  login,
}
