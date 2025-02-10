const express = require('express');
const router = express.Router();
const UpdateProductController = require('../controllers/updateProductController');
const { authenticateUser } = require('../middlewares/authUser');


router.put('/user/product/:id', authenticateUser, UpdateProductController.updateProduct);

module.exports = router;
