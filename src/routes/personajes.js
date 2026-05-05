const express = require('express');
const { Personaje, Habilidad, PersonajeHabilidad } = require('../../models');
const router = express.Router();

// Obtener todos los personajes con sus habilidades y nivel
router.get('/', async (req, res, next) => {
  try {
    const personajes = await Personaje.findAll({
      include: [{
        model: Habilidad,
        through: { attributes: ['nivel'] } // solo queremos el campo nivel de la tabla intermedia
      }]
    });
    res.json(personajes);
  } catch (err) {
    next(err); // pasa el error al middleware global
  }
});

// Obtener un personaje por id, incluyendo habilidades
router.get('/:id', async (req, res, next) => {
  try {
    const personaje = await Personaje.findByPk(req.params.id, {
      include: [{
        model: Habilidad,
        through: { attributes: ['nivel'] }
      }]
    });
    if (!personaje) {
      return res.status(404).json({ error: 'Personaje no encontrado' });
    }
    res.json(personaje);
  } catch (err) {
    next(err);
  }
});

// Crear un nuevo personaje
router.post('/', async (req, res, next) => {
  try {
    const nuevo = await Personaje.create(req.body);
    res.status(201).json(nuevo);
  } catch (err) {
    next(err);
  }
});

// Actualizar un personaje
router.put('/:id', async (req, res, next) => {
  try {
    const personaje = await Personaje.findByPk(req.params.id);
    if (!personaje) return res.status(404).json({ error: 'No encontrado' });
    await personaje.update(req.body);
    res.json(personaje);
  } catch (err) {
    next(err);
  }
});

// Eliminar un personaje
router.delete('/:id', async (req, res, next) => {
  try {
    const personaje = await Personaje.findByPk(req.params.id);
    if (!personaje) return res.status(404).json({ error: 'No encontrado' });
    await personaje.destroy();
    res.json({ mensaje: 'Personaje eliminado' });
  } catch (err) {
    next(err);
  }
});

// Agregar una habilidad a un personaje con nivel
router.post('/:id/habilidades', async (req, res, next) => {
  try {
    const personaje = await Personaje.findByPk(req.params.id);
    if (!personaje) return res.status(404).json({ error: 'Personaje no encontrado' });
    const { habilidadId, nivel } = req.body; // esperamos que vengan en el body
    await personaje.addHabilidad(habilidadId, { through: { nivel: nivel || 1 } });
    res.json({ mensaje: 'Habilidad agregada' });
  } catch (err) {
    next(err);
  }
});

// Quitar una habilidad de un personaje
router.delete('/:idP/habilidades/:idH', async (req, res, next) => {
  try {
    const personaje = await Personaje.findByPk(req.params.idP);
    if (!personaje) return res.status(404).json({ error: 'Personaje no encontrado' });
    await personaje.removeHabilidad(req.params.idH);
    res.json({ mensaje: 'Habilidad removida' });
  } catch (err) {
    next(err);
  }
});

module.exports = router;