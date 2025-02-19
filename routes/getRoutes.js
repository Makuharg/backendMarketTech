const express = require('express');
const router = express.Router();
const GetUsersController = require('../controllers/getUsersController');
const GetProductsController = require('../controllers/getProductsController');
const GetCartController = require('../controllers/getCartController');
const GetTransactionController = require('../controllers/getTransactionController');
const GetTransactionDetailController = require('../controllers/getTransactionDetailController');
const { authenticateUser } = require('../middlewares/authUser');

router.get('/users', GetUsersController.getUsers);
router.get('/products', GetProductsController.getProducts);
router.get('/cart/:user_id', authenticateUser, GetCartController.getCart);
router.get('/transactions/:user_id', authenticateUser, GetTransactionController.getUserTransactions);
router.get('/transactions/detail/:transaction_id', authenticateUser, GetTransactionDetailController.getTransactionDetails);

module.exports = router;
