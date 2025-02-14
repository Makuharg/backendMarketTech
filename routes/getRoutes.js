const express = require('express');
const router = express.Router();
const GetUsersController = require('../controllers/getUsersController');
const GetProductsController = require('../controllers/getProductsController');
const GetCartController = require('../controllers/getCartController');
const GetTransactionController = require('../controllers/getTransactionController');
const { authenticateUser } = require('../middlewares/authUser');

router.get('/users', GetUsersController.getUsers);
router.get('/products', GetProductsController.getProducts);
router.get('/cart/', authenticateUser, GetCartController.getCart);
router.get('/transactions/', authenticateUser, GetTransactionController.getTransactions);

module.exports = router;
