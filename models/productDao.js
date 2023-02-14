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
  gender ? where.push(`p.gender = '${gender}'`) : ''

  where = where.join(' AND ')

  let sortSets = {
    'productIdAsc': 'ORDER BY p.id ASC',
    'productIdDesc': 'ORDER BY p.id DESC',
    'priceDesc': 'ORDER BY p.price DESC',
    'priceAsc': 'ORDER BY p.price ASC',
    'newest': 'ORDER BY p.created_at DESC'
  }

  const rawQueryTest = `
  SELECT
    p.id,
    p.name,
    p.price,
    p.created_at,
    p.thumbnail_image,
    p.gender,
    p.color,
    sc.name sub_category,
    c.name category
  FROM products p
  INNER JOIN sub_categories sc
  ON sc.id = p.sub_category_id
  INNER JOIN categories c
  ON c.id = sc.category_id
  ${where.length ? `WHERE ${where}` : ''}
  ${sortSets[sort] ? sortSets[sort] : 'ORDER BY p.id ASC'}
  ${limit ? `limit ${limit}` : ' '}
  ${offset ? `offset ${offset}` : ' '};`


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

  const products = await database.query(rawQueryTest)

  return products
}

module.exports = {
  getProducts
}