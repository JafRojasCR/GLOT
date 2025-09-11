const { Schema, model } = require("mongoose");

// Definir el esquema de Usuario
const idiomaSchema = new Schema({
  nombre: { type: String, required: true, unique: true },
  codigo: { type: String, required: true },
  cantidad_lecciones: { type: Number, default: 0 },
  usuarios_aprendiendo: { type: Number, default: 0 },
});

// Crear el modelo Usuario basado en el esquema
// const Usuario = model('Usuario', usuarioSchema);

module.exports = model("Idioma", idiomaSchema);
// Exportar el modelo para usarlo en otras partes de la aplicación
