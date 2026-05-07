'use strict';
const { body, validationResult } = require('express-validator');

exports.createRules = [
  body('nombre')
    .isString().notEmpty()
    .isLength({ max: 100 })
    .withMessage('El nombre es ombligatorio y máximo 100 caracteres'),
  body('descripcion')
    .optional()
    .isString()
    .isLength({ max: 500 })
    .withMessage('La descripción máximo 500 caracteres'),
  body('ataque')
    .isInt({ min: 0, max: 100 })
    .withMessage('El ataque debe ser un número entre 0 y 100'),
  body('defensa')
    .isInt({ min: 0, max: 100 })
    .withMessage('La defensa debe ser un número entre 0 y 100'),
  body('estamina')
    .isInt({ min: 0, max: 100 })
    .withMessage('La estamina debe ser un número entre 0 y 100'),
  body('perfilId')
    .isInt()
    .withMessage('El perfilId es obligatorio y debe ser un número'),
];

exports.updateRules = [
  body('nombre')
    .optional()
    .isString()
    .isLength({ max: 100 })
    .withMessage('El nombre máximo 100 caracteres'),
  body('ataque')
    .optional()
    .isInt({ min: 0, max: 100 })
    .withMessage('El ataque debe ser un número entre 0 y 100'),
  body('defensa')
    .optional()
    .isInt({ min: 0, max: 100 })
    .withMessage('La defensa debe ser un número entre 0 y 100'),
  body('estamina')
    .optional()
    .isInt({ min: 0, max: 100 })
    .withMessage('La estamina debe ser un número entre 0 y 100'),
];

exports.habilidadRules = [
  body('habilidadId')
    .isInt()
    .withMessage('El habilidadId es obligatorio y debe ser un número'),
  body('nivel')
    .isInt({ min: 1, max: 10 })
    .withMessage('El nivel debe ser un número entre 1 y 10'),
];

exports.handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};