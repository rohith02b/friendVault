const router = require('express').Router();
const { login } = require('../controllers/authController/login');
const { register } = require('../controllers/authController/register');
const { logout } = require('../controllers/authController/logout');

router.post('/register', register);

router.post('/login', login);

router.post('/logout', logout);

module.exports = router;
