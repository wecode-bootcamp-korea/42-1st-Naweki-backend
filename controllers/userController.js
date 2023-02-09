const userService = require('../services/userService')
const userDao = require('../models/userDao')
const User = require('../classes/user')
const { catchAsync } = require('../utils/error/handler')
const { checkEmail, checkPassword } = require('../utils/validation')
const {
  keyErr,
  invalidEmailErr,
  invalidPasswordErr,
  duplicateEmailErr
} = require('../utils/error/userErrMsg')

const lookup = catchAsync(async (req, res) => {
  const { email } = req.body

  if (!checkEmail(email)) {
    return res
      .status(invalidEmailErr.statusCode)
      .json({ message: invalidEmailErr.message })
  }

  if (userDao.getDuplicateEmail(email)) {
    return res
      .status(duplicateEmailErr.statusCode)
      .json({ message: duplicateEmailErr.message })
  }

  return res.status(200).json({ message: 'EAMIL_IS_VERIFIED' })
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

  const isDuplicateEmail = await userDao.getDuplicateEmail(user.email)
  if (isDuplicateEmail) {
    return res
      .status(duplicateEmailErr.statusCode)
      .json({ message: duplicateEmailErr.message })
  }

  userService.signUp(user)

  res.status(200).json({ message: 'SIGNUP_SUCCESS' })
})

module.exports = {
  lookup,
  signUp
}