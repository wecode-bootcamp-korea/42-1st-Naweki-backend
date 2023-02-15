const express = require('express')
const productController = require('../controllers/productController')

const router = express.Router()

router.get('/', productController.getProducts)
router.get('/:productId', productController.getProductDetails)

module.exports = router
