const { pool } = require("../server/server");

const beginTransaction = async () => {
    await pool.query('BEGIN');
};

const rollbackTransaction = async () => {
    await pool.query('ROLLBACK');
};

const commitTransaction = async () => {
    await pool.query('COMMIT');
};

const getCartItems = async (userId) => {
    return await pool.query('SELECT * FROM cart WHERE user_id = $1', [userId]);
};

const getProductDetails = async (productId) => {
    return await pool.query(
        'SELECT price, user_id AS seller_id FROM products WHERE id = $1',
        [productId]
    );
};

const insertTransactionDetail = async (transactionId, productId, quantity, unitPrice, buyerId, sellerId) => {
    await pool.query(
        `INSERT INTO transaction_details 
         (transaction_id, product_id, quantity, unit_price, buyer_id, seller_id) 
         VALUES ($1, $2, $3, $4, $5, $6)`,
        [transactionId, productId, quantity, unitPrice, buyerId, sellerId]
    );
};

const updateProductStock = async (quantity, productId) => {
    await pool.query('UPDATE products SET stock = stock - $1 WHERE id = $2', [quantity, productId]);
};

const clearCart = async (userId) => {
    await pool.query('DELETE FROM cart WHERE user_id = $1', [userId]);
};

const getTransactionDetails = async (transactionId) => {
    return await pool.query(
        `SELECT 
            td.id,
            td.transaction_id,
            td.product_id,
            td.quantity,
            td.unit_price,
            td.subtotal,
            td.buyer_id,
            td.seller_id,
            u_buyer.username AS buyer_name,
            u_seller.username AS seller_name,
            t.date
         FROM 
            transaction_details td
         JOIN 
            products p ON td.product_id = p.id
         JOIN 
            users u_buyer ON td.buyer_id = u_buyer.id
         JOIN 
            users u_seller ON td.seller_id = u_seller.id
         JOIN 
            transactions t ON td.transaction_id = t.id
         WHERE 
            td.transaction_id = $1`,
        [transactionId]
    );
};

module.exports = {
    beginTransaction,
    rollbackTransaction,
    commitTransaction,
    getCartItems,
    getProductDetails,
    insertTransactionDetail,
    updateProductStock,
    clearCart,
    getTransactionDetails
};

