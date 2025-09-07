const jwt = require("jsonwebtoken");
require("dotenv").config();
const verificarToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader) return res.status(401).json({ error: "Token requerido" });

  const token = authHeader.split(" ")[1];
  const secreto = process.env.JWT_SECRET;

  try {
    const decoded = jwt.verify(token, secreto);
    req.usuarioId = decoded.id;
    next();
  } catch (err) {
    return res.status(403).json({ error: "Token inválido o expirado" });
  }
};

// Endpoint para verificar el token desde el frontend
const express = require("express");
const router = express.Router();

router.post("/verify-token", (req, res) => {
  const { token } = req.body;
  const secreto = process.env.JWT_SECRET;
  try {
    const decoded = jwt.verify(token, secreto);
    res.json({ valid: true, datosToken: decoded });
  } catch (err) {
    res.json({ valid: false });
  }
});

module.exports = { verificarToken, router };
