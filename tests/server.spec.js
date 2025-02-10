/* const request = require("supertest");
const server = require("../app");

describe("Operaciones CRUD del MartketPlace", () => {
    it('Obteniendo codigo 404 en Login de Usuario', async()=>{
        const { statusCode } = await request(server).post('/api/login').send()

        expect(statusCode).toBe(404);
    });
    it('Obteniendo codigo 200 en registro de usuario', async()=>{  
        const jwt = "token";     
        const { statusCode } = await request(server).post('/api/signup').set('Authorization', jwt).send();

        expect(statusCode).toBe(200);
    });
    it('Obteniendo codigo 200 al eliminar los productos del cart', async()=>{
        const jwt = "token";
        
        const { statusCode } = await request(server).delete('/api/user/cart').set('Authorization', jwt).send();       
        expect(statusCode).toBe(200);
    });
    it('Obteniendo codigo 201 al agregar un cafe', async()=>{
        const cafe = { id: 5, nombre: "Starbucks"}
        const { statusCode } = await request(server).post('/cafes').send(cafe);

        expect(statusCode).toBe(201)
    });
    it('Obteniendo codigo 400 al actualizar un cafe que no existe', async()=>{
        const cafe = { id: 5, nombre: "Cappuccino"}

        const { statusCode } = await request(server).put(`/cafes/4`).send(cafe);

        
        console.log(statusCode)
    })
}); */

const request = require('supertest');
const app = require('../app'); // Asegúrate de importar tu app principal
const { pool } = require('../server/server'); // Para limpiar la base de datos si es necesario

jest.mock('../models/loginModel'); // Mock del modelo
const loginModel = require('../models/loginModel');

jest.mock('bcrypt');
const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');
jest.mock('jsonwebtoken');

describe('POST /api/login', () => {
    const user = {
        id: 6,
        username: 'makuharg',
        email: 'makuh@gmail.com',
        phone_number: '1134313700',
        password_hash: '$2a$10$rFOXXw3TIs5G0mdybr.vhODtesvfyDA99eXDl.QxMF7KAIMRGFxVi',
        date_register: "2025-01-31T22:49:42.491Z"
    };

    beforeEach(() => {
        loginModel.getUserByEmail.mockResolvedValue({ rows: [user], rowCount: 1 });
        bcrypt.compareSync.mockReturnValue(true);
        jwt.sign.mockReturnValue('mocked-jwt-token');
    });

    afterAll(async () => {
        await pool.end(); // Cierra la conexión con la base de datos
    });

    it('Debe devolver 200 cuando el usuario y la contraseña son correctos', async () => {
        const response = await request(app)
            .post('/api/login')
            .send({ email: user.email, password_hash: "$2a$10$rFOXXw3TIs5G0mdybr.vhODtesvfyDA99eXDl.QxMF7KAIMRGFxVi" });
            console.log(response)

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('data');
        expect(response.body.data).toMatchObject({
            id: user.id,
            username: user.username,
            email: user.email,
            phone_number: user.phone_number,
            date_register: user.date_register
        });
        expect(response.body).toHaveProperty('token', 'mocked-jwt-token');
    });
});