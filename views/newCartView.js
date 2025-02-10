const cartView = {
    quantityUpdated: (res, cartItem) => res.status(200).json({
        message: 'Cantidad incrementada en el carrito.',
        cartItem: cartItem
    }),

    productAdded: (res, cartItem) => res.status(201).json({
        message: 'Producto agregado al carrito.',
        cartItem: cartItem
    }),

    error: (res) => res.status(500).json({
        message: 'Error al agregar el producto al carrito.'
    })
};

module.exports = cartView;
