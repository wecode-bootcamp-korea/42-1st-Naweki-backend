const express = require('express')
const userController = require('../controllers/userController')

const router = express.Router()

router.post('/lookup', userController.lookUp)

router.post('/signup', userController.signUp)

router.post('/login', userController.login)

module.exports = router
