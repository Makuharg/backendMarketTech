const { pool } = require("../server/server");

const getUserCart = async (user_id) => {
    const consulta = 'SELECT * FROM cart WHERE user_id = $1';
    return await pool.query(consulta, [user_id]);
};

module.exports = { getUserCart };