const SignupRoutes = require('./routes/signupRoutes');
const LoginRoutes = require('./routes/loginRoutes');
const NewProductRoutes = require('./routes/newProductRoutes');
const UpdateProductRoutes = require('./routes/updateProductRoutes');
const DeleteProductRoutes = require('./routes/deleteProductRoutes');
const NewCartRoutes = require('./routes/newCartRoutes');
const UpdateCartRoutes = require('./routes/updateCartRoutes');
const DeleteCartRoutes = require('./routes/deleteCartRoutes');
const CheckoutRoutes = require('./routes/checkoutRoutes');
const ReviewRoutes = require('./routes/reviewRoutes');
const GetRoutes = require('./routes/getRoutes');
const express = require('express');
const cors = require('cors');
const { authenticateUser } = require('./middlewares/authUser');
const app = express();

const port = process.env.PORT || 3000;
const host = ('RENDER' in process.env) ? '0.0.0.0' : 'localhost';

//levantamos servidor
app.listen({host: host, port: port});

//middlewares
app.use(express.json());
app.use(cors());

//middlewares
app.use(express.json());
app.use(cors());

// get Users, get Products, get Cart y get Transactions
app.use('/api', GetRoutes);

// signup de usuario
app.use('/api', SignupRoutes);

// login de usuario
app.use('/api', LoginRoutes);

// registro de un producto
app.use('/api', NewProductRoutes);

// modificar producto registrado
app.use('/api', UpdateProductRoutes);

// el usuario puede eliminar un producto suyo
app.use('/api', DeleteProductRoutes);

// CARRITO DE COMPRAS
// El usuario agrega un producto al carrito
app.use('/api', authenticateUser, NewCartRoutes);

// comprar carrito de compras
app.use('/api', CheckoutRoutes);

// incrementar o decrementar cantidad de un producto en el carrito de compras 
app.use('/api', UpdateCartRoutes);

// eliminar todos los productos del carrito de compras
app.use('/api', DeleteCartRoutes);

// funciones review de users
app.use('/api', ReviewRoutes);

// error 404 ruta not found
app.use("*", (req, res) => {
    res.status(404).send({ message: "La ruta que intenta consultar no existe" })
});

module.exports = app;






