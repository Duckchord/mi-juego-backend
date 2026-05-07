'use strict';
const { Personaje, Habilidad, PersonajeHabilidad } = require('../../models');

exports.list = async (req, res, next) => {
  try {
    const personajes = await Personaje.findAll({
      include: [{ model: Habilidad, through: { attributes: ['nivel'] } }]
    });
    res.json(personajes);
  } catch (err) { next(err); }
};

exports.show = async (req, res, next) => {
  try {
    const personaje = await Personaje.findByPk(req.params.id, {
      include: [{ model: Habilidad, through: { attributes: ['nivel'] } }]
    });
    if (!personaje) return res.status(404).json({ error: 'Personaje no encontrado' });
    res.json(personaje);
  } catch (err) { next(err); }
};

exports.create = async (req, res, next) => {
  try {
    const personaje = await Personaje.create(req.body);
    res.status(201).json(personaje);
  } catch (err) { next(err); }
};

exports.update = async (req, res, next) => {
  try {
    const personaje = await Personaje.findByPk(req.params.id);
    if (!personaje) return res.status(404).json({ error: 'Personaje no encontrado' });
    await personaje.update(req.body);
    res.json(personaje);
  } catch (err) { next(err); }
};

exports.destroy = async (req, res, next) => {
  try {
    const personaje = await Personaje.findByPk(req.params.id);
    if (!personaje) return res.status(404).json({ error: 'Personaje no encontrado' });
    await personaje.destroy();
    res.json({ mensaje: 'Personaje eliminado correctamente' });
  } catch (err) { next(err); }
};

exports.addHabilidad = async (req, res, next) => {
  try {
    const { habilidadId, nivel } = req.body;
    await PersonajeHabilidad.create({ personajeId: req.params.id, habilidadId, nivel });
    res.status(201).json({ mensaje: 'Habilidad agregada correctamente' });
  } catch (err) { next(err); }
};

exports.removeHabilidad = async (req, res, next) => {
  try {
    await PersonajeHabilidad.destroy({
      where: { personajeId: req.params.idP, habilidadId: req.params.idH }
    });
    res.json({ mensaje: 'Habilidad eliminada correctamente' });
  } catch (err) { next(err); }
};