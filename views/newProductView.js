const ProductView = {
    successResponse: (res, rows, rowCount) => {
        res.status(201).json({
            message: 'Producto registrado con éxito',
            data: rows,
            count: rowCount
        });
    },
    errorResponse: (res) => {
        res.status(500).json({ message: 'Error al registrar el producto' });
    }
};

module.exports = ProductView;

