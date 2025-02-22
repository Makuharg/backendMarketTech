const express = require('express');
const cors = require('cors');
const app = express();
const routes = require('./routes/indexRoutes');

const port = process.env.PORT || 3000;
const host = ('RENDER' in process.env) ? '0.0.0.0' : 'localhost';

//levantamos servidor
app.listen({host: host, port: port});

//middlewares
app.use(express.json());
app.use(cors());

// Usar todas las rutas con prefijo "/api"
app.use('/api', routes);

// Error 404 - Ruta no encontrada
app.use("*", (req, res) => {
    res.status(404).send({ message: "La ruta que intenta consultar no existe" });
});

module.exports = app;






