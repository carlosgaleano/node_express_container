const usuarioService = require(
    '../services/usuarios.service'
);

const listar = async (req, res, next) => {

    try {

        const usuarios =
            await usuarioService.obtenerUsuarios();

        res.json(usuarios);

    } catch (error) {

        next(error);

    }

};

const obtener = async (req, res, next) => {

    try {

        const usuario =
            await usuarioService.obtenerUsuarioPorId(
                req.params.id
            );

        if (!usuario) {

            return res.status(404).json({
                mensaje: 'Usuario no encontrado'
            });

        }

        res.json(usuario);

    } catch (error) {

        next(error);

    }

};

const crear = async (req, res, next) => {

    try {

        const { nombre, email } = req.body;

        const usuario =
            await usuarioService.crearUsuario(
                nombre,
                email
            );

        res.status(201).json(usuario);

    } catch (error) {

        next(error);

    }

};

module.exports = {
    listar,
    obtener,
    crear
};