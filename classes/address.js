// 4. 배송지에서 필수 유저 정보는
// 성, 이름, 도로명 주소, 도 / 광역시, 시 / 구 / 군, 우편번호, 전화번호, 이메일
// 이다.

class Address {
  constructor(req) {
    this.firstName = req?.first_name
    this.lastName = req?.last_name
    this.primary = req?.primary
    this.secondary = req?.secondary
    this.province = req?.province
    this.city = req?.city
    this.zone = req?.zone
    this.postalCode = req?.postal_code
    this.phoneNumber = req?.phone_number
    this.email = req?.email
    this.isDefault = req?.is_default
    this.userId = req?.user_id
  }

}

module.exports = Address