const { pool } = require("../server/server");

const getCartItem = async (user_id, product_id) => {
    return await pool.query(
        'SELECT * FROM cart WHERE user_id = $1 AND product_id = $2',
        [user_id, product_id]
    );
};

const deleteCartItem = async (user_id, product_id) => {
    return await pool.query(
        'DELETE FROM cart WHERE user_id = $1 AND product_id = $2 RETURNING *',
        [user_id, product_id]
    );
};

module.exports = { getCartItem, deleteCartItem };
