const { pool } = require("../server/server");

const getProductByIdAndUser = async (product_id, user_id) => {
    const consulta = 'SELECT * FROM products WHERE id = $1 AND user_id = $2';
    const values = [product_id, user_id];
    return await pool.query(consulta, values);
};

const updateProduct = async (product_id, category_id, title, description, price, image_url, stock) => {
    const consulta = `
        UPDATE products 
        SET category_id = $2, title = $3, description = $4, price = $5, image_url = $6, stock = $7 
        WHERE id = $1 
        RETURNING *`;

    const values = [product_id, category_id, title, description, price, image_url, stock];
    return await pool.query(consulta, values);
};

module.exports = { getProductByIdAndUser, updateProduct };

