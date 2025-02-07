const bcrypt = require('bcryptjs');
const UserModel = require('../models/signupModel');
const { userView } = require('../views/signupView');

const signUp = async (req, res) => {
    let { username, email, phone_number, password_hash } = req.body;

    try {
        // hash en el password para ocultarla
        const securePassword = bcrypt.hashSync(password_hash, 10);
        password_hash = securePassword;

        // Insertar usuario en la base de datos
        const rowCount = await UserModel.createUser(username, email, phone_number, securePassword);

        // Validación de éxito
        if (rowCount > 0) {
            userView.successResponse(res, "Usuario registrado con éxito");
        } else {
            throw Error("Por favor complete todos los campos");
        }
    } catch (error) {
        userView.errorResponse(res, error);
    }
};

module.exports = { signUp };
