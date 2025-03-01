const { pool }  = require('../server/server');

const getTransactions = async (user_id) => {
    // Consultar las compras realizadas por el usuario
    const purchasesQuery  = 
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

    // Consultar las ventas realizadas por el usuario
    const salesQuery = 
            `SELECT 
            td.transaction_id,
            td.seller_id,
            seller.username AS seller_name,
            t.date,
            td.product_id,
            p.title AS product_name,
            td.quantity,
            td.unit_price,
            (td.quantity * td.unit_price) AS subtotal,
            td.buyer_id,
            buyer.username AS buyer_name
        FROM 
            transaction_details td
        JOIN 
            transactions t ON td.transaction_id = t.id
        JOIN 
            users seller ON td.seller_id = seller.id
        JOIN 
            users buyer ON td.buyer_id = buyer.id
        JOIN 
            products p ON td.product_id = p.id
        WHERE 
            td.seller_id = $1
        ORDER BY 
            td.transaction_id, td.product_id`;

    const values = [user_id];

    // Ejecutar ambas consultas en paralelo
    const [purchases, sales] = await Promise.all([
        pool.query(purchasesQuery, values),
        pool.query(salesQuery, values)
    ]);

    return { purchases: purchases.rows, sales: sales.rows };
};

module.exports = { getTransactions };
