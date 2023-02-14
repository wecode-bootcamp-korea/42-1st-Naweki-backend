const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const userDao = require('../models/userDao')
const { makeHashedPassword } = require('../utils/validation')
const User = require('../classes/user')

const signUp = async (user) => {
  try {
    const hashedPassword = await makeHashedPassword(user.password)
    if (!hashedPassword) {
      throw new Error('encodePasswordErr')
    }

    user.password = hashedPassword
    return await userDao.signUp(user)
  } catch (error) {
    throw error
  }
}

const getUser = async (email) => {
  return await userDao.getUser(email)
}

const login = async (email, password) => {
  try {
    const userInfo = new User(await userDao.getUser(email))
    const pwCheck = await bcrypt.compare(password, userInfo.password)

    if (!pwCheck) {
      throw new Error('pwCheckErr')
    }

    const secretKey = process.env.SECRET_KEY
    const payLoad = { user_id: userInfo.id }
    const jwtToken = jwt.sign(payLoad, secretKey)
    return jwtToken
  } catch (err) {
    throw new Error('failedToLogin')
  }
}

const getAddressByUserId = async (userId) => {
  return await userDao.getAddressByUserId(userId)
}

const postAddress = async (address) => {
  const result = userDao.postAddress(address)
  return result
}

module.exports = {
  signUp,
  getUser,
  login,
  postAddress,
  getAddressByUserId
}
