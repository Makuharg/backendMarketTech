const CartModel = require('../models/deleteCartModel');
const CartView = require('../views/deleteCartView');

const clearCart = async (req, res) => {
    const user_id = req.user.id;

    try {
        await CartModel.clearUserCart(user_id);
        CartView.cartCleared(res);
    } catch (error) {
        console.error(error);
        CartView.error(res);
    }
};

module.exports = { clearCart };
