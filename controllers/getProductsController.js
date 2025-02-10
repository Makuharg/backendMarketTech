const productModel = require('../models/getProductsModel');
const responseView = require('../views/getResponseView');

const getProducts = async (req, res) => {
    try {
        const { rows } = await productModel.getAllProducts();
        responseView.successResponse(res, rows);
    } catch (error) {
        responseView.errorResponse(res, error);
    }
};

module.exports = { getProducts };