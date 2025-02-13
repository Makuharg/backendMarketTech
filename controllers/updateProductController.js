const ProductModel = require('../models/updateProductModel');
const ProductView = require('../views/updateProductView');

const updateProduct = async (req, res) => {
    const product_id = req.params.id;
    const user_id = req.user.id;
    const { category_id, title, description, price, image_url, stock } = req.body;

    try {
        // Verificar si el producto existe y pertenece al usuario
        const product = await ProductModel.getProductByIdAndUser(product_id, user_id);

        if (product.rowCount === 0) {
            return ProductView.notFound(res);
        }

        
        console.log('Valores recibidos:', { product_id, category_id, title, description, price, image_url, stock });
        // Actualizar el producto
        const { rows, rowCount } = await ProductModel.updateProduct(
            product_id, category_id, title, description, price, image_url, stock
        );
        console.log('Resultado de la actualización:', rows);
        ProductView.success(res, rows, rowCount);
    } catch (error) {
        console.error(error);
        ProductView.error(res);
    }
};

module.exports = { updateProduct };

