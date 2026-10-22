const pool = require('../config/database');

const obtenerUsuarios = async () => {

    const result = await pool.query(`
        SELECT *
        FROM users
        ORDER BY id
    `);

    return result.rows;
};

const obtenerUsuarioPorId = async (id) => {

    const result = await pool.query(`
        SELECT *
        FROM users
        WHERE id = $1
    `, [id]);

    return result.rows[0];
};

const crearUsuario = async (name, email) => {

    const result = await pool.query(`
        INSERT INTO users (name, email)
        VALUES ($1, $2)
        RETURNING *
    `, [name, email]);

    return result.rows[0];
};

module.exports = {
    obtenerUsuarios,
    obtenerUsuarioPorId,
    crearUsuario
};
