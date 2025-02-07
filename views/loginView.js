const loginView = {
    successResponse: (res, user, token) => {
        res.status(200).json({
            data: { // Devuelve los datos del usuario menos la contraseña
                id: user.id,
                username: user.username,
                email: user.email,
                phone_number: user.phone_number,
                date_register: user.date_register
            },
            token: token
        });
    },
    errorResponse: (res, error) => {
        res.status(error.code || 500).json({
            code: error.code || 500,
            message: error.message || 'Error interno del servidor'
        });
    }
};

module.exports = loginView;