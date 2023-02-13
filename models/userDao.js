const database = require('./index')
const { failedToSignUpErr } = require('../utils/error/userErrMsg')

const signUp = async (user) => {
  try {
    const {
      email,
      firstName,
      lastName,
      password,
      shoppingPreference,
      birthday,
    } = user

    const rawQuery = `
    INSERT INTO
      users
    (email, first_name, last_name, password, shopping_preference, birthday)
    VALUES (?, ?, ?, ?, ?, ?);`

    await database.query(rawQuery, [
      email,
      firstName,
      lastName,
      password,
      shoppingPreference,
      birthday,
    ])

    return
  } catch (err) {
    throw new Error('failedToSignUpErr')
  }
}

const getUser = async (email) => {
  const rawQuery = `
    SELECT
      id,
      first_name,
      last_name,
      email,
      password,
      phone_number,
      birthday,
      point
    FROM users WHERE email = ?;`

  const [result] = await database.query(rawQuery, [email])
  return result
}

module.exports = {
  signUp,
  getUser,
}
