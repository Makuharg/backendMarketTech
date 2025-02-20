const checkoutModel = require('../models/checkoutModel');
const { pool } = require('../server/server');
const checkoutView = require('../views/checkoutView');

const checkoutCart = async (req, res) => {
    const buyerId = req.user.id;
    const { total_price } = req.body.cart;

    try {
        // Iniciar la transacción
        await checkoutModel.beginTransaction();

        // Obtener los productos del carrito
        const cartItems = await checkoutModel.getCartItems(buyerId);


        if (cartItems.rows.length === 0) {
            await checkoutModel.rollbackTransaction();
            return checkoutView.renderErrorResponse(res, 400, 'El carrito está vacío.');
        };

        // Crear una nueva transacción
        const newTransaction = await pool.query(
            `INSERT INTO transactions 
             (user_id, total_price, state) 
             VALUES ($1, $2, $3) 
             RETURNING *`,
            [buyerId, total_price, 'completed'] // Estado: COMPLETED
        );

        const transactionId = newTransaction.rows[0].id;


        // Procesar cada producto en el carrito
        for (const item of cartItems.rows) {
            // Obtener detalles del producto
            const product = await checkoutModel.getProductDetails(item.product_id);

            if (product.rows.length === 0) {
                await checkoutModel.rollbackTransaction();
                return checkoutView.renderErrorResponse(res, 404, `El producto con ID ${item.product_id} no existe.`);
            }

            const unitPrice = product.rows[0].price;
            const sellerId = product.rows[0].seller_id;

            // Insertar en `transaction_details`
            await checkoutModel.insertTransactionDetail(transactionId, item.product_id, item.quantity, unitPrice, buyerId, sellerId);

            // Actualizar el stock del producto
            await checkoutModel.updateProductStock(item.quantity, item.product_id);
        }

        // Vaciar el carrito del usuario
        await checkoutModel.clearCart(buyerId);

        // Confirmar la transacción
        await checkoutModel.commitTransaction();

        // Obtener los detalles de la transacción
        const transactionDetails = await checkoutModel.getTransactionDetails(transactionId);

        // Renderizar la respuesta con la vista
        return checkoutView.renderCheckoutResponse(res, newTransaction.rows[0], transactionDetails.rows);
    } catch (error) {
        await checkoutModel.rollbackTransaction();
        console.error(error);
        return checkoutView.renderErrorResponse(res, 500, 'Error al procesar la compra.');
    }
};

module.exports = {
    checkoutCart
};

