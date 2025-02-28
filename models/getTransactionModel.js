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
            t.id AS transaction_id,
            td.seller_id AS seller_id,
            u.username AS seller_name,
            t.date,
            t.total_price,
            t.state
        FROM 
            transactions t
        JOIN 
            transaction_details td ON t.id = td.transaction_id
        JOIN 
            users u ON td.seller_id = u.id
        WHERE 
            td.seller_id = $1
        GROUP BY 
            t.id, td.seller_id, u.username, t.date, t.total_price, t.state`;

    const values = [user_id];

    // Ejecutar ambas consultas en paralelo
    const [purchases, sales] = await Promise.all([
        pool.query(purchasesQuery, values),
        pool.query(salesQuery, values)
    ]);

    return { purchases: purchases.rows, sales: sales.rows };
};

module.exports = { getTransactions };
