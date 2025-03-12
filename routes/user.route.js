const express = require('express');
const router = express.Router();
const { check } = require('express-validator');

const { register, login, refresh, logout } = require('../controllers/user.controller.js');

router.post('/register', [
    check('username', 'Username is required').not().isEmpty(),
    check('email', 'Email is required').isEmail(),
    check('password', 'Password is required').isLength({ min: 6 })
], register)

router.post('/login', login);
router.post('/refresh', refresh);
router.post('/logout', logout);

module.exports = router;