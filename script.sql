CREATE DATABASE proyecto-final;
\c proyecto-final;

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(150) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone_number VARCHAR(50),
    password_hash VARCHAR(255) NOT NULL,  -- Renombrado y con hash
    date_register TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id),
    title VARCHAR(255) NOT NULL,
    description TEXT,
    price NUMERIC(10,2) NOT NULL CHECK (price > 0),  -- Precio con decimales
    image_url TEXT,
    stock INTEGER NOT NULL CHECK (stock >= 0),
    publication_time TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE cart (
    user_id INTEGER NOT NULL REFERENCES users(id),
    product_id INTEGER NOT NULL REFERENCES products(id),
    title VARCHAR(255) NOT NULL,
    image_url TEXT,
    price NUMERIC(10,2) NOT NULL CHECK (price > 0),
    quantity INTEGER NOT NULL CHECK (quantity > 0),
    added_at TIMESTAMPTZ DEFAULT NOW(),
    PRIMARY KEY (user_id, product_id)  -- Clave compuesta
);

CREATE TYPE transaction_state AS ENUM ('pending', 'completed', 'cancelled');

CREATE TABLE transactions (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id),  -- Usuario que realiza la transacción
    date TIMESTAMPTZ DEFAULT NOW(),  -- Fecha de la transacción
    state transaction_state NOT NULL  -- Estado de la transacción
);

CREATE TABLE transaction_details (
    id SERIAL PRIMARY KEY,
    transaction_id INTEGER NOT NULL REFERENCES transactions(id),  -- Transacción asociada
    product_id INTEGER NOT NULL REFERENCES products(id),  -- Producto comprado
    quantity INTEGER NOT NULL CHECK (quantity > 0),  -- Cantidad comprada
    unit_price NUMERIC(10,2) NOT NULL,  -- Precio unitario al momento de la compra
    subtotal NUMERIC(10,2) GENERATED ALWAYS AS (quantity * unit_price) STORED,  -- Subtotal calculado
    buyer_id INTEGER NOT NULL REFERENCES users(id),  -- Usuario comprador
    seller_id INTEGER NOT NULL REFERENCES users(id)  -- Usuario vendedor
);

CREATE TABLE reviews (
    id SERIAL PRIMARY KEY,
    product_id INTEGER NOT NULL REFERENCES products(id),
    user_id INTEGER NOT NULL REFERENCES users(id),
    rating INTEGER NOT NULL CHECK (rating BETWEEN 1 AND 5),  
    comment TEXT,
    comment_date TIMESTAMPTZ DEFAULT NOW()
);
