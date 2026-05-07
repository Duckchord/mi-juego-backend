'use strict';
const express = require('express');
const ctrl = require('../controllers/personajes.controller');
const { createRules, updateRules, habilidadRules, handleValidationErrors } = require('../validators/personaje.validator');
const router = express.Router();

router.get('/',                         ctrl.list);
router.get('/:id',                      ctrl.show);
router.post('/',                        createRules, handleValidationErrors, ctrl.create);
router.put('/:id',                      updateRules, handleValidationErrors, ctrl.update);
router.delete('/:id',                   ctrl.destroy);
router.post('/:id/habilidades',         habilidadRules, handleValidationErrors, ctrl.addHabilidad);
router.delete('/:idP/habilidades/:idH', ctrl.removeHabilidad);  


module.exports = router;

