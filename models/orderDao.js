const database = require('./index')
const { ORDER_STATUS } = require('../utils/enum')
const { PAYMENT_METHOD } = require('../utils/paymentsMethod')
const message = require('../utils/error/globalErrMsg')

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

const checkout = async (user, cart, orderNumber) => {
  let orderId = ''
  const queryRunner = database.createQueryRunner()
  queryRunner.connect()
  queryRunner.startTransaction()
  try {
    const paymentAmount = getPaymentAmount(cart)
    await checkStockFromProductsOptions(queryRunner, cart)
    orderId = await postOrders(queryRunner, user, orderNumber, paymentAmount)
    await postOrderItem(queryRunner, orderId, cart, ORDER_STATUS.COMPLETE)
    await calcUserPoint(queryRunner, user, paymentAmount)
    await calcProductStock(queryRunner, cart)
    await deleteCartByUserId(queryRunner, user.id)
    await queryRunner.commitTransaction()
    return orderId
  } catch (err) {
    await queryRunner.rollbackTransaction()
    err = message[err.message]?.message ? err : new Error('CHECKOUT_FAILED_ERROR')
    err.statusCode = 400
    throw err
  } finally {
    await queryRunner.release()
    return orderId
  }
}

const checkStockFromProductsOptions = async (queryRunner, cart) => {
  const rawQuery = `
  SELECT
    c.product_id,
    c.user_id,
    p.name,
    po.quantity stock
  FROM cart c
  INNER JOIN products p
  ON c.product_id = p.id
  INNER JOIN products_options po
  ON p.id = po.product_id
  WHERE c.product_id = ?;`

  for (let index = 0; index < cart.length; index++) {
    const [{ stock }] = await queryRunner.query(rawQuery, [cart[index].productId])
    if (stock === 0) {
      throw new Error(`NO_STOCK_FOR_PRODUCT_ID_${cart[index].productId}`)
    }
  }

  return
}

const postOrders = async (queryRunner, user, orderNumber, paymentAmount) => {
  const rawQuery = `
    INSERT INTO orders
      (order_number,
        user_id,
        email,
        payment_method,
        payment_amount,
        order_status_id)
    VALUES(?, ?, ?, ?, ?, ?);`

  const { insertId: orderId } = await queryRunner.query(rawQuery, [
    orderNumber,
    user.id,
    user.email,
    PAYMENT_METHOD,
    paymentAmount,
    ORDER_STATUS.COMPLETE])

  return orderId
}

const postOrderItem = async (queryRunner, orderId, cart, orderStatusId) => {
  for (let index = 0; index < cart.length; index++) {
    const rawQuery = `
      INSERT INTO order_items
      (quantity, price, order_id, product_id, order_status_id)
      VALUES
      (?, ?, ?, ?, ?);`
    const { affectedRows } = await queryRunner
      .query(rawQuery, [
        cart[index].quantity,
        cart[index].productPrice,
        orderId,
        cart[index].productId,
        orderStatusId])
    if (affectedRows != 1) throw new Error('NOT_INSERTED_ORDER_ITEM')
  }

  return
}

const deleteCartByUserId = async (queryRunner, userId) => {
  const rawQuery = `
  DELETE FROM cart WHERE user_id = ?;`

  const { affectedRows } = await queryRunner.query(rawQuery, userId)
  if (affectedRows == 0) throw new Error('NOT_DELETED_FROM_CART')

  return
}

const getPaymentAmount = (cart) => {
  let paymentAmount = 0
  cart.forEach(cart => {
    paymentAmount += cart.productPrice * cart.quantity
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

const calcProductStock = async (queryRunner, cart) => {
  for (let i = 0; i < cart.length; i++) {
    const rawQuery = `
    UPDATE
    products_options po
    SET po.quantity = po.quantity - (SELECT c.quantity FROM cart c WHERE c.product_id = ?)
    WHERE po.product_id = ?;`

    const result = await queryRunner.query(rawQuery, [cart[i].productId, cart[i].productId])

    if (result.affectedRows != 1) throw new Error('FAILED_TO_CACL_STOCK')
  }

  return
}

module.exports = {
  checkout,
  getOrderFromCart,
  getOrder,
  getProductsByProductIds,
  getOptionsByProductIds
}