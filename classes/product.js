class Product {
  constructor(productInfo) {
    this.name = productInfo.name
    this.price = productInfo.price
    this.description = productInfo.description
    this.styleCode = productInfo.style_code
    this.subCategoryId = productInfo.sub_category_id
    this.discountRate = productInfo.discount_rate
    this.thumbnailImage = productInfo.thumbnail_image
  }

  keyCheck() {
    if (!this.name || !this.price || !this.description || !this.styleCode)
      return false

    return true
  }
}

module.exports = Product
