const database = require('./index')

const getProducts = async (filter) => {
  let where = []

  const category = `${filter.category ?
    `c.name = '${filter.category}'` : ' '}`
  const sub_category = `${filter.sub_category ?
    `sc.name = '${filter.sub_category}'` : ' '}`

  if (category !== ' ' && sub_category !== ' ') {
    where.push(category)
    where.push(sub_category)
  } else if (category !== ' ') {
    where.push(category)
  } else if (sub_category !== ' ') {
    where.push(sub_category)
  }

  where = where.join(' AND ')

  const { limit, offset } = filter
  const rawQuery = `
    SELECT
      p.id,
      p.name,
      p.price,
      p.created_at,
      p.thumbnail_image,
      sc.name sub_category,
      c.name category
    FROM products p
    INNER JOIN sub_categories sc
    ON p.sub_category_id = sc.id
    INNER JOIN categories c
    ON c.id = sc.category_id
    ${where.length ? `WHERE ${where}` : ' '}
    ORDER BY p.id ASC
    ${limit ? ` limit ${limit} ` : ' '}
    ${offset ? ` offset ${offset} ` : ' '};`

  const products = await database.query(rawQuery)

  return products
}

const getProductOptions = async (productIds) => {
  if (!productIds.length) return []

  const rawQuery = `
  SELECT
    po.product_id id,
    JSON_OBJECT(
      'color_count', count(po.color_id),
      'gender', g.type
    ) options
  FROM products_options po
  LEFT JOIN colors c ON po.color_id = c.id
  INNER JOIN genders g ON po.gender_id = g.id
  WHERE po.product_id IN(${Array(productIds.length).fill('?').join(',')})
  GROUP BY po.product_id, g.type;`

  const productOptions = await database.query(rawQuery, productIds)

  return productOptions
}
module.exports = {
  getProducts,
  getProductOptions
}