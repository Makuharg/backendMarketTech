const reviewModel = require('../models/reviewModel');
const reviewView = require('../views/reviewView');

const createReview = async (req, res) => {
    const userId = req.user.id;
    const { product_id, rating, comment } = req.body;

    if (!product_id || !rating || rating < 1 || rating > 5) {
        return reviewView.renderErrorResponse(res, 400, 'Datos inválidos. La calificación debe estar entre 1 y 5.');
    }

    try {
        const newReview = await reviewModel.createReview(productId, userId, rating, comment);
        return reviewView.renderReviewResponse(res, newReview.rows[0], 'Reseña creada con éxito.');
    } catch (error) {
        console.error(error);
        return reviewView.renderErrorResponse(res, 500, 'Error al crear la reseña.');
    }
};

const getReviewsByProduct = async (req, res) => {
    const { product_id } = req.params;

    try {
        const reviews = await reviewModel.getReviewsByProduct(product_id);
        return reviewView.renderReviewsList(res, reviews.rows);
    } catch (error) {
        console.error(error);
        return reviewView.renderErrorResponse(res, 500, 'Error al obtener las reseñas.');
    }
};

const updateReview = async (req, res) => {
    const { review_id } = req.params;
    const { rating, comment } = req.body;

    if (!rating || rating < 1 || rating > 5) {
        return reviewView.renderErrorResponse(res, 400, 'La calificación debe estar entre 1 y 5.');
    }

    try {
        const updatedReview = await reviewModel.updateReview(review_id, rating, comment);

        if (updatedReview.rows.length === 0) {
            return reviewView.renderErrorResponse(res, 404, 'Reseña no encontrada.');
        }

        return reviewView.renderReviewResponse(res, updatedReview.rows[0], 'Reseña actualizada con éxito.');
    } catch (error) {
        console.error(error);
        return reviewView.renderErrorResponse(res, 500, 'Error al actualizar la reseña.');
    }
};

const deleteReview = async (req, res) => {
    const { review_id } = req.params;

    try {
        const deletedReview = await reviewModel.deleteReview(review_id);

        if (deletedReview.rows.length === 0) {
            return reviewView.renderErrorResponse(res, 404, 'Reseña no encontrada.');
        }

        return reviewView.renderReviewResponse(res, deletedReview.rows[0], 'Reseña eliminada con éxito.');
    } catch (error) {
        console.error(error);
        return reviewView.renderErrorResponse(res, 500, 'Error al eliminar la reseña.');
    }
};

module.exports = {
    createReview,
    getReviewsByProduct,
    updateReview,
    deleteReview
};
