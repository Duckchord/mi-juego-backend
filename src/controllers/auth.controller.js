'use strict';
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Usuario } = require('../../models');

exports.login = async (req, res, next) => {
  try {
    const { nombre, contrasena } = req.body;

    // Verificar que llegaron los datos
    if (!nombre || !contrasena) {
      return res.status(400).json({ error: 'nombre y contrasena son requeridos' });
    }

    // Buscar el usuario en la BD
    const user = await Usuario.findOne({ where: { nombre } });
    if (!user) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }

    // Comparar la contraseña con el hash guardado
    const valid = await bcrypt.compare(contrasena, user.contrasena);
    if (!valid) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }

    // Generar el token JWT
    const token = jwt.sign(
      { sub: user.id, nombre: user.nombre, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || '1h' }
    );

    res.json({
      token,
      token_type: 'bearer',
      user: { id: user.id, nombre: user.nombre, role: user.role },
    });

  } catch (err) { next(err); }
};

exports.me = async (req, res) => {
  // req.user lo va a inyectar el middleware authJwt
  res.json(req.user);
};

exports.register = async (req, res, next) => {
  try {
    const { nombre, correo, contrasena } = req.body;

    if (!nombre || !correo || !contrasena) {
      return res.status(400).json({ error: 'nombre, correo y contrasena son requeridos' });
    }

    const hashedPassword = await bcrypt.hash(contrasena, 10);

    const user = await Usuario.create({
      nombre,
      correo,
      contrasena: hashedPassword,
      role: req.body.role || 'USER'
    });

    res.status(201).json({
      message: 'Usuario creado correctamente',
      user: { id: user.id, nombre: user.nombre, role: user.role }
    });

  } catch (err) { next(err); }
};  