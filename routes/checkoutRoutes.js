const express = require('express');
const router = express.Router();
const CheckoutController = require('../controllers/checkoutController');
const { authenticateUser } = require('../middlewares/authUser');

router.post('/user/cart/checkout', authenticateUser, CheckoutController.checkoutCart);

module.exports = router;
