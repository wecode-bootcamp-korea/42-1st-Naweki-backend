const database = require('./index')
const { OrderStatusEnum } = require('../utils/enum')

const getOrderFromCart = async (userId) => {
  const rawQuery = `
  SELECT
    id,
    user_id userId,
    product_id productId,
    quantity,
    created_at createdAt,
    updated_at updatedAt
  FROM cart WHERE user_id = ?
  ORDER BY id ASC;`
  const order = await database.query(rawQuery, userId)
  return order
}

const getProductsByProductIds = async (productIds) => {
  const rawQuery = `
  SELECT
    p.id,
    p.name,
    p.price,
    p.style_code styleCode,
    p.color
  FROM products p
  WHERE p.id IN (${productIds.join(',')})
  ORDER BY p.id ASC;`

  const products = await database.query(rawQuery)

  return products
}

const getOptionsByProductIds = async (productIds) => {
  const rawQuery = `
  SELECT
    po.id,
    po.product_id productId,
    po.quantity stock,
    po.size_id sizeId,
    s.value size
  FROM products_options po
  INNER JOIN sizes s ON s.id = po.size_id
  WHERE product_id IN (${productIds.join(',')});`

  const options = await database.query(rawQuery)

  return options
}

const getOrder = async (queryRunner, orderId) => {
  const rawQuery = `
  SELECT
	JSON_OBJECT (
    'id', o.id,
    'orderNumber', o.order_number,
    'userId', o.user_id,
    'paymetnMethod', o.payment_method
	) \`order\`,
	JSON_OBJECT(
    'id', u.id,
    'name', CONCAT(u.last_name, u.first_name),
    'email', u.email,
    'point', u.point
	) \`user\`,
	JSON_OBJECT(
    'primary', sa.primary,
    'secondary', sa.secondary,
    'email', sa.email,
    'phoneNumber', sa.phone_number,
    'postalCode', sa.postal_code
	) \`shippingAddress\`
  FROM orders o
  INNER JOIN users u ON o.user_id = u.id
  INNER JOIN shipping_address sa ON u.id = sa.user_id
  WHERE o.id = ?
  LIMIT 1;`

  const [order] = await queryRunner.query(rawQuery, [orderId])
  return order
}

const postOrders = async (user, shippingAddress, cart, orderNumber) => {
  const queryRunner = database.createQueryRunner()
  await queryRunner.connect()
  await queryRunner.startTransaction()

  const paymentAmount = getPaymentAmount(cart)

  try {
    const rawQuery = `
    INSERT INTO orders
      (order_number,
        user_id,
        email,
        payment_method,
        payment_amount,
        order_status_id)
    VALUES(?, ?, ?, ?, ?, ?);`

    const { affectedRows, insertId: orderId } = await queryRunner
      .query(rawQuery,
        [orderNumber,
          user.id,
          user.email,
          'point',
          paymentAmount,
          OrderStatusEnum.COMPLETE])

    if (!affectedRows) throw new Error('Not Inserted')

    await postOrderItem(queryRunner, orderId, cart, orderStatusId)
    await deleteCartByUserId(queryRunner, user.id)
    await calcUserPoint(queryRunner, user, paymentAmount)
    const order = await getOrder(queryRunner, orderId)
    await queryRunner.commitTransaction()

    return order
  } catch (err) {
    console.error(err)
    await queryRunner.rollbackTransaction()
    return false
  } finally {
    await queryRunner.release()
  }
}

const postOrderItem = async (queryRunner, orderId, cart, orderStatusId) => {
  cart.forEach(async c => {
    const rawQuery = `
      INSERT INTO order_items
      (quantity, price, order_id, product_id, order_status_id)
      VALUES
      (?, ?, ?, ?, ?);`
    const { affectedRows } = await queryRunner
      .query(rawQuery, [c.quantity, c.productPrice, orderId, c.productId, orderStatusId])
    if (!affectedRows) throw new Error('Not Inserted.')
  })

  return
}

const deleteCartByUserId = async (queryRunner, userId) => {
  const rawQuery = `
  DELETE FROM cart WHERE user_id = ?;`

  const { affectedRows } = await queryRunner.query(rawQuery, userId)
  if (!affectedRows) throw new Error('Not deleted.')

  return
}

const getPaymentAmount = (cart) => {
  let paymentAmount = 0
  cart.forEach(cart => {
    paymentAmount += cart.productPrice
  })

  return paymentAmount
}

const calcUserPoint = async (queryRunner, user, paymentAmount) => {
  const rawQuery = `
  UPDATE users SET point = point - ? WHERE id = ?;`

  const { affectedRows } = await queryRunner.query(rawQuery, [paymentAmount, user.id])
  if (affectedRows != 1) throw new Error('NOT_UPDATED_USER_POINT')

  return
}

module.exports = {
  getOrderFromCart,
  getOrder,
  postOrders,
  getProductsByProductIds,
  getOptionsByProductIds
}