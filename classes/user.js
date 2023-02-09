class User {
  constructor(userInfo) {
    this.first_name = userInfo.first_name
    this.last_name = userInfo.last_name
    this.email = userInfo.email
    this.password = userInfo.password
    this.shopping_preference = userInfo.shopping_preference
    this.birthday = userInfo.birthday
  }

  keyCheck() {
    if (
      !this.first_name ||
      !this.last_name ||
      !this.email ||
      !this.password ||
      !this.shopping_preference ||
      !this.birthday) return false

    return true
  }
}

module.exports = User