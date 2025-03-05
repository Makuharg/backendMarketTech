const request = require('supertest');
const app = require('../app'); // Importamos la aplicación de Express
const { pool } = require('../server/server'); // Importamos la base de datos

describe('POST /api/login', () => {

    // Antes de ejecutar los tests, asegurarse de que la base de datos esté disponible
    beforeAll(async () => {
        await pool.query(`
            INSERT INTO users (username, email, password_hash, phone_number, date_register)
            VALUES ('makuharg', 'makuh@gmail.com', '$2a$10$rFOXXw3TIs5G0mdybr.vhODtesvfyDA99eXDl.QxMF7KAIMRGFxVi', '1134313700', NOW())
            ON CONFLICT (email) DO NOTHING;
        `);
    });

    afterAll(async () => {
        await pool.end(); // Cierra la conexión después de los tests
    });

    it('Debe loguearse correctamente y devolver un token', async () => {
        const res = await request(app)
            .post('/api/login') // Ruta de login
            .send({
                email: 'makuh@gmail.com',
                password_hash: '123456', // Esta debe ser la contraseña correcta
            });

        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('token');
        expect(res.body.data).toHaveProperty('id');
        expect(res.body.data).toHaveProperty('username', 'makuharg');
        expect(res.body.data).toHaveProperty('email', 'makuh@gmail.com');
    });

    it('Debe fallar con credenciales incorrectas', async () => {
        const res = await request(app)
            .post('/api/login')
            .send({
                email: 'makuh@gmail.com',
                password_hash: 'wrongpassword', // Contraseña incorrecta
            });

        expect(res.statusCode).toBe(401);
        expect(res.body).toHaveProperty('message', 'Contraseña incorrecta');
    });

    it('Debe fallar si el usuario no existe', async () => {
        const res = await request(app)
            .post('/api/login')
            .send({
                email: 'nonexistent@example.com',
                password_hash: 'password123',
            });

        expect(res.statusCode).toBe(404);
        expect(res.body).toHaveProperty('message', 'El usuario ingresado no existe');
    });

    it('Debe fallar si falta el email o la contraseña', async () => {
        const res = await request(app)
            .post('/api/login')
            .send({
                email: '', // Falta email
                password_hash: '',
            });

        expect(res.statusCode).toBe(400);
        expect(res.body).toHaveProperty('error', 'Faltan campos obligatorios');
    });
});