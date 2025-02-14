const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const loginModel = require('../models/loginModel');
const loginView = require('../views/loginView'); // Importamos la vista

const jwtKey = "tu_clave_secreta"; // Clave secreta para JWT

const login = async (req, res) => {
    const { email, password_hash } = req.body;
    const Authorization = req.header('Authorization');
    const existToken = Authorization.split(' ')[1];

    try {

        if (existToken){
            return res.status(400).json({ error: 'Ya has iniciado sesion' });
        }

        // Validación básica
        if (!email || !password_hash) {
            return res.status(400).json({ error: 'Faltan campos obligatorios' });
        }

        // Buscar usuario por email
        const { rows, rowCount } = await loginModel.getUserByEmail(email);

        // Verificar si el usuario existe
        if (rowCount === 0) {
            throw { code: 404, message: 'El usuario ingresado no existe' };
        }

        // Comparar contraseña con contraseña encriptada
        const { password_hash: securePassword } = rows[0];
        const passwordCorrecta = bcrypt.compareSync(password_hash, securePassword);

        if (!passwordCorrecta) {
            throw { code: 401, message: 'Contraseña incorrecta' };
        }

        // Generar token
        const token = jwt.sign({ id: rows[0].id, email: rows[0].email }, jwtKey);

        // Respuesta exitosa
        loginView.successResponse(res, rows[0], token);

    } catch (error) {
        loginView.errorResponse(res, error);
    }
};

module.exports = { login };
