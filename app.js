const { pool } = require("./server/server");
const SignupRoutes = require('./routes/signupRoutes');
const LoginRoutes = require('./routes/loginRoutes');
const NewProductRoutes = require('./routes/newProductRoutes');
const express = require('express');
const cors = require('cors');
const jwtKey = "Desafio6LATAM";
const jwt = require('jsonwebtoken');
const { authenticateUser } = require("./middlewares/authUser");
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

// signup de usuario
app.use('/api', SignupRoutes);

// login de usuario
app.use('/api', LoginRoutes);

// registro de un producto
app.use('/api', NewProductRoutes);

// modificar producto registrado
app.put('/user/product/:id', authenticateUser, async(req,res)=>{
    const product_id = req.params.id;
    const user_id = req.user.id
    const { title, description, price, image_url, stock } = req.body;

    try {
        // Verificar que el producto pertenezca al usuario
        const product = await pool.query('SELECT * FROM products WHERE id = $1 AND user_id = $2', [product_id, user_id]);

        if (product.rows.length === 0) {
            return res.status(404).json({ message: 'Producto no encontrado o no tienes permiso para modificarlo.' });
        };

        const consulta = 'UPDATE products SET title = $1, description = $2, price = $3, image_url = $4, stock = $5 WHERE id = $6 RETURNING *';
        const values = [ title, description, price, image_url, stock, product_id ];

        const { rows, rowCount } = await pool.query(consulta, values);

        res.status(200).json({
            message: 'Producto actualizado con éxito.',
            product: rows[0],
            count: rowCount
        });
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar el producto.' }); 
    };
});

// el usuario puede eliminar un producto suyo
app.delete('/user/product/:id', authenticateUser, async(req,res)=>{
    const product_id = req.params.id;
    const user_id = req.user.id;

    try {
        // Verificar que el producto pertenezca al usuario
        const product = await pool.query('SELECT * FROM products WHERE id = $1 AND user_id = $2', [product_id, user_id]);

        if (product.rows.length === 0) {
            return res.status(404).json({ message: 'Producto no encontrado o no tienes permiso para eliminarlo.' });
        };

        // eliminamos el producto
        const consulta = 'DELETE FROM products WHERE id = $1';
        const value = [product_id];

        const { rows, rowCount } = await pool.query(consulta,value);

        res.status(200).json({ message: `Producto eliminado con éxito.` });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar el producto.' });    
    }
});

// CARRITO DE COMPRAS

// El usuario agrega un producto al carrito
app.post('/user/cart', authenticateUser, async(req,res)=>{
    const { product_id, title, image_url, price } = req.body;
    const user_id = req.user.id;
    console.log(product_id, title, image_url)

    try {
        // verificamos si el producto ya esta en el carrito de compras
        const consulta = 'SELECT * FROM cart WHERE user_id = $1 AND product_id = $2';
        const values = [  user_id, product_id];
        const existingCartItem = await pool.query(consulta, values);
        console.log(existingCartItem.rows[0])

        if(existingCartItem.rows.length > 0){
            // Si el producto ya está en el carrito, incrementar la cantidad en 1
            const consulta = 'UPDATE cart SET quantity = quantity + 1 WHERE product_id = $1 RETURNING *';
            const value = [ existingCartItem.rows[0].product_id]
            const updatedCartItem = await pool.query(consulta, value);
            return res.status(200).json({
                message: 'Cantidad incrementada en el carrito.',
                cartItem: updatedCartItem.rows[0]
            });
        }else{
            // Si el producto no está en el carrito, agregarlo con cantidad 1
            const consulta = 'INSERT INTO cart (user_id, product_id, title, image_url, price, quantity) VALUES ($1,$2,$3,$4,$5,1) RETURNING *';
            const values = [ user_id, product_id, title, image_url, price ];
            const newCartItem  = await pool.query(consulta, values);
            return res.status(201).json({
                message: 'Producto agregado al carrito.',
                cartItem: newCartItem.rows[0]
            });
        };
        
    } catch (error) {
        res.status(500).json({ 
            message: 'Error al agregar el producto al carrito.'
        });
    };
});


// incrementar o decrementar cantidad de un producto en el carrito de compras 
app.post('/user/cart/:product_id', authenticateUser, async(req,res)=>{
    const product_id = req.params.product_id;
    const { action } = req.body; // "increment" o "decrement"
    const user_id = req.user.id; // Obtener el ID del usuario autenticado
    console.log(product_id, action, user_id)
    try {
        // Verificar si el producto está en el carrito del usuario
        const existingCartItem = await pool.query(
            'SELECT * FROM cart WHERE user_id = $1 AND product_id = $2',
            [user_id, product_id]
        );

        if (existingCartItem.rows.length === 0) {
            return res.status(404).json({ message: 'El producto no está en el carrito.' });
        }

        let updatedCartItem;

        if (action === 'increment') {
            // Incrementar la cantidad en 1
            updatedCartItem = await pool.query(
                'UPDATE cart SET quantity = quantity + 1 WHERE product_id = $1 RETURNING *',
                [existingCartItem.rows[0].product_id]
            );
        } else if (action === 'decrement') {
            // Si la cantidad es 1, eliminar el producto del carrito
            if (existingCartItem.rows[0].quantity === 1) {
                await pool.query('DELETE FROM cart WHERE product_id = $1', [existingCartItem.rows[0].product_id]);
                return res.status(200).json({ message: 'Producto eliminado del carrito.' });
            }

            // Decrementar la cantidad en 1
            updatedCartItem = await pool.query(
                'UPDATE cart SET quantity = quantity - 1 WHERE product_id = $1 RETURNING *',
                [existingCartItem.rows[0].product_id]
            );
        } else {
            return res.status(400).json({ message: 'Acción no válida. Use "increment" o "decrement".' });
        }

        res.status(200).json({ message: 'Cantidad actualizada en el carrito.', cartItem: updatedCartItem.rows[0] });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al actualizar la cantidad en el carrito.' });
    }
});  

// eliminar todos los productos del carrito de compras

app.delete('/user/cart', authenticateUser, async (req, res) => {
    const user_id = req.user.id; // Obtener el ID del usuario autenticado

    try {
        // Eliminar todos los productos del carrito del usuario
        await pool.query('DELETE FROM cart WHERE user_id = $1', [user_id]);

        res.status(200).json({ message: 'Carrito vaciado con éxito.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al vaciar el carrito.' });
    }
});

// comprar carrito de compras
app.post('/user/cart/checkout', authenticateUser, async (req, res) => {
    const buyer_id = req.user.id; // ID del comprador (usuario autenticado)

    try {
        // Iniciar una transacción en la base de datos
        await pool.query('BEGIN');

        // Obtener los productos en el carrito del usuario
        const cartItems = await pool.query(
            `SELECT c.product_id, c.quantity, p.price, p.stock, p.user_id AS seller_id 
             FROM cart c 
             JOIN products p ON c.product_id = p.id 
             WHERE c.user_id = $1`,
            [buyer_id]
        );

        if (cartItems.rows.length === 0) {
            await pool.query('ROLLBACK');
            return res.status(400).json({ message: 'El carrito está vacío.' });
        }

        // Verificar el stock de cada producto en el carrito
        for (const item of cartItems.rows) {
            if (item.stock < item.quantity) {
                await pool.query('ROLLBACK');
                return res.status(400).json({ message: `No hay suficiente stock para el producto ${item.product_id}.` });
            }
        }

        // Crear una nueva transacción
        const transaction = await pool.query(
            'INSERT INTO transactions (user_id, state) VALUES ($1, $2) RETURNING id',
            [buyer_id, 'completed']
        );
        const transaction_id = transaction.rows[0].id;

        // Crear los detalles de la transacción y actualizar el stock
        for (const item of cartItems.rows) {
            // Insertar en transaction_details (incluyendo buyer_id y seller_id)
            await pool.query(
                `INSERT INTO transaction_details 
                 (transaction_id, product_id, buyer_id, seller_id, quantity, unit_price) 
                 VALUES ($1, $2, $3, $4, $5, $6)`,
                [transaction_id, item.product_id, buyer_id, item.seller_id, item.quantity, item.price]
            );

            // Actualizar el stock del producto
            await pool.query(
                'UPDATE products SET stock = stock - $1 WHERE id = $2',
                [item.quantity, item.product_id]
            );
        }

        // Vaciar el carrito del usuario
        await pool.query('DELETE FROM cart WHERE user_id = $1', [buyer_id]);

        // Confirmar la transacción
        await pool.query('COMMIT');

        res.status(200).json({ message: 'Compra realizada con éxito.', transaction_id });
    } catch (error) {
        // Revertir la transacción en caso de error
        await pool.query('ROLLBACK');
        console.error(error);
        res.status(500).json({ message: 'Error al procesar la compra.' });
    }
});




