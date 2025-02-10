const { pool } = require("../server/server");

const getAllUsers = async () => {
    return await pool.query('SELECT * FROM users');
};

module.exports = { getAllUsers };