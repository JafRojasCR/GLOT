const Leccion = require("../models/leccionModel"); // Importa el modelo de Usuario
const jwt = require("jsonwebtoken"); // Importa jsonwebtoken para manejar autenticación
require("dotenv").config();

exports.obtenerLecciones = async (req, res) => {
  try {
    const lecciones = await Leccion.find();
    res.json(lecciones);
  } catch (error) {
    console.error("Error al obtener lecciones:", error);
    res.status(500).json({ error: "Error al obtener lecciones" });
  }
};

exports.obtenerLeccionPorId = async (req, res) => {
  try {
    const { id } = req.params;
    const leccion = await Leccion.findById(id);
    if (!leccion) {
      return res.status(404).json({ error: "Lección no encontrada" });
    }
    res.json(leccion);
  } catch (error) {
    console.error("Error al obtener lección por ID:", error);
    res.status(500).json({ error: "Error al obtener lección por ID" });
  }
};

exports.crearLeccion = async (req, res) => {
  try {
    const { idioma, palabras, traducciones, autor, tipo } = req.body;

    const nuevaLeccion = new Leccion({
      idioma,
      palabras,
      traducciones,
      autor,
      tipo,
    });
    await nuevaLeccion.save();

    res
      .status(201)
      .json({ mensaje: "Lección creada con éxito", id: nuevaLeccion._id });
  } catch (error) {
    res.status(400).json({ error: "No se pudo crear la lección" });
  }
};

exports.actualizarLeccion = async (req, res) => {
  try {
    const { id } = req.params;
    const { jugadas } = req.body;

    const leccionActualizada = await Leccion.findByIdAndUpdate(
      id,
      { jugadas },
      { new: true }
    );

    if (!leccionActualizada) {
      return res.status(404).json({ error: "Lección no encontrada" });
    }

    res.json({
      mensaje: "Lección actualizada con éxito",
      leccion: leccionActualizada,
    });
  } catch (error) {
    console.error("Error al actualizar lección:", error);
    res.status(500).json({ error: "Error al actualizar lección" });
  }
};
exports.eliminarLeccion = async (req, res) => {
  try {
    const { id } = req.params;
    const leccionEliminada = await Leccion.findByIdAndDelete(id);
    if (!leccionEliminada) {
      return res.status(404).json({ error: "Lección no encontrada" });
    }
    res.json({ mensaje: "Lección eliminada con éxito" });
  } catch (error) {
    console.error("Error al eliminar lección:", error);
    res.status(500).json({ error: "Error al eliminar lección" });
  }
};
