const responseView = {
    successResponse: (res, data) => {
        res.status(200).json(data);
    },
    errorResponse: (res, error) => {
        res.status(500).json({ error: error.message || 'Error interno del servidor' });
    }
};

module.exports = responseView;
