require('dotenv').config();
// src/app.js
// Archivo principal de la aplicación Express.
// Aquí configuramos el servidor y montamos los routers.

const path = require('path');
const express = require('express');
const { sequelize } = require('../models');

// Routers
const personajesRouter = require('./routes/personajes');
const habilidadesRouter = require('./routes/habilidades');
const usuariosRouter = require('./routes/usuarios');
const authRouter = require('./routes/auth');

// Middlewares
const requestLogger = require('./middlewares/requestLogger');
const sanitizeIds   = require('./middlewares/sanitizeIds');
const authJwt      = require('./middlewares/authJwt');
const requireRole  = require('./middlewares/requireRole');

const app = express();
const PORT = 3000;

// -------------------------------------------------------
// MIDDLEWARES GLOBALES
// -------------------------------------------------------
app.use(express.json());
app.use(requestLogger);   // pre: guarda cada llamada en la BD
app.use(sanitizeIds);     // post: limpia IDs de las respuestas

// Frontend estático (sirve public/ para que la demo del frontend funcione
// sin problemas de CORS, ya que vive en el mismo dominio que la API)
app.use(express.static(path.join(__dirname, '..', 'public')));

// -------------------------------------------------------
// RUTAS PÚBLICAS (no requieren token)
// -------------------------------------------------------
app.use('/api', authRouter);   // /api/login, /api/register, /api/me

// -------------------------------------------------------
// RUTAS PROTEGIDAS (requieren token JWT válido)
// -------------------------------------------------------
app.use('/api/personajes', authJwt, personajesRouter);
app.use('/api/habilidades', authJwt, habilidadesRouter);

// /api/usuarios además requiere rol ADMIN
app.use('/api/usuarios', authJwt, requireRole('ADMIN'), usuariosRouter);

// -------------------------------------------------------
// RUTA DE BIENVENIDA
// -------------------------------------------------------
app.get('/api', (req, res) => {
  res.status(200).json({
    mensaje: 'API de Juego de Rol funcionando ✅',
    rutas_publicas: [
      'POST /api/login',
      'POST /api/register',
    ],
    rutas_protegidas: [
      'GET /api/me                            (cualquier usuario autenticado)',
      'GET|POST|PUT|DELETE /api/personajes    (cualquier usuario autenticado)',
      'GET|POST|PUT|DELETE /api/habilidades   (cualquier usuario autenticado)',
      'GET /api/usuarios/:id/personajes       (solo ADMIN)',
    ],
  });
});

// -------------------------------------------------------
// MANEJADOR DE ERRORES (siempre al final)
// -------------------------------------------------------
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Error interno del servidor' });
});

// Verifica conexión y arranca
(async () => {
  await sequelize.authenticate();
  app.listen(PORT, () => console.log(`Servidor en http://localhost:${PORT}`));
})();