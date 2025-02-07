const userView = {
    successResponse: (res, message) => {
        res.status(200).json(message);
    },
    errorResponse: (res, error) => {
        if (error.code === '23505') {
            res.status(400).json({ error: 'El email o el nombre de usuario ya está registrado' });
        } else if (error.code === '22001') {
            res.status(400).json({ error: 'Uno de los campos excede la longitud permitida' });
        } else {
            res.status(500).json({
                code: error.code || 500,
                message: error.message || 'Error interno del servidor'
            });
        }
    }
};

module.exports = { userView };