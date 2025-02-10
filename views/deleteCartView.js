const cartView = {
    cartCleared: (res) => res.status(200).json({ message: 'Carrito vaciado con éxito.' }),

    error: (res) => res.status(500).json({ message: 'Error al vaciar el carrito.' })
};

module.exports = cartView;
