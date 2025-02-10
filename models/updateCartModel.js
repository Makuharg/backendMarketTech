const { pool } = require("../server/server");

const getCartItem = async (user_id, product_id) => {
    const consulta = 'SELECT * FROM cart WHERE user_id = $1 AND product_id = $2';
    const values = [user_id, product_id];
    return await pool.query(consulta, values);
};

const incrementCartQuantity = async (product_id) => {
    const consulta = 'UPDATE cart SET quantity = quantity + 1 WHERE product_id = $1 RETURNING *';
    const values = [product_id];
    return await pool.query(consulta, values);
};

const decrementCartQuantity = async (product_id) => {
    const consulta = 'UPDATE cart SET quantity = quantity - 1 WHERE product_id = $1 RETURNING *';
    const values = [product_id];
    return await pool.query(consulta, values);
};

const removeCartItem = async (product_id) => {
    const consulta = 'DELETE FROM cart WHERE product_id = $1';
    const values = [product_id];
    return await pool.query(consulta, values);
};

module.exports = { getCartItem, incrementCartQuantity, decrementCartQuantity, removeCartItem };
