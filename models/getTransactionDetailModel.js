const { pool } = require("../server/server");

const getTransactionDetails = async (transaction_id, user_id) => {
    const query = `
        SELECT 
            td.id,
            td.transaction_id,
            td.product_id,
            td.quantity,
            td.unit_price,
            td.subtotal,
            td.buyer_id,
            td.seller_id,
            u_buyer.username AS buyer_name,
            u_seller.username AS seller_name,
            t.date,
            CASE 
                WHEN td.buyer_id = $2 THEN 'buyer' 
                WHEN td.seller_id = $2 THEN 'seller' 
            END AS role
        FROM 
            transaction_details td
        JOIN 
            products p ON td.product_id = p.id
        JOIN 
            users u_buyer ON td.buyer_id = u_buyer.id
        JOIN 
            users u_seller ON td.seller_id = u_seller.id
        JOIN 
            transactions t ON td.transaction_id = t.id
        WHERE 
            td.transaction_id = $1
            AND (td.buyer_id = $2 OR td.seller_id = $2);
    `;

    const values = [transaction_id, user_id];

    return await pool.query(query, values);
};

module.exports = { getTransactionDetails };
