const express = require('express');
const router = express.Router();
const DeleteCartController = require('../controllers/deleteCartController');
const { authenticateUser } = require('../middlewares/authUser');


router.delete('/user/cart', authenticateUser, DeleteCartController.clearCart);

module.exports = router;
