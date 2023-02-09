const express = require('express')
const userController = require('../controllers/userController')

const router = express.Router()

router.get('/lookup', userController.lookUp)

router.post('/signup', userController.signUp)

module.exports = router