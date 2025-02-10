const express = require('express');
const router = express.Router();
const UpdateCartController = require('../controllers/updateCartController');
const { authenticateUser } = require('../middlewares/authUser');


router.post('/user/cart/:product_id', authenticateUser, UpdateCartController.updateCartQuantity);

module.exports = router;
