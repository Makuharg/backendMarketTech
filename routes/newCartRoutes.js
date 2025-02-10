const express = require('express');
const router = express.Router();
const NewCartController = require('../controllers/newCartController');
const { authenticateUser } = require('../middlewares/authUser');


router.post('/user/cart', authenticateUser, NewCartController.addToCart);

module.exports = router;
