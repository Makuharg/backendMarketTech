const { Pool } = require('pg');
const dotenv = require('dotenv');
dotenv.config();

const pool = new Pool({
    host: "localhost",
    user: "postgres",
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    allowExitOnIdle: true,    
})

module.exports = {
    pool
}