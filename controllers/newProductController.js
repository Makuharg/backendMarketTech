/* const ProductModel = require('../models/newProductModel');
const ProductView = require('../views/newProductView');

const createProduct = async (req, res) => {
    const { category_id, title, description, price, image_url, stock } = req.body;
    const user_id = req.user.id; // Obtener el ID del usuario autenticado

    try {
        const { rows, rowCount } = await ProductModel.createProduct(user_id, category_id, title, description, price, image_url, stock);
        ProductView.successResponse(res, rows, rowCount);
    } catch (error) {
        console.error(error);
        ProductView.errorResponse(res);
    }
};

module.exports = { createProduct }; */

const ProductModel = require('../models/newProductModel');
const ProductView = require('../views/newProductView');

const createProduct = async (req, res) => {
    const { category_id, title, description, price, image_url, stock } = req.body;
    const user_id = req.user.id; // Obtener el ID del usuario autenticado

    try {
        const { rows, rowCount } = await ProductModel.createProductModel(
            user_id, category_id, title, description, price, image_url, stock
        );

        ProductView.successResponse(res, rows, rowCount);
    } catch (error) {
        console.error(error);
        ProductView.errorResponse(res);
    }
};

module.exports = { createProduct };

