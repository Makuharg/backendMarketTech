const cartModel = require('../models/getCartModel');
const responseView = require('../views/getResponseView');

const getCart = async (req, res) => {
    try {
        const { user_id } = req.user.id;
        const { rows } = await cartModel.getUserCart(user_id);
        responseView.successResponse(res, rows);
    } catch (error) {
        responseView.errorResponse(res, error);
    }
};

module.exports = { getCart };