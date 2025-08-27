const { Schema, model } = require("mongoose");

// Definir el esquema de Usuario
const leccionSchema = new Schema({
  idioma: { type: String, required: true },
  palabras: { type: [String], default: [], required: true },
  traducciones: { type: [String], default: [], required: true },
  author: { type: String, required: true },
  creada_el: { type: Date, default: Date.now },
  players: { type: [String], default: [] },
  tipo: { type: String, required: true },
});

// Crear el modelo Usuario basado en el esquema
// const Usuario = model('Usuario', usuarioSchema);

module.exports = model("Leccion", leccionSchema);
// Exportar el modelo para usarlo en otras partes de la aplicación
