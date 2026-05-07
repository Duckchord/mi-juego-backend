'use strict';

function stripIdSuffixes(data) {
  if (Array.isArray(data)) return data.map(stripIdSuffixes);
  if (data !== null && typeof data === 'object') {
    const cleaned = {};
    for (const [key, value] of Object.entries(data)) {
      if (key.endsWith('id') || key.endsWith('_id') || key.endsWith('Id')) continue;
      cleaned[key] = stripIdSuffixes(value);
    }
    return cleaned;
  }
  return data;
}

module.exports = (req, res, next) => {
  const originalJson = res.json.bind(res);
  res.json = (body) => {
    // Convertir a JSON plano primero para eliminar referencias circulares
    const plain = JSON.parse(JSON.stringify(body));
    return originalJson(stripIdSuffixes(plain));
  };
  next();
};