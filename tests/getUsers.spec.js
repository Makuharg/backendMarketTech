const request = require('supertest');
const app = require('../app'); // Importamos la aplicación de Express
const { pool } = require('../server/server'); // Importamos la base de datos

describe('GET /api/users', () => {
    // Antes de ejecutar los tests, asegurarse de que la base de datos tenga datos
    beforeAll(async () => {
        await pool.query(`
            INSERT INTO users (username, email, password_hash, phone_number, date_register)
            VALUES ('testuser', 'testuser@example.com', '$2a$10$testhash', '123456789', NOW())
            ON CONFLICT (email) DO NOTHING;
        `);
    });

    afterAll(async () => {
        await pool.end(); // Cierra la conexión después de los tests
    });

    it('Debe obtener la lista de usuarios correctamente', async () => {
        const res = await request(app).get('/api/users'); // Ruta para obtener usuarios

        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBe(true); // Debe devolver un array
        expect(res.body.length).toBeGreaterThan(0); // Debe contener al menos un usuario
        expect(res.body[0]).toHaveProperty('id');
        expect(res.body[0]).toHaveProperty('username');
        expect(res.body[0]).toHaveProperty('email');
    });

    it('Debe manejar errores del servidor correctamente', async () => {
        jest.spyOn(pool, 'query').mockRejectedValue(new Error('Error en la base de datos'));
        
        const res = await request(app).get('/api/users');
        
        expect(res.statusCode).toBe(500);
        expect(res.body).toHaveProperty('error', 'Error en la base de datos');
        
        pool.query.mockRestore(); // Restauramos la función original
    });
});