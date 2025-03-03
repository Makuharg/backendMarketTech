const express = require('express');
const cors = require('cors');
const app = express();
const routes = require('./routes/indexRoutes');
const multer = require('multer');
const cloudinary = require('cloudinary').v2
const dotenv = require('dotenv');
dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const upload = multer({ dest : 'uploads' })

const port = process.env.PORT || 3000;
const host = ('RENDER' in process.env) ? '0.0.0.0' : 'localhost';

//levantamos servidor
app.listen({host: host, port: port});

//middlewares
app.use(express.json());
app.use(cors());

app.post('/api/user/files/upload', upload.single('image'), async(req,res)=>{
    try {
        const result = await cloudinary.uploader.upload(req.file.path);
        res.status(200).json(result.url);

    } catch (error) {
        console.log('error', error);
        res.status(400).send(error.message);
    }
})

// Usar todas las rutas con prefijo "/api"
app.use('/api', routes);

// Error 404 - Ruta no encontrada
app.use("*", (req, res) => {
    res.status(404).send({ message: "La ruta que intenta consultar no existe" });
});

module.exports = app;






