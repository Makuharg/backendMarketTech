const { pool } = require("../server/server");

const createReview = async (product_id, user_id, rating, comment) => {
    return await pool.query(
        `INSERT INTO reviews (product_id, user_id, rating, comment) 
         VALUES ($1, $2, $3, $4) RETURNING *`,
        [product_id, user_id, rating, comment]
    );
};

const getReviewsByProduct = async (product_id) => {
    return await pool.query(
        `SELECT 
            r.id, r.rating, r.comment, r.comment_date, 
            u.username AS reviewer 
         FROM reviews r
         JOIN users u ON r.user_id = u.id
         WHERE r.product_id = $1
         ORDER BY r.comment_date DESC`,
        [product_id]
    );
};

const getReviewById = async (review_id) => {
    return await pool.query(
        `SELECT * FROM reviews WHERE id = $1`,
        [review_id]
    );
};

const updateReview = async (review_id, rating, comment) => {
    return await pool.query(
        `UPDATE reviews SET rating = $1, comment = $2, comment_date = NOW() 
         WHERE id = $3 RETURNING *`,
        [rating, comment, review_id]
    );
};

const deleteReview = async (review_id) => {
    return await pool.query(
        `DELETE FROM reviews WHERE id = $1 RETURNING *`,
        [review_id]
    );
};

module.exports = {
    createReview,
    getReviewsByProduct,
    getReviewById,
    updateReview,
    deleteReview
};