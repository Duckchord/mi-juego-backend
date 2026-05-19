require('dotenv').config();
// src/app.js
// Archivo principal de la aplicación Express.
// Aquí configuramos el servidor y montamos los routers.

const express = require('express');
const cors = require('cors');
const { sequelize } = require('../models');

// Importamos los routers que creamos en /routes
const authRouter = require('./routes/auth');
const authJwt = require('./middlewares/authJwt');
const requireRole = require('./middlewares/requireRole');
const personajesRouter = require('./routes/personajes');
const habilidadesRouter = require('./routes/habilidades');
const usuariosRouter = require('./routes/usuarios');
const requestLogger = require('./middlewares/requestLogger');
const sanitizeIds   = require('./middlewares/sanitizeIds');

// Creamos la aplicación Express
const app = express();
const PORT = 3000;

// -------------------------------------------------------
// MIDDLEWARE
// Un middleware es una función que procesa la petición
// antes de que llegue a la ruta. Este le dice a Express
// que entienda los cuerpos en formato JSON.
// Sin esta línea, req.body siempre sería undefined.
// -------------------------------------------------------
app.use(express.json());
app.use(requestLogger);   // guarda cada llamada en la BD
app.use(sanitizeIds);     // limpia los Id de todas las respuestas
app.use(cors());
app.use(express.json());
app.use(express.static('public'));
// -------------------------------------------------------
// MONTAJE DE ROUTERS
// app.use('/api/personajes', personajesRouter) significa:
// "Cuando llegue una petición a /api/personajes,
//  deja que personajesRouter la maneje."
// Dentro del router, las rutas son relativas a este prefijo.
// -------------------------------------------------------

app.use('/api/personajes', authJwt, personajesRouter);
app.use('/api/habilidades', authJwt, habilidadesRouter);
app.use('/api/usuarios', authJwt, requireRole('ADMIN'), usuariosRouter);
app.use('/api', authRouter);

// -------------------------------------------------------
// RUTA DE BIENVENIDA
// Una ruta simple para verificar que el servidor funciona.
// -------------------------------------------------------
app.get('/api/rutas', (req, res) => {
  res.status(200).json({
    mensaje: 'API de Juego de Rol funcionando ✅',
    rutas_disponibles: [
      'GET    /api/personajes',
      'GET    /api/personajes?nombre=ar',
      'GET    /api/personajes?tipo=guerrero',
      'GET    /api/personajes/:id',
      'POST   /api/personajes',
      'PUT    /api/personajes/:id',
      'DELETE /api/personajes/:id',
      'GET    /api/personajes/:id/habilidades',
      'GET    /api/habilidades',
      'GET    /api/habilidades?orden=estamina',
      'GET    /api/habilidades/:id',
      'POST   /api/habilidades',
      'PUT    /api/habilidades/:id',
      'DELETE /api/habilidades/:id',
    ],
  });
});

// app.js
app.get('/authors', (req, res) => {
  res.json([
    { nombre: 'Juan Salas', codigo: '0000325184' },
    { nombre: 'Samuel Blanco  ', codigo: '0000349904' }
  ]);
});


// -------------------------------------------------------
// MIDDLEWARE DE 404 GLOBAL
// Si ninguna ruta anterior respondió, esta captura
// cualquier URL que no exista y devuelve un 404 claro.
// -------------------------------------------------------
// Middleware global de manejo de errores (siempre al final)

app.use((err, req, res, next) => {

  console.error(err);

  res.status(500).json({ error: 'Error interno del servidor' });

});


// Verifica conexión y arranca

(async () => {

  await sequelize.authenticate();

  app.listen(PORT, () => console.log(`Servidor en http://localhost:${PORT}`));

})();