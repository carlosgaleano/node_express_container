const express = require('express');

const router = express.Router();

console.log('auth.routes cargado');

const authController =
    require('../controllers/auth.controller');

console.log(authController);

router.post(
    '/login',
    authController.login
);

module.exports = router;