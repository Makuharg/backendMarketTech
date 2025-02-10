const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

// Middleware de autenticación

const authenticateUser = (req, res, next) => {
    const Authorization = req.header('Authorization');
    const token = Authorization.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Acceso denegado. No se proporcionó un token.' });
    }

    try {
        jwt.verify(token, process.env.AUTH_PASS); // Verificar el token
        const decoded = jwt.decode(token);
        req.user = decoded;
        console.log(decoded)
        next();
    } catch (error) {
        res.status(400).json({ message: 'Token inválido.' });
    }
};

module.exports = { authenticateUser }


