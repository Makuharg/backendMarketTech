const ProductModel = require('../models/updateProductModel');
const productView = require('../views/updateProductView');

const updateProduct = async (req, res) => {
    const product_id = req.params.id;
    const user_id = req.user.id;
    const { title, description, price, image_url, stock } = req.body;

    try {
        const product = await ProductModel.getProductByIdAndUser(product_id, user_id);

        if (product.rows.length === 0) {
            return productView.notFound(res);
        }

        const { rows, rowCount } = await ProductModel.updateProduct(title, description, price, image_url, stock, product_id);
        productView.success(res, rows, rowCount);
    } catch (error) {
        productView.error(res);
    }
};

module.exports = { updateProduct };
