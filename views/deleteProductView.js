const productView = {
    notFound: (res) => res.status(404).json({ message: 'Producto no encontrado o no tienes permiso para eliminarlo.' }),

    success: (res) => res.status(200).json({ message: 'Producto eliminado con éxito.' }),

    error: (res) => res.status(500).json({ message: 'Error al eliminar el producto.' })
};

module.exports = productView;
