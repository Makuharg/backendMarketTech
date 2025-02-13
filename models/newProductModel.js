const { pool } = require("../server/server");


const createProduct = async (user_id, title, description, price, image_url, stock) => {
    const consulta = 'INSERT INTO products (user_id, category_id, title, description, price, image_url, stock) VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING *';       
    const values = [user_id, category_id, title, description, price, image_url, stock];

    const { rows, rowCount } = await pool.query(consulta, values);
    return { rows, rowCount };
};

module.exports = { createProduct };
