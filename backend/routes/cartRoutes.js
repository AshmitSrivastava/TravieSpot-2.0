const express = require('express');
const {addToCart , getCart , removeFromCart , syncCart} = require('../controllers/cartController');
const authenticate = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/add', authenticate , addToCart);
router.get('/',authenticate , getCart);
router.delete('/:cartId', authenticate , removeFromCart);
router.post('/sync' ,authenticate , syncCart);


module.exports = router;