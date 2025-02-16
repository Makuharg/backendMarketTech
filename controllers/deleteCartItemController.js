const CartModel = require('../models/deleteCartItemModel');
const cartView = require('../views/deleteCartItemView');

const deleteProductFromCart = async (req, res) => {
    const product_id = req.params.product_id; // ID del producto a eliminar
    const user_id = req.user.id; // ID del usuario autenticado

    try {
        // Verificar si el producto está en el carrito del usuario
        const cartItem = await CartModel.getCartItem(user_id, product_id);

        if (cartItem.rows.length === 0) {
            return cartView.notFound(res);
        }

        // Eliminar el producto del carrito
        const { rows } = await CartModel.deleteCartItem(user_id, product_id);

        cartView.success(res, rows[0]);
    } catch (error) {
        console.error('Error en deleteProductFromCart:', error);
        cartView.error(res);
    }
};

module.exports = { deleteProductFromCart };
