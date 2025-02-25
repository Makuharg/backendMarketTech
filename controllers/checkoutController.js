const checkoutModel = require('../models/checkoutModel');
const checkoutView = require('../views/checkoutView');

const checkoutCart = async (req, res) => {
    const buyerId = req.user.id;
    const { total_price } = req.body.cart;
    console.log(total_price, buyerId)

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
        const createTransaction = await checkoutModel.newTransaction(buyerId, total_price);  
        const transactionId = createTransaction.rows[0].id;

        

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
        return checkoutView.renderCheckoutResponse(res, createTransaction.rows[0], transactionDetails.rows);
    } catch (error) {
        await checkoutModel.rollbackTransaction();
        console.error(error);
        return checkoutView.renderErrorResponse(res, 500, 'Error al procesar la compra.');
    }
};

module.exports = {
    checkoutCart
};

