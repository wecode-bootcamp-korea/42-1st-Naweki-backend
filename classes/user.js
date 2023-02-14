class User {
  constructor(userInfo) {
    this.id = userInfo?.id
    this.firstName = userInfo?.first_name
    this.lastName = userInfo?.last_name
    this.email = userInfo?.email
    this.password = userInfo?.password
    this.shoppingPreference = userInfo?.shopping_preference
    this.birthday = userInfo?.birthday
  }

  keyCheck() {
    if (
      !this.firstName ||
      !this.lastName ||
      !this.email ||
      !this.password ||
      !this.shoppingPreference ||
      !this.birthday
    )
      return false

    return true
  }
}

module.exports = User
