const { pool } = require("../server/server");

const getAllProducts = async () => {
    return await pool.query('SELECT * FROM products');
};

module.exports = { getAllProducts };