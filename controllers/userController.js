const { checkEmail, checkPassword } = require('../utils/validation')
const { catchAsync } = require('../utils/error')
const { userSignup } = require('../services/userService')

// +-------------------+---------------+------+-----+-------------------+-----------------------------------------------+
// | Field             | Type          | Null | Key | Default           | Extra                                         |
// +-------------------+---------------+------+-----+-------------------+-----------------------------------------------+
// | id                | int           | NO   | PRI | NULL              | auto_increment                                |
// | first_name        | varchar(20)   | NO   |     | NULL              |                                               |
// | last_name         | varchar(20)   | NO   |     | NULL              |                                               |
// | email             | varchar(20)   | NO   | UNI | NULL              |                                               |
// | thumbnail         | varchar(20)   | YES  |     | NULL              |                                               |
// | phone_number      | varchar(20)   | NO   |     | NULL              |                                               |
// | gender            | varchar(20)   | YES  |     | NULL              |                                               |
// | birthday          | datetime      | NO   |     | NULL              |                                               |
// | point             | decimal(12,2) | NO   |     | 1000000.00        |                                               |
// | primary_address   | varchar(20)   | NO   |     | NULL              |                                               |
// | secondary_address | varchar(20)   | YES  |     | NULL              |                                               |
// | province          | varchar(20)   | NO   |     | NULL              |                                               |
// | city              | varchar(20)   | YES  |     | NULL              |                                               |
// | postal_code       | varchar(20)   | NO   |     | NULL              |                                               |
// | country           | varchar(20)   | NO   |     | NULL              |                                               |
// | created_at        | datetime      | YES  |     | CURRENT_TIMESTAMP | DEFAULT_GENERATED                             |
// | updated_at        | datetime      | YES  |     | CURRENT_TIMESTAMP | DEFAULT_GENERATED on update CURRENT_TIMESTAMP |
// // +-------------------+---------------+------+-----+-------------------+-----------------------------------------------+

// 1. 처음에 이메일 입력을 받는다
// 이메일 입력을 받고 버튼을 누르면 약관페이지로 이동.

const lookup = catchAsync(async (req, res) => {
  const { email } = req.body
  if (!email) {
    return res.status(400).json({ message: "No email." })
  }

  return res.status(200).json({ message: "OK" })
})

// 1. 성, 이름, 비밀번호, 이메일, 쇼핑기본설정, 생년월일 키체크
// 2. email 유효성 검사
// 3. password 유효성 검사
//

const join = catchAsync(async (req, res) => {
  const {
    email,
    first_name,
    last_name,
    password,
    shopping_preference,
    birthday,
  } = req.body

  if (!email ||
    !password ||
    !first_name ||
    !last_name ||
    !shopping_preference ||
    !birthday) {
    return res.status(400).json({ message: 'KEY_ERROR' })
  }

  if (!checkEmail(email)) return res
    .status(400)
    .json({ message: 'email is invalid.' })

  if (!checkPassword(password)) return res
    .status(400)
    .json({ message: 'password is invalid.' })

  const userInfo = {
    email: email,
    first_name: first_name,
    last_name: last_name,
    password: password,
    shopping_preference: shopping_preference,
    birthday: birthday
  }

  const result = userSignup(userInfo)
  if (!result) {
    const err = new Error('test')
    err.statusCode = 400
    throw err
  }

  res.status(200).json({ message: 'successfully_signed_up' })
})

module.exports = {
  lookup,
  join
}