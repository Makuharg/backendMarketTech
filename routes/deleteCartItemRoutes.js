const express = require('express');
const router = express.Router();
const cartController = require('../controllers/deleteCartItemController');
const { authenticateUser } = require('../middlewares/authUser');

router.delete('/user/cart/product/:product_id', authenticateUser, cartController.deleteProductFromCart);

module.exports = router;
