const database = require('./index')
const { invalidInputErr } = require('../utils/error/globalErrMsg')
const { failedToSignUpErr } = require('../utils/error/userErrMsg')

const signUp = async (user) => {
  try {
    const rawQuery = `
    INSERT INTO
      users
    (email, first_name, last_name, password, shopping_preference, birthday)
    VALUES (?, ?, ?, ?, ?, ?);`

    const result = await database.query(rawQuery, [user.email,
    user.first_name,
    user.last_name,
    user.password,
    user.shopping_preference,
    user.birthday])

    if (!result) {
      const err = new Error(failedToSignUpErr.message)
      err.statusCode = failedToSignUpErr.statusCode
      throw err
    }

    return
  } catch (err) {
    err.message = invalidInputErr.message
    err.statusCode = invalidInputErr.statusCode
    throw err
  }
}

const getDuplicateEmail = async (email) => {
  const rawQuery = `
    SELECT email FROM users WHERE email = ?;`

  const [result] = await database.query(rawQuery, [email])
  if (result) return true

  return false
}

module.exports = {
  signUp,
  getDuplicateEmail
}