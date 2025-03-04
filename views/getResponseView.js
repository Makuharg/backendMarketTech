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
        // Filtramos las compras y ventas para el usuario
        const purchases = rows.filter(item => item.role === 'buyer');
        const sales = rows.filter(item => item.role === 'seller');

        const response = {
            transaction_id: rows[0].transaction_id,
            date: rows[0].date,
            state: rows[0].state, // Si el estado está en la respuesta, se mantiene aquí
            buyer_name: rows[0].buyer_name,  // Usamos el buyer_name del primer registro
            seller_name: rows[0].seller_name,  // Usamos el seller_name del primer registro
            items: {
                purchases: purchases.map(item => ({
                    product_id: item.product_id,
                    product_name: item.product_name,
                    quantity: item.quantity,
                    unit_price: item.unit_price,
                    subtotal: item.subtotal,
                    seller_name: item.seller_name, // Añado el nombre del vendedor en las compras
                })),
                sales: sales.map(item => ({
                    product_id: item.product_id,
                    product_name: item.product_name,
                    quantity: item.quantity,
                    unit_price: item.unit_price,
                    subtotal: item.subtotal,
                    buyer_name: item.buyer_name, // Añado el nombre del comprador en las ventas
                })),
            },
        };

        res.status(200).json(response);
    },

    errorResponse: (res) => res.status(500).json({ message: 'Error al obtener los detalles de la transacción.' }),
};

module.exports = responseView, TransactionView, TransactionDetailView;
