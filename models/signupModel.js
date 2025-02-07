const { pool } = require("../server/server");

const createUser = async (username, email, phone_number, password_hash) => {
    const consulta = "INSERT INTO users values (DEFAULT, $1, $2, $3, $4, DEFAULT)";
    const values = [username, email, phone_number, password_hash];

    const { rowCount } = await pool.query(consulta, values);
    return rowCount;
};

module.exports = { createUser };
