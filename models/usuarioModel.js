const { Schema, model } = require("mongoose");

// Definir el esquema de Usuario
const usuarioSchema = new Schema({
  username: { type: String, required: true, unique: true },
  clave: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  puntos: { type: Number, default: 0 },
  registrado_el: { type: Date, default: Date.now },
  juegos_creados: { type: Number, default: 0 },
  idiomas: { type: [String], default: [] },
});

// Crear el modelo Usuario basado en el esquema
// const Usuario = model('Usuario', usuarioSchema);

module.exports = model("Usuario", usuarioSchema);
// Exportar el modelo para usarlo en otras partes de la aplicación
