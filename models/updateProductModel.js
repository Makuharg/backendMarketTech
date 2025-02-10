const { pool } = require("../server/server");

const getProductByIdAndUser = async (product_id, user_id) => {
    return await pool.query('SELECT * FROM products WHERE id = $1 AND user_id = $2', [product_id, user_id]);
};

const updateProduct = async (title, description, price, image_url, stock, product_id) => {
    const consulta = 'UPDATE products SET title = $1, description = $2, price = $3, image_url = $4, stock = $5 WHERE id = $6 RETURNING *';
    const values = [title, description, price, image_url, stock, product_id];

    return await pool.query(consulta, values);
};

module.exports = { getProductByIdAndUser, updateProduct };
