'use strict';
const express = require('express');
const ctrl = require('../controllers/auth.controller');
const authJwt = require('../middlewares/authJwt');
const { Usuario } = require('../../models');
const router = express.Router();

router.post('/login', ctrl.login);
router.post('/register', ctrl.register);
router.get('/me', authJwt, ctrl.me);

// Endpoint temporal para limpiar usuarios de prueba
router.delete('/usuarios/:id', async (req, res, next) => {
  try {
    await Usuario.destroy({ where: { id: req.params.id } });
    res.json({ message: 'Usuario eliminado' });
  } catch (err) { next(err); }
});

module.exports = router;