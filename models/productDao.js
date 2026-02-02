const database = require('./index')

const lookupByProductId = async (productId) => {
  try {
    const rawQuery = `
    SELECT EXISTS
    (SELECT
      id
    FROM products
    WHERE id = ?) as result;
    `
    const [result] = await database.query(rawQuery, productId)
    return result
  } catch (err) {
    throw new Error('invalidInputErr')
  }
}

const getProducts = async (filter) => {
  let where = []

  const { category, subCategory, gender, color, limit, offset, sort } = filter

  category ? where.push(`c.name = '${category}'`) : ''
  subCategory ? where.push(`sc.name = '${subCategory}'`) : ''
  gender ? where.push(`p.gender = '${gender}'`) : ''
  color ? where.push(`p.color = '${color}'`) : ''

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
    p.discount_rate discountRate,
    p.created_at createdAt,
    p.thumbnail_image thumbnailImage,
    p.gender,
    p.color,
    sc.name subCategory,
    c.name mainCategory
  FROM products p
  INNER JOIN sub_categories sc
  ON sc.id = p.sub_category_id
  INNER JOIN categories c
  ON c.id = sc.category_id
  ${where.length ? `WHERE ${where}` : ''}
  ${sortSets[sort] ? sortSets[sort] : 'ORDER BY p.id ASC'}
  ${limit ? `limit ${limit}` : ' '}
  ${offset ? `offset ${offset}` : ' '};`

  const products = await database.query(rawQuery)

  return products
}

const getProductDetails = async (productId) => {
  try {
    const productQuery = `
    SELECT
      p.id,
      p.name,
      CONCAT(p.gender, ' ', mc.name) as subName,
      p.price,
      p.thumbnail_image as thumbnailImage,
      sc.name as subCategory,
      mc.name as mainCategory,
      p.description,
      p.color as currentColor,
      p.style_code as styleCode,
      p.discount_rate as discountRate,
      p.created_at as createdAt,
      p.updated_at as updatedAt
    FROM products p
    JOIN sub_categories sc ON p.sub_category_id = sc.id
    JOIN categories mc ON sc.category_id = mc.id
    LEFT JOIN products_images pi ON pi.product_id = p.id
    WHERE p.id = ?
    GROUP BY p.id;
    `

    const [product] = await database.query(productQuery, [productId])

    const productImages = `
    SELECT
      id,
      url
    FROM products_images
    WHERE product_id = ?;
    `
    const images = await database.query(productImages, [productId])
    product.imageUrl = images

    const productStockQuery = `
    SELECT
      b.id,
      b.value as size,
      SUM(a.quantity) as count
    FROM products_options a
    JOIN sizes b ON a.size_id = b.id
    WHERE a.product_id = ?
    GROUP BY b.id;
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
        'name', CONCAT(u.last_name, u.first_name)
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
  lookupByProductId,
  getProducts,
  getProductDetails,
}
