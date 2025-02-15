const { pool } = require("../server/server");

const getUserDetails = async (transaction_id) => {
    const consulta = 'SELECT * FROM transaction_details WHERE transaction_id = $1';
    return await pool.query(consulta, [transaction_id]);
};

module.exports = { getUserDetails };