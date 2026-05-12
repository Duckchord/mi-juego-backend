'use strict';
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Usuario } = require('../../models');

exports.login = async (req, res, next) => {
  try {
    const { correo, contrasena } = req.body;

    if (!correo || !contrasena) {
      return res.status(400).json({ error: 'correo y contrasena son requeridos' });
    }

    const user = await Usuario.findOne({ where: { correo } });
    if (!user) {
      // Mismo mensaje genérico que cuando la contraseña no coincide,
      // para no revelar si el correo existe o no en la base.
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }

    const valid = await bcrypt.compare(contrasena, user.contrasena);
    if (!valid) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }

    const token = jwt.sign(
      {
        sub: user.id,
        correo: user.correo,
        nombre: user.nombre,
        role: user.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || '1h' }
    );

    res.json({
      token,
      token_type: 'bearer',
      user: {
        id: user.id,
        nombre: user.nombre,
        correo: user.correo,
        role: user.role,
      },
    });
  } catch (err) { next(err); }
};

exports.me = async (req, res) => {
  // req.user fue inyectado por el middleware authJwt
  res.json(req.user);
};

// Endpoint extra de registro - útil para crear usuarios desde el frontend
// sin tener que meterlos por seeder. Cualquiera puede registrarse como USER.
exports.register = async (req, res, next) => {
  try {
    const { nombre, correo, contrasena } = req.body;

    if (!nombre || !correo || !contrasena) {
      return res.status(400).json({ error: 'nombre, correo y contrasena son requeridos' });
    }

    const existing = await Usuario.findOne({ where: { correo } });
    if (existing) {
      return res.status(409).json({ error: 'El correo ya está registrado' });
    }

    const hashed = await bcrypt.hash(contrasena, 10);
    const nuevo = await Usuario.create({
      nombre,
      correo,
      contrasena: hashed,
      role: 'USER', // nunca permitir registrar ADMIN desde aquí
    });

    res.status(201).json({
      id: nuevo.id,
      nombre: nuevo.nombre,
      correo: nuevo.correo,
      role: nuevo.role,
    });
  } catch (err) { next(err); }
};