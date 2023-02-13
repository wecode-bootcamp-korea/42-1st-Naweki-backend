const database = require('./index')

const getProducts = async (filter) => {
  let where = []

  const {
    category,
    sub_category,
    gender,
    limit,
    offset,
    sort } = filter

  category ? where.push(`c.name = '${category}'`) : ''
  sub_category ? where.push(`sc.name = '${sub_category}'`) : ''
  gender ? where.push(`g.type = '${gender}'`) : ''

  where = where.join(' AND ')

  let sortSets = {
    'productIdAsc': 'ORDER BY p.id ASC',
    'productIdDesc': 'ORDER BY p.id DESC',
    'priceDesc': 'ORDER BY p.price DESC',
    'priceAsc': 'ORDER BY p.price ASC',
    'newest': 'ORDER BY p.created_at DESC'
  }

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
    INNER JOIN products_options po
    ON po.product_id = p.id
    INNER JOIN genders g
    ON po.gender_id = g.id
    ${where.length ? `WHERE ${where}` : ' '}
    GROUP BY p.id
    ${sortSets[sort] ? sortSets[sort] : 'ORDER BY p.id ASC'}
    ${limit ? `limit ${limit}` : ' '}
    ${offset ? `offset ${offset}` : ' '};`

  const products = await database.query(rawQuery)

  return products
}

const getProductOptions = async (productIds, filter) => {
  if (!productIds.length) return []

  let where = []

  const gender = filter.gender ? `g.type = '${filter.gender}'` : ' '
  if (gender != ' ') {
    where.push(gender)
  }

  const productId = `po.product_id IN(${Array(productIds.length).fill('?').join(',')
    })`

  where.push(productId)
  where = where.join(' AND ')

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
    WHERE ${where}
    GROUP BY po.product_id, g.type; `

  const productOptions = await database.query(rawQuery, productIds)

  return productOptions
}
module.exports = {
  getProducts,
  getProductOptions
}