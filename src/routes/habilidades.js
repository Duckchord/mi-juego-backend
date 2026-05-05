// src/routes/habilidades.js
// Este archivo maneja todas las rutas de /api/habilidades

const express = require('express');
const { habilidades } = require('../data/datosJuego');

const router = express.Router();

// -------------------------------------------------------
// GET /api/habilidades?orden=estamina
// Devuelve todas las habilidades.
// RETO 8 — Si llega ?orden=estamina, ordena de mayor a menor
// por el campo incremento_estamina antes de responder.
// -------------------------------------------------------
router.get('/', (req, res) => {
  const { orden } = req.query;

  // Creamos una copia del arreglo para no alterar el original al ordenar
  // (spread [...habilidades] crea un nuevo arreglo con los mismos elementos)
  let resultado = [...habilidades];

  if (orden === 'estamina') {
    // sort() ordena en el lugar. b - a = orden descendente (mayor primero)
    resultado.sort((a, b) => b.incremento_estamina - a.incremento_estamina);
  }

  res.status(200).json(resultado);
});

// -------------------------------------------------------
// RETO 2 — GET /api/habilidades/:id
// Devuelve una única habilidad por su id.
// Si no existe, responde con 404.
// -------------------------------------------------------
router.get('/:id', (req, res) => {
  const id = Number(req.params.id);

  const habilidad = habilidades.find(h => h.id === id);

  if (!habilidad) {
    // 404 Not Found — la habilidad con ese id no existe
    return res.status(404).json({ error: 'Habilidad no encontrada' });
  }

  res.status(200).json(habilidad);
});

// -------------------------------------------------------
// POST /api/habilidades
// Crea una nueva habilidad con los datos del body.
// -------------------------------------------------------
router.post('/', (req, res) => {
  const datosNuevos = req.body;

  if (!datosNuevos.nombre) {
    return res.status(400).json({ error: 'El campo nombre es obligatorio' });
  }

  const nuevoId = habilidades.length > 0
    ? Math.max(...habilidades.map(h => h.id)) + 1
    : 1;

  const nuevaHabilidad = {
    id: nuevoId,
    incremento_ataque: 0,
    incremento_defensa: 0,
    incremento_estamina: 0,
    ...datosNuevos,
  };

  habilidades.push(nuevaHabilidad);

  // 201 Created — recurso creado exitosamente
  res.status(201).json(nuevaHabilidad);
});

// -------------------------------------------------------
// RETO 4 — PUT /api/habilidades/:id
// Modifica una habilidad existente con los datos del body.
// -------------------------------------------------------
router.put('/:id', (req, res) => {
  const id = Number(req.params.id);

  const indice = habilidades.findIndex(h => h.id === id);

  if (indice === -1) {
    return res.status(404).json({ error: 'Habilidad no encontrada' });
  }

  // Mezclamos los datos actuales con los que llegaron del cliente
  habilidades[indice] = {
    ...habilidades[indice], // datos actuales del arreglo
    ...req.body,            // nuevos datos del cliente (sobreescriben)
    id: id,                 // el id nunca cambia
  };

  // 200 OK — devolvemos la habilidad ya actualizada
  res.status(200).json(habilidades[indice]);
});

// -------------------------------------------------------
// DELETE /api/habilidades/:id
// Elimina una habilidad por su id.
// -------------------------------------------------------
router.delete('/:id', (req, res) => {
  const id = Number(req.params.id);

  const indice = habilidades.findIndex(h => h.id === id);

  if (indice === -1) {
    return res.status(404).json({ error: 'Habilidad no encontrada' });
  }

  habilidades.splice(indice, 1);

  // 204 No Content — eliminado correctamente, sin cuerpo
  res.status(204).send();
});

module.exports = router;