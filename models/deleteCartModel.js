const { pool } = require("../server/server");

const clearUserCart = async (user_id) => {
    const consulta = 'DELETE FROM cart WHERE user_id = $1';
    const values = [user_id];
    return await pool.query(consulta, values);
};

module.exports = { clearUserCart };
