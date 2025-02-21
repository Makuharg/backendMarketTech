const { pool }  = require('../server/server');

const getTransactions = async (user_id) => {
    const query = 
        `SELECT 
        t.id AS transaction_id,
        t.user_id AS buyer_id,
        u.username AS buyer_name,
        t.date,
        t.total_price,
        t.state
    FROM 
        transactions t
    JOIN 
        users u ON t.user_id = u.id
    WHERE 
        t.user_id = $1`;

    const values = [user_id];

    return await pool.query(query, values);
};

module.exports = { getTransactions };
