const jwt = require('jsonwebtoken')
const userDao = require('../models/userDao')
const User = require('../classes/user')
const { catchAsync } = require('../utils/error/handler')

const validateToken = catchAsync(async (req, res, next) => {
  const { authorization } = req.headers
  if (!authorization) {
    throw new Error('noAuthorizationErr')
  }

  await jwt.verify(
    authorization,
    process.env.SECRET_KEY,
    async (err, decoded) => {
      if (err) {
        throw new Error('invalidAccessTokenErr')
      }
      const result = await userDao.getUserById(decoded.id)
      const user = new User(result)
      req.user = user
      next()
    }
  )
})

module.exports = {
  validateToken,
}
