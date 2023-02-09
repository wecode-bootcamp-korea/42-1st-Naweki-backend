const express = require('express')
const userController = require('../controllers/userController')

const router = express.Router()

router.get('/lookup', userController.lookup)

router.post('/join', userController.join)

module.exports = router