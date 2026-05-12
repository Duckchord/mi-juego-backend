'use strict';
const { body, validationResult } = require('express-validator');

exports.createRules = [
  body('nombre').notEmpty().withMessage('El nombre es obligatorio')
    .isLength({ max: 100 }).withMessage('El nombre máximo 100 caracteres'),
  body('descripcion').optional()
    .isLength({ max: 500 }).withMessage('La descripción máximo 500 caracteres'),
  body('ataque').notEmpty().withMessage('El ataque es obligatorio')
    .isInt({ min: 0, max: 100 }).withMessage('El ataque debe ser entre 0 y 100'),
  body('defensa').notEmpty().withMessage('La defensa es obligatoria')
    .isInt({ min: 0, max: 100 }).withMessage('La defensa debe ser entre 0 y 100'),
  body('estamina').notEmpty().withMessage('La estamina es obligatoria')
    .isInt({ min: 0, max: 100 }).withMessage('La estamina debe ser entre 0 y 100'),
  body('perfilId').notEmpty().withMessage('El perfilId es obligatorio')
    .isInt().withMessage('El perfilId debe ser un número'),
];

exports.updateRules = [
  body('nombre').optional()
    .isLength({ max: 100 }).withMessage('El nombre máximo 100 caracteres'),
  body('ataque').optional()
    .isInt({ min: 0, max: 100 }).withMessage('El ataque debe ser entre 0 y 100'),
  body('defensa').optional()
    .isInt({ min: 0, max: 100 }).withMessage('La defensa debe ser entre 0 y 100'),
  body('estamina').optional()
    .isInt({ min: 0, max: 100 }).withMessage('La estamina debe ser entre 0 y 100'),
];

exports.habilidadRules = [
  body('habilidadId').notEmpty().withMessage('El habilidadId es obligatorio')
    .isInt().withMessage('El habilidadId debe ser un número'),
  body('nivel').notEmpty().withMessage('El nivel es obligatorio')
    .isInt({ min: 1, max: 10 }).withMessage('El nivel debe ser entre 1 y 10'),
];

exports.handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};