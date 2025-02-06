const { Pool } = require('pg');

const pool = new Pool({
    host: "localhost",
    user: "postgres",
    password: "marcos",
    database: "proyecto-final",
    allowExitOnIdle: true,    
})

module.exports = {
    pool
}