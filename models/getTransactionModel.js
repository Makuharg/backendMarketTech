const { pool } = require("../server/server");

const getUserTransactions = async (user_id) => {
    const consulta = 'SELECT * FROM transactions WHERE user_id = $1';
    return await pool.query(consulta, [user_id]);
};

module.exports = { getUserTransactions };