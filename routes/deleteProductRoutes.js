const express = require('express');
const router = express.Router();
const DeleteProductController = require('../controllers/deleteProductController');
const { authenticateUser } = require('../middlewares/authUser');


router.delete('/user/product/:id', authenticateUser, DeleteProductController.deleteProduct);

module.exports = router;
