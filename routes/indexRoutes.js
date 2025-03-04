const express = require('express');
const router = express.Router();
const { authenticateUser } = require('../middlewares/authUser');
const GetUsersController = require('../controllers/getUsersController');
const GetProductsController = require('../controllers/getProductsController');
const GetCartController = require('../controllers/getCartController');
const GetTransactionController = require('../controllers/getTransactionController');
const GetTransactionDetailController = require('../controllers/getTransactionDetailController');
const LoginController = require('../controllers/loginController');
const SignupController = require('../controllers/signupController');
const NewProductController = require('../controllers/newProductController');
const UpdateProductController = require('../controllers/updateProductController');
const DeleteProductController = require('../controllers/deleteProductController');
const NewCartController = require('../controllers/newCartController');
const UpdateCartController = require('../controllers/updateCartController');
const cartController = require('../controllers/deleteCartItemController');
const DeleteCartController = require('../controllers/deleteCartController');
const reviewController = require('../controllers/reviewController');
const CheckoutController = require('../controllers/checkoutController');

router.get('/users', GetUsersController.getUsers);
router.get('/products', GetProductsController.getProducts);
router.get('/cart/:user_id', authenticateUser, GetCartController.getCart);
router.get('/transactions/:user_id', authenticateUser, GetTransactionController.getUserTransactions);
router.get('/transactions/detail/:user_id', authenticateUser, GetTransactionDetailController.getTransactionDetails);
router.post('/login', LoginController.login);
router.post('/signup', SignupController.signUp);
router.post('/user/product', authenticateUser, NewProductController.createProduct);
router.put('/user/product/:id', authenticateUser, UpdateProductController.updateProduct);
router.delete('/user/product/:id', authenticateUser, DeleteProductController.deleteProduct);
router.post('/user/cart', authenticateUser, NewCartController.addToCart);
router.post('/user/cart/update/:product_id', authenticateUser, UpdateCartController.updateCartQuantity);
router.delete('/user/cart/product/:product_id', authenticateUser, cartController.deleteProductFromCart);
router.delete('/user/cart', authenticateUser, DeleteCartController.clearCart);
router.post('/user/cart/checkout', authenticateUser, CheckoutController.checkoutCart);
router.post('/reviews', authenticateUser, reviewController.createReview);
router.get('/reviews/:productId', authenticateUser, reviewController.getReviewsByProduct);
router.put('/reviews/:reviewId', authenticateUser, reviewController.updateReview);
router.delete('/reviews/:reviewId', authenticateUser, reviewController.deleteReview);

module.exports =  
    router
;
