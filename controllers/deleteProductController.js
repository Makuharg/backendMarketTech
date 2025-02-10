const ProductModel = require('../models/deleteProductModel');
const ProductView = require('../views/deleteProductView');

const deleteProduct = async (req, res) => {
    const product_id = req.params.id;
    const user_id = req.user.id;

    try {
        const product = await ProductModel.getProductByIdAndUser(product_id, user_id);

        if (product.rows.length === 0) {
            return ProductView.notFound(res);
        }

        await ProductModel.deleteProduct(product_id);
        ProductView.success(res);
    } catch (error) {
        ProductView.error(res);
    }
};

module.exports = { deleteProduct };
