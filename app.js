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
const { pool } = require('./server/server');
const app = express();

const port = process.env.PORT || 3000;
const host = ('RENDER' in process.env) ? '0.0.0.0' : 'localhost';

//levantamos servidor
app.listen({host: host, port: port});

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
app.use('/api', authenticateUser, CheckoutRoutes);

// incrementar o decrementar cantidad de un producto en el carrito de compras 
app.use('/api', UpdateCartRoutes);

app.delete('/api/user/cart/product/:product_id', authenticateUser, async (req, res) => {
    const product_id = req.params.product_id; // ID del producto a eliminar
    const user_id = req.user.id; // ID del usuario autenticado

    try {
        // Verificar si el producto está en el carrito del usuario
        const cartItem = await pool.query(
            'SELECT * FROM cart WHERE user_id = $1 AND product_id = $2',
            [user_id, product_id]
        );

        if (cartItem.rows.length === 0) {
            return res.status(404).json({ message: 'El producto no está en el carrito.' });
        }

        // Eliminar el producto del carrito
        const { rows } = await pool.query(
            'DELETE FROM cart WHERE user_id = $1 AND product_id = $2',
            [user_id, product_id]
        );

        res.status(200).json({ message: 'Producto eliminado del carrito.', product: rows[0] });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al eliminar el producto del carrito.' });
    }
});

app.get('/api/user/transactions/detail/:transaction_id', authenticateUser, async (req, res) => {
    const transaction_id = req.params.id; // ID de la transacción
    const user_id = req.user.id; // ID del usuario autenticado

    try {
        // Obtener los detalles de la transacción
        const transactionDetails = await pool.query(
            `SELECT 
            td.id,
            td.transaction_id,
            td.product_id,
            td.quantity,
            td.unit_price,
            td.subtotal,
            td.buyer_id,
            td.seller_id,
            u_buyer.username AS buyer_name,
            u_seller.username AS seller_name,
            t.date
         FROM 
            transaction_details td
         JOIN 
            products p ON td.product_id = p.id
         JOIN 
            users u_buyer ON td.buyer_id = u_buyer.id
         JOIN 
            users u_seller ON td.seller_id = u_seller.id
         JOIN 
            transactions t ON td.transaction_id = t.id
         WHERE 
            td.transaction_id = $1`,
            [transaction_id]
        );

        if (transactionDetails.rows.length === 0) {
            return res.status(404).json({ message: 'Transacción no encontrada o no tienes permiso para verla.' });
        }

        // Formatear la respuesta
        const response = {
            transaction_id: transactionDetails.rows[0].transaction_id,
            date: transactionDetails.rows[0].date,
            state: transactionDetails.rows[0].state,
            buyer_name: transactionDetails.rows[0].buyer_name,
            seller_name: transactionDetails.rows[0].seller_name,
            items: transactionDetails.rows.map(item => ({
                product_id: item.product_id,
                product_name: item.product_name,
                quantity: item.quantity,
                unit_price: item.unit_price,
                subtotal: item.subtotal,
            })),
        };

        res.status(200).json(response);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener los detalles de la transacción.' });
    }
});

// eliminar todos los productos del carrito de compras
app.use('/api', DeleteCartRoutes);

// funciones review de users
app.use('/api', ReviewRoutes);

// error 404 ruta not found
app.use("*", (req, res) => {
    res.status(404).send({ message: "La ruta que intenta consultar no existe" })
});




module.exports = app;






