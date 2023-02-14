const database = require('./index')

const getProducts = async (filter) => {
  let where = []

  const { category, sub_category, gender, limit, offset, sort } = filter

  category ? where.push(`c.name = '${category}'`) : ''
  sub_category ? where.push(`sc.name = '${sub_category}'`) : ''
  gender ? where.push(`g.type = '${gender}'`) : ''

  where = where.join(' AND ')

  let sortSets = {
    productIdAsc: 'ORDER BY p.id ASC',
    productIdDesc: 'ORDER BY p.id DESC',
    priceDesc: 'ORDER BY p.price DESC',
    priceAsc: 'ORDER BY p.price ASC',
    newest: 'ORDER BY p.created_at DESC',
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

  const { gender } = filter
  const productId = `po.product_id IN(${Array(productIds.length)
    .fill('?')
    .join(',')})`

  gender ? where.push(`g.type = '${gender}'`) : ''
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

const getDetails = async (productId) => {
  try {
    const productQuery = `
    SELECT
      p.id,
      p.name,
      CONCAT(g.type, ' ', mc.name) as subName,
      p.price,
      p.thumbnail_image as thumbnailImage,
      sc.name as subCategory,
      mc.name as mainCategory,
      p.description,
      c.type as currentColor,
      p.style_code as styleCode,
      p.discount_rate as discountRate,
      p.created_at as createdAt,
      GROUP_CONCAT(pi.url) as imageUrl
    FROM products p
    INNER JOIN products_images pi ON pi.product_id = p.id
    INNER JOIN products_options po ON po.product_id = p.id
    INNER JOIN sub_categories sc ON p.sub_category_id = sc.id
    INNER JOIN categories mc ON sc.category_id = mc.id
    INNER JOIN genders g ON po.gender_id = g.id AND po.product_id = p.id
    INNER JOIN colors c ON po.color_id = c.id AND po.product_id = p.id 
    INNER JOIN sizes sv ON po.size_id = sv.id AND po.product_id = p.id
    where p.id = 1
    GROUP BY p.id, g.type, sv.value, po.quantity, c.type;
    `
    const [product] = await database.query(productQuery, [productId])

    const productStockQuery = `
    SELECT
      b.value as size,
      SUM(a.quantity) as count
    FROM products_options a
    JOIN sizes b ON a.size_id = b.id
    WHERE a.product_id = 1
    GROUP BY b.value;
    `

    const stock = await database.query(productStockQuery, [productId])
    product.stock = stock

    const reviewQuery = `
    SELECT
    JSON_ARRAYAGG(
      JSON_OBJECT(
        'id', r.id,
        'title', r.title,
        'description', r.description,
        'rating', r.rating,
        'createdAt', r.created_at,
        'name', CONCAT(u.first_name, ' ', u.last_name)
      )) as reviews
    FROM reviews r
    JOIN order_items ot ON r.order_item_id = ot.id
    JOIN orders o ON ot.order_id = o.id
    JOIN users u ON o.user_id = u.id
    WHERE ot.product_id = ?;
    `
    const [review] = await database.query(reviewQuery, [productId])
    product.reviews = JSON.parse(review.reviews)

    return product
  } catch (error) {
    throw new Error('invalidInputErr')
  }
}

module.exports = {
  getProducts,
  getProductOptions,
  getDetails,
}
