const bcrypt = require("bcryptjs"); // Importa bcrypt para el hash de contraseñas
const Idioma = require("../models/idiomaModel"); // Importa el modelo de Usuario
const jwt = require("jsonwebtoken"); // Importa jsonwebtoken para manejar autenticación
require("dotenv").config();

exports.obtenerIdiomas = async (req, res) => {
  try {
    const idiomas = await Idioma.find();
    res.json(idiomas);
  } catch (error) {
    console.error("Error al obtener idiomas:", error);
    res.status(500).json({ error: "Error al obtener idiomas" });
  }
};

exports.crearIdioma = async (req, res) => {
  try {
    const { nombre, codigo } = req.body;

    // Validar que se proporcionaron los campos requeridos
    if (!nombre || !codigo) {
      return res.status(400).json({ error: "Faltan campos requeridos" });
    }

    // Crear un nuevo documento de idioma
    const nuevoIdioma = new Idioma({
      nombre,
      codigo,
    });

    // Guardar el nuevo idioma en la base de datos
    await nuevoIdioma.save();

    res
      .status(201)
      .json({ mensaje: "Idioma creado con éxito", id: nuevoIdioma._id });
  } catch (error) {
    console.error("Error al crear idioma:", error);
    res.status(500).json({ error: "Error al crear idioma" });
  }
};

exports.actualizarIdioma = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, codigo } = req.body;
    // Validar que se proporcionaron los campos requeridos
    if (!nombre || !codigo) {
      return res.status(400).json({ error: "Faltan campos requeridos" });
    }
    const idiomaActualizado = await Idioma.findByIdAndUpdate(
      id,
      { nombre, codigo },
      { new: true }
    );
    if (!idiomaActualizado) {
      return res.status(404).json({ error: "Idioma no encontrado" });
    }
    res.json({
      mensaje: "Idioma actualizado con éxito",
      idioma: idiomaActualizado,
    });
  } catch (error) {
    console.error("Error al actualizar idioma:", error);
    res.status(500).json({ error: "Error al actualizar idioma" });
  }
};

exports.eliminarIdioma = async (req, res) => {
  try {
    const { id } = req.params;
    const idiomaEliminado = await Idioma.findByIdAndDelete(id);
    if (!idiomaEliminado) {
      return res.status(404).json({ error: "Idioma no encontrado" });
    }
    res.json({ mensaje: "Idioma eliminado con éxito" });
  } catch (error) {
    console.error("Error al eliminar idioma:", error);
    res.status(500).json({ error: "Error al eliminar idioma" });
  }
};
