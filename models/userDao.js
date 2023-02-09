const database = require('./index')

const join = async (userInfo) => {
  try {
    // 1. 증복 이메일이 들어갈때 에러 처리
    const rawQuery = `
    INSERT INTO
      users
    (email, first_name, last_name, password, shopping_preference, birthday)
    VALUES (?, ?, ?, ?, ?, ?);`

    // if (!result) throw new Error('duplicate')
    return await database.query(rawQuery, Object.values(userInfo))
  } catch (err) {
    error = new Error('Duplicated Email')
    error.statusCode = 500
    console.log(error)
    throw error
  }
}

module.exports = {
  join
}