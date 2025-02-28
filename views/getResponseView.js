const responseView = {
    successResponse: (res, data) => {
        res.status(200).json(data);
    },
    errorResponse: (res, error) => {
        res.status(500).json({ error: error.message || 'Error interno del servidor' });
    }
};

const TransactionView = {
    successResponse: (res, transactions) => {
        res.status(200).json({
            purchases: transactions.purchases,
            sales: transactions.sales
        });
    },

    errorResponse: (res) => res.status(500).json({ message: 'Error al obtener los datos.' }),
};

const TransactionDetailView = {
    successResponse: (res, rows) => {
        const response = {
            transaction_id: rows[0].transaction_id,
            date: rows[0].date,
            state: rows[0].state,
            buyer_name: rows[0].buyer_name,
            seller_name: rows[0].seller_name,
            items: rows.map(item => ({
                product_id: item.product_id,
                product_name: item.product_name,
                quantity: item.quantity,
                unit_price: item.unit_price,
                subtotal: item.subtotal,
            })),
        };

        res.status(200).json(response);
    },

    errorResponse: (res) => res.status(500).json({ message: 'Error al obtener los detalles de la transacción.' }),
};

module.exports = responseView, TransactionView, TransactionDetailView;
