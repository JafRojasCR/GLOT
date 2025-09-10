const { Schema, model } = require("mongoose");

// Definir el esquema de Usuario
const leccionSchema = new Schema({
  idioma: { type: String, required: true },
  palabras: { type: [String], default: [], required: true },
  traducciones: { type: [String], default: [], required: true },
  autor: { type: String, required: true },
  creada_el: { type: Date, default: Date.now },
  jugadas: { type: Number, default: 0 },
  tipo: { type: String, required: true },
});


module.exports = model("Leccion", leccionSchema);
// Exportar el modelo para usarlo en otras partes de la aplicación
