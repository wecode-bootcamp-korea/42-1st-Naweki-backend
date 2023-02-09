const database = require('./index')
const { failedToSignUpErr } = require('../utils/error/userErrMsg')

const signUp = async (user) => {
  try {
    const rawQuery = `
    INSERT INTO
      users
    (email, first_name, last_name, password, shopping_preference, birthday)
    VALUES (?, ?, ?, ?, ?, ?);`

    await database.query(rawQuery, [user.email,
    user.first_name,
    user.last_name,
    user.password,
    user.shopping_preference,
    user.birthday])

    return
  } catch (err) {
    err.message = failedToSignUpErr.message
    err.statusCode = failedToSignUpErr.statusCode
    throw err
  }
}

const getEmail = async (email) => {
  const rawQuery = `
    SELECT email FROM users WHERE email = ?;`

  const [result] = await database.query(rawQuery, [email])
  if (result) return true

  return false
}

module.exports = {
  signUp,
  getEmail
}