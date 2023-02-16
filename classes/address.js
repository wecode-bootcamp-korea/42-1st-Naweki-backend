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

  keyCheck() {
    return (
      this.firstName &&
      this.lastName &&
      this.primary &&
      this.secondary &&
      this.province &&
      this.city &&
      this.zone &&
      this.postalCode &&
      this.phoneNumber &&
      this.email &&
      this.userId
    )
  }
}

module.exports = Address