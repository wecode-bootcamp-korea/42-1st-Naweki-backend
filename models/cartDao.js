const database = require('./index')

const getCart = async (userId) => {
  const rawQuery = `
    SELECT
      c.id,
      c.user_id,
      p.name,
      s.value
    FROM cart c
    JOIN users u ON c.user_id = u.id
    JOIN products p ON c.product_id = p.id
    LEFT JOIN sizes s ON c.size_id = s.id
    WHERE c.user_id = ?;
    `

  const result = await database.query(rawQuery, [userId])
  return result
}

const addCartItem = async (product) => {
  try {
    const { userId, productId, sizeId, quantity } = product

    const rawQuery = `
    INSERT INTO
      cart
    (user_id, product_id, size_id, quantity)
    VALUES (?,?,?,?);
    `

    const result = await database.query(rawQuery, [
      userId,
      productId,
      sizeId,
      quantity,
    ])

    return
  } catch (err) {
    throw new Error('failedToAddItem')
  }
}

const deleteCartItem = async (cartId) => {
  try {
    const rawQuery = `
    DELETE FROM
      cart
    WHERE c.id = ?;
    `

    await database.query(rawQuery, [cartId])
    return
  } catch (err) {
    throw new Error('failedToDeleteItem')
  }
}

module.exports = {
  getCart,
  addCartItem,
  deleteCartItem,
}
