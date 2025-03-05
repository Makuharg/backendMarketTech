const request = require('supertest');
const app = require('../app'); // Importamos la aplicación de Express
const { pool } = require('../server/server'); // Importamos la base de datos

describe('GET /api/cart/:user_id', () => {
    
    beforeAll(async () => {
        // Insertamos productos de prueba en el carrito
        await pool.query(`
            INSERT INTO cart (user_id, product_id, title, price, quantity)
            VALUES (1, 101, 'Intel Z490 AORUS XTREME WATERFORCE', 2000, 2)
            ON CONFLICT DO NOTHING;
        `);

            // Verificar si los datos se insertaron correctamente
        const { rows } = await pool.query('SELECT * FROM cart WHERE user_id = 1');
        console.log('Carrito de prueba insertado:', rows);
    });

    afterAll(async () => {
        await pool.end(); // Cerramos la conexión después de los tests
    });

    it('Debe obtener el carrito de un usuario correctamente', async () => {
        const res = await request(app).get('/api/cart/1');

        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
        expect(res.body.length).toBeGreaterThan(0);
        expect(res.body[0]).toHaveProperty('user_id', 1);
        expect(res.body[0]).toHaveProperty('product_id');
        expect(res.body[0]).toHaveProperty('quantity');
    });
    
    it('Debe devolver un carrito vacío si el usuario no tiene productos', async () => {
        const res = await request(app).get('/api/cart/999'); // Usuario inexistente

        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
        expect(res.body.length).toBe(0);
    });

    it('Debe manejar errores internos del servidor', async () => {
        jest.spyOn(pool, 'query').mockRejectedValue(new Error('Error interno de la BD'));

        const res = await request(app).get('/api/cart/1');

        expect(res.statusCode).toBe(500);
        expect(res.body).toHaveProperty('error', 'Error interno de la BD');

        pool.query.mockRestore();
    });
});
