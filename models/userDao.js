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

// 1. address field 값 별로 ? 생성
// 2. adress filed 값 순서에 맞게 배열 생성하여 query 두번째 변수로 할당
const postAddress = async (address) => {
  const rawQuery = `
  INSERT INTO shipping_address
  `
  return
}

module.exports = {
  signUp,
  getUser,
  postAddress
}
