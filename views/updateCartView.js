const cartView = {
    productNotFound: (res) => res.status(404).json({ message: 'El producto no está en el carrito.' }),

    invalidAction: (res) => res.status(400).json({ message: 'Acción no válida. Use "increment" o "decrement".' }),

    quantityUpdated: (res, cartItem) => res.status(200).json({
        message: 'Cantidad actualizada en el carrito.',
        cartItem: cartItem
    }),

    productRemoved: (res) => res.status(200).json({ message: 'Producto eliminado del carrito.' }),

    error: (res) => res.status(500).json({ message: 'Error al actualizar la cantidad en el carrito.' })
};

module.exports = cartView;
