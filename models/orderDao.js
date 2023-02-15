const { query } = require('express')
const database = require('./index')

const insertCart = async (userId, productOptionsId) => {
  const rawQuery = `
  INSERT INTO cart
  (user_id, product_options_id, quantity)
  VALUES
  (?, ?, ?)`

  return await database.query(rawQuery, [userId, productOptionsId, 1])
}

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

// 1. UUID  생성
// 2. tracsaction start
// 3. insert postorderitem
// 4. insert postorder
// 5. delete cart

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

    const orderStatusId = 1
    const { affectedRows, insertId } = await queryRunner
      .query(rawQuery, [orderNumber, user.id, user.email, 'point', paymentAmount, orderStatusId])
    postOrderItem(queryRunner, insertId, cart, orderStatusId)
    await queryRunner.commitTransaction()
  } catch (err) {
    console.error(err)
    await queryRunner.rollbackTransaction()
  } finally {
    await queryRunner.release()
  }

  return
}

const postOrderItem = async (queryRunner, orderId, cart, orderStatusId) => {
  cart.forEach(c => {
    try {
      const rawQuery = `
      INSERT INTO order_items
      (quantity, price, order_id, product_id, order_status_id)
      VALUES
      (?, ?, ?, ?, ?);`
      queryRunner.query(rawQuery, [c.quantity, c.productPrice, orderId, c.productId, orderStatusId])
    } catch (err) {
      console.error(err)
      throw err
    }
  })

  return
}

const getPaymentAmount = (cart) => {
  let paymentAmount = 0
  cart.forEach(c => {
    paymentAmount += c.productPrice
  })

  return paymentAmount
}

// try {

//   const orderItemsColumns = [
//     'quantity',
//     'price',
//     'order_id',
//     'product_id',
//     'order_status_id']

//   table = 'order_items'
//   columns = orderItemsColumns.join(',')
//   queries = Array(orderItemsColumns.length).fill('?').join(',')
//   const rawQuery = `
//       INSERT INTO
//       ${table} ${columns}
//       VALUES
//       (${queries});`

//   console.log(rawQuery)


// try {
//   // execute some operations on this transaction:
//   // await queryRunner.manager.save(user2)
//   // await queryRunner.manager.save(photos)

//   // commit transaction now:
//   await queryRunner.commitTransaction()

// 1 postOrderItem

// 2 postOrder

// 3 deleteCart

const deleteCart = async (user, shippingAddress, cart) => {
  return
}

module.exports = {
  getOrderFromCart,
  postOrders,
  getProductsByProductIds,
  getOptionsByProductIds,
  insertCart
}