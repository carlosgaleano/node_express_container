require('dotenv').config();

const express = require('express');

const app = express();

app.use(express.json());

const authRoutes =
require('./router/auth.routes');

const usuariosRoutes = require('./router/usuarios.routes');

const authMiddleware =
require('./middleware/auth');

console.log('authRoutes:', authRoutes);
console.log('authMiddleware:', authMiddleware);
console.log('usuariosRoutes:', usuariosRoutes);

//app.use('/api/usuarios', usuariosRoutes);
app.use('/api', authRoutes);


app.use(
    '/api/usuarios',
    authMiddleware,
    usuariosRoutes
);

app.get('/', (req, res) => {
    res.json({
        mensaje: 'API funcionando'
    });
});

app.listen(process.env.PORT, () => {
    console.log(
        `Servidor iniciado en puerto ${process.env.PORT}`
    );
});