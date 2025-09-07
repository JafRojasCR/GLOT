const bcrypt = require('bcryptjs'); // Importa bcrypt para el hash de contraseñas
const Usuario = require('../models/usuarioModel'); // Importa el modelo de Usuario
const jwt = require('jsonwebtoken'); // Importa jsonwebtoken para manejar autenticación
require('dotenv').config();


exports.obtenerUsuarios = async (req, res) => {

  try {
    const usuarios = await Usuario.find();
    res.json(usuarios);
  } catch (error) {
    console.error("Error al obtener usuarios:", error);
    res.status(500).json({ error: "Error al obtener usuarios" });
  }
};

exports.crearUsuario = async (req, res) => {

    try {
    const { username, clave, email, puntos, juegos_creados, idiomas } = req.body;

    // 1. Generar un salt (semilla aleatoria) para el hash
    const salt = await bcrypt.genSalt(10);                  // 10 rondas de generación de salt
    // 2. Hashear la contraseña proporcionada usando el salt generado
    const hash = await bcrypt.hash(clave, salt);
    
    // 3. Crear y guardar el nuevo usuario con la contraseña hasheada
    const nuevoUsuario = new Usuario({ username, clave: hash, email, puntos, juegos_creados, idiomas });
    await nuevoUsuario.save();
    
    res.status(201).json({ mensaje: 'Usuario registrado con éxito', id: nuevoUsuario._id });
  } catch (error) {
    res.status(400).json({ error: 'No se pudo registrar el usuario' });
  }
};

exports.actualizarUsuario = async (req, res) => {
  const { id } = req.params;
  const { username, clave, email, puntos, juegos_creados, idiomas } = req.body;

  try {
    const usuarioActualizado = await Usuario.findByIdAndUpdate(
      id,
      { username, clave, email, puntos, juegos_creados, idiomas },
      { new: true }
    );

    if (!usuarioActualizado) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    res.json(usuarioActualizado);
  } catch (error) {
    console.error("Error al actualizar usuario:", error);
    res.status(500).json({ error: "Error al actualizar usuario" });
  }
};

exports.eliminarUsuario = async (req, res) => {
  const { id } = req.params;

  try {
    const usuarioEliminado = await Usuario.findByIdAndDelete(id);

    if (!usuarioEliminado) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    res.json({ message: "Usuario eliminado" });
  } catch (error) {
    console.error("Error al eliminar usuario:", error);
    res.status(500).json({ error: "Error al eliminar usuario" });
  }
};



// Login de usuario (autenticación)
exports.login =  async (req, res) => {
  try {
    const { clave, email } = req.body;
    // 1. Buscar al usuario por email
    const usuario = await Usuario.findOne({ email });
    if (!usuario) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }
    // 2. Verificar la contraseña con bcrypt.compare
    const passwordOk = await bcrypt.compare(clave, usuario.clave);
    if (!passwordOk) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }
    // 3. Credenciales válidas: Generar token JWT
    const datosToken = { id: usuario._id, email: usuario.email, username: usuario.username };
    const secreto = process.env.JWT_SECRET;
    const opciones = { expiresIn: '1h' };
    const token = jwt.sign(datosToken, secreto, opciones);
  // 4. Enviar solo el token al cliente
  res.json({ token });
  } catch (error) {
    res.status(500).json({ error: 'Error en el servidor' });
  }
};
