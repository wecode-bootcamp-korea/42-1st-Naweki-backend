const userDao = require('../models/userDao')
const { makeHashedPassword } = require('../utils/validation')
const { encodePasswordErr } = require('../utils/error/userErrMsg')

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
  return await userDao.getEmail(email)
}

module.exports = {
  signUp,
  getEmail
}