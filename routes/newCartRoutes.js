const express = require('express');
const router = express.Router();
const NewCartController = require('../controllers/newCartController');


router.post('/user/cart', NewCartController.addToCart);

module.exports = router;
