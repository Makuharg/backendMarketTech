const { pool } = require("../server/server");

const getUserByEmail = async (email) => {
    const consulta = 'SELECT * FROM users WHERE email = $1';
    const value = [email];

    const { rows, rowCount } = await pool.query(consulta, value);
    return { rows, rowCount };
};

module.exports = { getUserByEmail };