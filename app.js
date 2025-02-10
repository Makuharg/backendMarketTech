const SignupRoutes = require('./routes/signupRoutes');
const LoginRoutes = require('./routes/loginRoutes');
const NewProductRoutes = require('./routes/newProductRoutes');
const UpdateProductRoutes = require('./routes/updateProductRoutes');
const DeleteProductRoutes = require('./routes/deleteProductRoutes');
const NewCartRoutes = require('./routes/newCartRoutes');
const UpdateCartRoutes = require('./routes/updateCartRoutes');
const DeleteCartRoutes = require('./routes/deleteCartRoutes');
const CheckoutRoutes = require('./routes/checkoutRoutes');
const express = require('express');
const cors = require('cors');
const { pool } = require('./server/server');
const app = express();

//levantamos servidor
app.listen(3000, console.log("Server on"));

//middlewares
app.use(express.json());
app.use(cors());

app.get('/users', async(req,res)=>{
    const { rows } = await pool.query('SELECT * FROM users');
    res.json(rows);
});

app.get('/products', async(req,res)=>{
    const { rows } = await pool.query('SELECT * FROM products');
    res.json(rows);
});

app.get('/cart/:user_id', async(req,res)=>{
    const { user_id } = req.params;
    const consulta = 'SELECT * FROM cart WHERE user_id = $1';
    const value = [ user_id ]
    const { rows } = await pool.query(consulta, value);
    res.json(rows);
});

//middlewares
app.use(express.json());
app.use(cors());

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
app.use('/api', NewCartRoutes);

// incrementar o decrementar cantidad de un producto en el carrito de compras 
app.use('/api', UpdateCartRoutes);

// eliminar todos los productos del carrito de compras
app.use('/api', DeleteCartRoutes);

// comprar carrito de compras
app.use('/api', CheckoutRoutes);

// funciones review
app.use('/api', CheckoutRoutes);

// error ruta not found
app.use("*", (req, res) => {
    res.status(404).send({ message: "La ruta que intenta consultar no existe" })
});

module.exports = app;






