'use strict';

/**
 * Restringe acceso según rol(es). Acepta un string o un array.
 *   requireRole('ADMIN')
 *   requireRole(['ADMIN', 'MODERATOR'])
 */
module.exports = (allowedRoles) => {
  // Normalizamos a array para tratar ambos casos igual
  const roles = Array.isArray(allowedRoles) ? allowedRoles : [allowedRoles];

  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ error: 'No autenticado' });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        error: `Acceso prohibido. Se requiere rol: ${roles.join(' o ')}.`
      });
    }

    next();
  };
};