const { pool } = require("../server/server");

const getUserDetails = async (user_id) => {
    const consulta = 'SELECT * FROM detail_transactions WHERE user_id = $1';
    return await pool.query(consulta, [user_id]);
};

module.exports = { getUserDetails };