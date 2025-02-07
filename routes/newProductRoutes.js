const express = require('express');
const router = express.Router();
const NewProductController = require('../controllers/newProductController');
const { authenticateUser } = require('../middlewares/authUser'); // Middleware de autenticación


router.post('/user/product', authenticateUser, NewProductController.createProduct);

module.exports = router;
