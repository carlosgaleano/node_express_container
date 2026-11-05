const pool = require('../config/database');
const bcrypt = require('bcrypt');

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

const crearUsuario2 = async (name, email) => {

    const result = await pool.query(`
        INSERT INTO users (name, email)
        VALUES ($1, $2)
        RETURNING *
    `, [name, email]);

    return result.rows[0];
};



const crearUsuario = async (
    name,
    email,
    password,
    role = 1,
    activo = 1,
    id_negocio = null,
    id_perfil = null
) => {

    const passwordHash = await bcrypt.hash(password, 10);

   // console.log('name', name, 'email', email, 'Password hash:', passwordHash);

    const result = await pool.query(`
        INSERT INTO users (
            name,
            email,
            password,
            role,
            activo,
            id_negocio,
            id_perfil,
            created_at,
            updated_at
        )
        VALUES (
            $1, $2, $3, $4, $5, $6, $7,
            CURRENT_TIMESTAMP,
            CURRENT_TIMESTAMP
        )
        RETURNING
            id,
            name,
            email,
            role,
            activo,
            id_negocio,
            id_perfil,
            created_at,
            updated_at
    `, [
        name,
        email,
        passwordHash,
        role,
        activo,
        id_negocio,
        id_perfil
    ]);

    return result.rows[0];
};

module.exports = {
    obtenerUsuarios,
    obtenerUsuarioPorId,
    crearUsuario
};
