const database = require('./index')

const getProducts = async (limit, offset) => {
  // const rawQuery = `SELECT id, name, price FROM products;`
  const rawQuery =
    `SELECT
      id,
      name,
      price
    FROM
      products
    LIMIT ? OFFSET ?;`
  const products = await database
    .query(rawQuery, [limit, offset])
  console.log(products)
  return products
}

// SELECT * FROM products limit 5 offset 0
// SELECT * FROM products limit 5 offset 5
// SELECT * FROM products limit 5 offset 10

module.exports = {
  getProducts
}