const express = require('express');
console.log('Router usuarios cargado');
const router = express.Router();

const controller = require(
    '../controllers/usuarios.controller'
);

router.get(
    '/',
    controller.listar
);

router.get(
    '/:id',
    controller.obtener
);

router.post(
    '/',
    controller.crear
);

module.exports = router;