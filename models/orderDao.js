const database = require('./index')

const insertCart = async (userId, productOptionsId) => {
  const rawQuery = `
  INSERT INTO cart
  (user_id, product_options_id, quantity)
  VALUES
  (?, ?, ?)`

  return await database.query(rawQuery, [userId, productOptionsId, 1])
}

const getProductsFromCartByUserId = async (userId) => {
  const rawQuery = `
  SELECT
    id,
    user_id,
    product_id,
    quantity,
    created_at,
    updated_at
  FROM cart WHERE user_id = ?;`
  const products = await database.query(rawQuery, userId)
  console.log(products)
  return products
}

const postOrder = async () => {

}

module.exports = {
  getProductsFromCartByUserId,
  postOrder,
  insertCart
}