const { pool } = require("../server/server");

const getProductByIdAndUser = async (product_id, user_id) => {
    return await pool.query('SELECT * FROM products WHERE id = $1 AND user_id = $2', [product_id, user_id]);
};

const deleteProduct = async (product_id) => {
    return await pool.query('DELETE FROM products WHERE id = $1', [product_id]);
};

module.exports = { getProductByIdAndUser, deleteProduct };
