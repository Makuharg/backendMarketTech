const CartModel = require('../models/newCartModel');
const CartView = require('../views/newCartView');

const addToCart = async (req, res) => {
    const { product_id, title, image_url, price } = req.body;
    const user_id = req.user.id;

    try {
        const existingCartItem = await CartModel.getCartItem(user_id, product_id);

        if (existingCartItem.rows.length > 0) {
            const updatedCartItem = await CartModel.updateCartQuantity(product_id);
            return CartView.quantityUpdated(res, updatedCartItem.rows[0]);
        } else {
            const newCartItem = await CartModel.addCartItem(user_id, product_id, title, image_url, price);
            return CartView.productAdded(res, newCartItem.rows[0]);
        }
    } catch (error) {
        CartView.error(res);
    }
};

module.exports = { addToCart };
