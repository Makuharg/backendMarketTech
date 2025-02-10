const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');
const { authenticateUser } = require('../middlewares/authUser');


router.post('/reviews', authenticateUser, reviewController.createReview);
router.get('/reviews/:productId', reviewController.getReviewsByProduct);
router.put('/reviews/:reviewId', authenticateUser, reviewController.updateReview);
router.delete('/reviews/:reviewId', authenticateUser, reviewController.deleteReview);

module.exports = router;
