const cartView = {
    notFound: (res) => res.status(404).json({ message: 'El producto no está en el carrito.' }),

    success: (res, product) => {
        res.status(200).json({
            message: 'Producto eliminado del carrito.',
            product: product
        });
    },

    error: (res) => res.status(500).json({ message: 'Error al eliminar el producto del carrito.' })
};

module.exports = cartView;
