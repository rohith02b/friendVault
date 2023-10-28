const router = require('express').Router()
const { login } = require('../controllers/AuthController/Login')
const { register } = require('../controllers/AuthController/Register')
const { logout } = require('../controllers/AuthController/Logout')

router.post('/register', register)

router.post('/login', login)

router.post('/logout', logout)

module.exports = router
