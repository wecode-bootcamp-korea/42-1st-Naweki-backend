const express = require('express')
const userController = require('../controllers/userController')
const { validateToken } = require('../middlewares/auth')

const router = express.Router()

router.post('/lookup', userController.lookUp)
router.post('/signup', userController.signUp)
router.post('/login', userController.login)

router.get('/address', validateToken, userController.getAddress)
router.post('/address', userController.postAddress)

module.exports = router
