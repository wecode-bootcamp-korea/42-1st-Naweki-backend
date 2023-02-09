const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const userDao = require('../models/userDao')
const { makeHashedPassword } = require('../utils/validation')
const { encodePasswordErr } = require('../utils/error/userErrMsg')
const secretKey = process.env.SECRET_KEY
const User = require('../classes/user')

const signUp = async (user) => {
  try {
    const hashedPassword = await makeHashedPassword(user.password)
    if (!hashedPassword) {
      const err = new Error(encodePasswordErr.message)
      err.statusCode = encodePasswordErr.statusCode
      throw err
    }

    user.password = hashedPassword
    return await userDao.signUp(user)
  } catch (error) {
    throw error
  }
}

const getEmail = async (email) => {
  return await userDao.getUser(email)
}

const login = async (email, password) => {
  try {
    const userInfo = new User(await userDao.getUser(email))
    const pwCheck = await bcrypt.compare(password, userInfo.password)

    if (!pwCheck) {
      const err = new Error(pwCheckErr.message)
      err.statusCode = pwCheckErr.statusCode
      throw err
    }

    const payLoad = { id: userInfo.id }
    const jwtToken = jwt.sign(payLoad, secretKey)
    return jwtToken
  } catch (err) {
    console.error('UNABLE_TO_LOGIN', err)
    throw err
  }
}

module.exports = {
  signUp,
  getEmail,
  login,
}
