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
        if (!rows.length) {
            return res.status(200).json({ purchases: [], sales: [] });
        }

        const purchases = [];
        const sales = [];

        rows.forEach(item => {
            const transactionData = {
                transaction_id: item.transaction_id,
                date: item.date,
                total_price: item.total_price,
                state: item.state,
                product_id: item.product_id,
                product_name: item.product_name,
                quantity: item.quantity,
                unit_price: item.unit_price,
                subtotal: item.subtotal
            };

            if (item.buyer_id === rows[0].buyer_id) {
                purchases.push({
                    ...transactionData,
                    buyer_id: item.buyer_id,
                    buyer_name: item.buyer_name
                });
            }

            if (item.seller_id === rows[0].seller_id) {
                sales.push({
                    ...transactionData,
                    seller_id: item.seller_id,
                    seller_name: item.seller_name
                });
            }
        });

        res.status(200).json({ purchases, sales });
    },

    errorResponse: (res) => res.status(500).json({ message: 'Error al obtener los detalles de la transacción.' }),
};

module.exports = responseView, TransactionView, TransactionDetailView;
