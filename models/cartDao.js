const database = require('./index')

const lookupByCartId = async (cartId) => {
  try {
    const rawQuery = `
    SELECT EXISTS
    (SELECT
      id
    FROM cart
    WHERE id = ?) as result;
    `

    const [result] = await database.query(rawQuery, [cartId])
    return result
  } catch (err) {
    throw err
  }
}

const lookupBySizeId = async (userId, productId, sizeId) => {
  try {
    const rawQuery = `
    SELECT
      id,
      quantity
    FROM cart
    WHERE user_id = ? AND product_id = ? AND size_id = ?;
    `
    const [result] = await database.query(rawQuery, [userId, productId, sizeId])
    return result
  } catch (err) {
    throw err
  }
}

const getCart = async (userId) => {
  try {
    const rawQuery = `
    SELECT
      c.id as cartItemId,
      c.user_id as userId,
      c.quantity as quantity,
      c.product_id as productId,
      p.name as productName,
      CONCAT(p.gender, ' ', mc.name) as subName,
      p.price as price,
      (p.price - (p.price * p.discount_rate)) as discountPrice,
      p.style_code as styleCode,
      p.color,
      p.thumbnail_image as thumbnailImage,
      s.value as size,
      po.quantity as stock,
      c.created_at as createdAt,
      c.updated_at as updatedAt
    FROM cart c
    JOIN users u ON c.user_id = u.id
    JOIN products p ON c.product_id = p.id
    LEFT JOIN sub_categories sc ON p.sub_category_id = sc.id
    LEFT JOIN categories mc ON sc.category_id = mc.id
    LEFT JOIN sizes s ON c.size_id = s.id
    LEFT JOIN products_options po ON po.product_id = p.id AND po.size_id = s.id
    WHERE c.user_id = ?;
    `
    
    const items = await database.query(rawQuery, userId)

    for (let i = 0; i < items.length; i++) {
      items[i].price = parseFloat(items[i].price)
    }

    return items
  } catch (err) {
    console.error(err)
    throw err
  }
}

const addCartItem = async (userId, productId, sizeId) => {
  try {
    const rawQuery = `
    INSERT INTO
      cart
    (user_id, product_id, size_id)
    VALUES (?,?,?);
    `

    const { affectedRows } = await database.query(rawQuery, [
      userId,
      productId,
      sizeId,
    ])

    if (affectedRows == 0) {
      throw new Error('failedToAddItemErr')
    }

    return
  } catch (err) {
    throw err
  }
}

const deleteCartItem = async (cartId) => {
  try {
    const rawQuery = `
    DELETE FROM
      cart
    WHERE id = ?;`

    const { affectedRows } = await database.query(rawQuery, cartId)

    if (affectedRows == 0) {
      throw new Error('failedToDeleteItemErr')
    }

    return
  } catch (err) {
    throw err
  }
}

const updateCartItem = async (cartId, sizeId, quantity) => {
  try {
    console.log(cartId, sizeId, quantity)

    if (sizeId) {
      const sizeRawQuery = `
      UPDATE cart
      SET size_id = ?
      WHERE id = ?
      `
      const { affectedRows } = await database.query(sizeRawQuery, [
        sizeId,
        cartId,
      ])
      if (affectedRows == 0) {
        throw new Error('failedToUpdateItemErr')
      }
    }

    if (quantity) {
      const quantityRawQuery = `
          UPDATE cart
          SET quantity = ?
          WHERE id = ?;
          `
      const { affectedRows } = await database.query(quantityRawQuery, [
        quantity,
        cartId,
      ])

      if (affectedRows == 0) {
        throw new Error('failedToUpdateItemErr')
      }
    }
    return
  } catch (err) {
    throw err
  }
}

module.exports = {
  lookupByCartId,
  lookupBySizeId,
  getCart,
  addCartItem,
  deleteCartItem,
  updateCartItem,
}
