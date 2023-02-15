class User {
  constructor(userInfo) {
    this.id = userInfo?.id
    this.firstName = userInfo?.firstName
    this.lastName = userInfo?.lastName
    this.email = userInfo?.email
    this.password = userInfo?.password
    this.shoppingPreference = userInfo?.shoppingPreference
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
