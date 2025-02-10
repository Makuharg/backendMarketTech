const productView = {
    notFound: (res) => res.status(404).json({ message: 'Producto no encontrado o no tienes permiso para modificarlo.' }),

    success: (res, rows, rowCount) => {
        res.status(200).json({
            message: 'Producto actualizado con éxito.',
            product: rows[0],
            count: rowCount
        });
    },

    error: (res) => res.status(500).json({ message: 'Error al actualizar el producto.' })
};

module.exports = productView;
