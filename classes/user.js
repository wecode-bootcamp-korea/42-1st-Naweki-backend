class User {
  constructor(userInfo) {
    this.id = userInfo?.id
    this.firstName = userInfo?.firstName
    this.lastName = userInfo?.lastName
    this.email = userInfo?.email
    this.password = userInfo?.password
    this.shoppingPreference = userInfo?.shoppingPreference
    this.birthday = userInfo?.birthday
    this.point = userInfo?.point
  }

  keyCheck() {
    return Boolean(
      this.firstName &&
      this.lastName &&
      this.email &&
      this.password &&
      this.shoppingPreference &&
      this.birthday)
  }
}

module.exports = User
