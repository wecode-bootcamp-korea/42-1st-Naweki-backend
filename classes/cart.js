class Cart {
  constructor(cartItems) {
    this.userId = cartItems.user_id
    this.productId = cartItems.product_id
    this.sizeId = cartItems?.size_id
    this.quantity = cartItems?.quantity
  }

  keycheck() {
    return Boolean(
      this.userId && this.productId && this.sizeId && this.quantity
    )
  }
}

module.exports = Cart
