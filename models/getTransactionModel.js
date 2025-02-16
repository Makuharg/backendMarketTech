const { pool }  = require('../server/server');

const getTransactionDetails = async (transaction_id, user_id) => {
    const query = `
        SELECT 
            t.id AS transaction_id,
            td.buyer_id,
            u.username AS buyer_name,
            t.date,
            SUM(td.subtotal) AS total_price
        FROM 
            transactions t
        JOIN 
            transaction_details td ON t.id = td.transaction_id
        JOIN 
            users u ON td.buyer_id = u.id
        WHERE 
            t.id = $1 AND (td.buyer_id = $2 OR td.seller_id = $2)
        GROUP BY 
            t.id, td.buyer_id, u.username, t.date;
    `;

    const values = [transaction_id, user_id];

    return await pool.query(query, values);
};

module.exports = { getTransactionDetails };
