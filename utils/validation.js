const bcrypt = require('bcrypt')

const checkEmail = (email) => {
  const regexp = new RegExp('^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}')
  return regexp.test(email)
}

const checkPassword = (password) => {
  const regexp = new RegExp(
    '^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,36}$'
  )
  return regexp.test(password)
}

const makeHashedPassword = async (password) => {
  const saltRounds = 12
  const hashedPassword = await bcrypt.hash(password, saltRounds)
  return hashedPassword
}

module.exports = {
  checkEmail,
  checkPassword,
  makeHashedPassword,
}
