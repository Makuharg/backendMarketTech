const request = require('supertest');
const app = require('../app'); // Importamos la aplicación de Express
const { pool } = require('../server/server'); // Importamos la base de datos

describe('GET /api/products', () => {
    
    beforeAll(async () => {
        await pool.query(`
            INSERT INTO products (user_id, category_id, title, description, price, stock)
            VALUES (2, 2, 'Teclado Mecánico', 'Teclado mecánico RGB', 50, 10);
        `);
    });

    afterAll(async () => {
        await pool.end(); // Cierra la conexión después de los tests
    });

    it('Debe obtener todos los productos', async () => {
        const res = await request(app).get('/api/products');

        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBeTruthy();
        expect(res.body.length).toBeGreaterThan(0);
        expect(res.body[0]).toHaveProperty('id');
        expect(res.body[0]).toHaveProperty('category_id');
        expect(res.body[0]).toHaveProperty('title');
        expect(res.body[0]).toHaveProperty('description');
        expect(res.body[0]).toHaveProperty('price');
        expect(res.body[0]).toHaveProperty('stock');
    });

    it('Debe manejar errores internos del servidor', async () => {
        jest.spyOn(pool, 'query').mockRejectedValue(new Error('Error interno del servidor'));
        
        const res = await request(app).get('/api/products');

        expect(res.statusCode).toBe(500);
        expect(res.body).toHaveProperty('error', 'Error interno del servidor');
    });
});