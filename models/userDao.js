const database = require('./index')
const { camelToSnakeCase, wrapString } = require('../utils/utils')
const Address = require('../classes/address')

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

const getUserById = async (id) => {
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
    FROM users WHERE id = ?;`

  const [result] = await database.query(rawQuery, [id])
  return result
}

const getAddressByUserId = async (userId) => {
  const address = new Address()
  const keys = []

  Object.keys(address).forEach(k => keys.push('`' + camelToSnakeCase(k) + '`'))

  const rawQuery = `
  SELECT
    ${keys ? keys.join(',') : ''}
  FROM shipping_address
  WHERE user_id = ?;`

  const result = await database.query(rawQuery, userId)

  return result
}

const postAddress = async (address) => {
  const keys = []
  const values = []

  for (let [k, v] of Object.entries(address)) {
    keys.push('`' + (camelToSnakeCase(k)) + '`')
    values.push(v)
  }

  const columns = keys.join(',')

  const queries = Array(keys.length).fill('?').join(',')

  const rawQuery = `
  INSERT INTO shipping_address
  (${columns.length ? columns : ''})
  VALUES
  (${queries.length ? queries : ''}); `

  const result = await database.query(rawQuery, values)

  return result
}

module.exports = {
  signUp,
  getUser,
  getUserById,
  postAddress,
  getAddressByUserId
}
