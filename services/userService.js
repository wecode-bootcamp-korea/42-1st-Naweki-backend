const userDao = require('../models/userDao')
const { makeHashedPassword } = require('../utils/validation')

const userSignup = async (userInfo) => {
  try {
    // 1 비밀번호 암호화
    const hashedPassword = await makeHashedPassword(userInfo.password)
    if (!hashedPassword) {
      const err = new Error('Failed to create hashed password.')
      err.statusCode = 400
      throw err
    }

    userInfo.password = hashedPassword

    const result = await userDao.join(userInfo)
    return ''
  } catch (error) {
    throw error
  }
}

module.exports = {
  userSignup
}