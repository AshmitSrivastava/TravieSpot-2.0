const express = require('express');
const {login , logout , signup } = require('../controllers/authController');
const router = express.Router();

router.post('/login', login);
router.post('/signup', signup);
router.get('/logout', logout);

module.exports = router;