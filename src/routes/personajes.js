'use strict';
const express = require('express');
const ctrl = require('../controllers/personajes.controller');
const router = express.Router();

router.get('/',                         ctrl.list);
router.get('/:id',                      ctrl.show);
router.post('/',                        ctrl.create);
router.put('/:id',                      ctrl.update);
router.delete('/:id',                   ctrl.destroy);
router.post('/:id/habilidades',         ctrl.addHabilidad);
router.delete('/:idP/habilidades/:idH', ctrl.removeHabilidad);

module.exports = router;