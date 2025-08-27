const express = require("express");
const path = require("path");
const router = express.Router();


// Servir archivos estáticos del public: (PARA PRUEBAS DE PWA)
router.use(express.static(path.join(__dirname, "../public")));
module.exports = router