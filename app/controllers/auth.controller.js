const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const authService = require('../services/auth.service');

const login = async (req, res) => {

    try {

        const { email, password } = req.body;

        const usuario =
            await authService.buscarPorEmail(email);

        if (!usuario) {
            return res.status(401).json({
                mensaje: 'Credenciales incorrectas'
            });
        }

        const validaPassword =
            await bcrypt.compare(
                password,
                usuario.password
            );

        if (!validaPassword) {

            return res.status(401).json({
                mensaje: 'Credenciales incorrectas'
            });

        }

        const token = jwt.sign(
            {
                id: usuario.id,
                email: usuario.email
            },
            process.env.JWT_SECRET,
            {
                expiresIn: process.env.JWT_EXPIRES
            }
        );

        res.json({
            token,
            usuario: {
                id: usuario.id,
                name: usuario.name,
                email: usuario.email
            }
        });

    } catch (error) {

        res.status(500).json({
            error: error.message
        });

    }
};

module.exports = {
    login
};