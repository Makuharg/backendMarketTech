const CartModel = require('../models/updateCartModel');
const CartView = require('../views/updateCartView');

const updateCartQuantity = async (req, res) => {
    const product_id = req.params.product_id;
    const { action } = req.body; // "increment" o "decrement"
    const user_id = req.user.id;
    console.log(product_id, action, user_id)

    try {
        const existingCartItem = await CartModel.getCartItem(user_id, product_id);

        if (existingCartItem.rows.length === 0) {
            return CartView.productNotFound(res);
        }

        let updatedCartItem;

        if (action === 'increment') {
            updatedCartItem = await CartModel.incrementCartQuantity(product_id);
        } else if (action === 'decrement') {
            if (existingCartItem.rows[0].quantity === 1) {
                await CartModel.removeCartItem(product_id);
                return CartView.productRemoved(res);
            }
            updatedCartItem = await CartModel.decrementCartQuantity(product_id);
        } else {
            return CartView.invalidAction(res);
        }

        CartView.quantityUpdated(res, updatedCartItem.rows[0]);
    } catch (error) {
        console.error(error);
        CartView.error(res);
    }
};

module.exports = { updateCartQuantity };
