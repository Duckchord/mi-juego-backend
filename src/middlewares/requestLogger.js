'use strict';
const { RequestLog } = require('../../models');

module.exports = async (req, res, next) => {
  try {
    await RequestLog.create({
      method: req.method,
      path: req.originalUrl,
      ip: req.ip,
    });
  } catch (err) {
    console.error('Error guardando log:', err);
    // Si falla el log, no bloqueamos la petición
  }
  next();
};