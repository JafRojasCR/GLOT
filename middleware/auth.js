const jwt = require('jsonwebtoken');
require("dotenv").config();
const verificarToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  if (!authHeader) return res.status(401).json({ error: 'Token requerido' });

  const token = authHeader.split(' ')[1];
  const secreto = process.env.JWT_SECRET;

  try {
    const decoded = jwt.verify(token, secreto);
    req.usuarioId = decoded.id;
    next();
  } catch (err) {
    return res.status(403).json({ error: 'Token inválido o expirado' });
  }
};

module.exports = { verificarToken };
