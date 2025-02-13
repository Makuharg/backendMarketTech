const { pool } = require("../server/server");

const getProductByIdAndUser = async (product_id, user_id) => {
    return await pool.query('SELECT * FROM products WHERE id = $1 AND user_id = $2', [product_id, user_id]);
};

const updateProduct = async (title, description, price, image_url, stock, product_id) => {
    const consulta = 'UPDATE products SET category_id = $1 title = $2, description = $3, price = $4, image_url = $5, stock = $6 WHERE id = $7 RETURNING *';
    const values = [category_id, title, description, price, image_url, stock, product_id];

    return await pool.query(consulta, values);
};

module.exports = { getProductByIdAndUser, updateProduct };
