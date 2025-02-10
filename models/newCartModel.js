const { pool } = require("../server/server");

const getCartItem = async (user_id, product_id) => {
    const consulta = 'SELECT * FROM cart WHERE user_id = $1 AND product_id = $2';
    const values = [user_id, product_id];
    return await pool.query(consulta, values);
};

const updateCartQuantity = async (product_id) => {
    const consulta = 'UPDATE cart SET quantity = quantity + 1 WHERE product_id = $1 RETURNING *';
    const value = [product_id];
    return await pool.query(consulta, value);
};

const addCartItem = async (user_id, product_id, title, image_url, price) => {
    const consulta = 'INSERT INTO cart (user_id, product_id, title, image_url, price, quantity) VALUES ($1,$2,$3,$4,$5,1) RETURNING *';
    const values = [user_id, product_id, title, image_url, price];
    return await pool.query(consulta, values);
};

module.exports = { getCartItem, updateCartQuantity, addCartItem };
