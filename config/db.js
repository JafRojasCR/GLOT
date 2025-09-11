const mongoose = require("mongoose");
require("dotenv").config();
const mongoURI = process.env.MONGO_URI;

// Función para conectar a la base de datos MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(mongoURI);
    console.log("Conectado a MongoDB Atlas");
  } catch (err) {
    console.error("Error de conexión:", err.message);
    // Salir del proceso con error
    process.exit(1);
  }
};

module.exports = connectDB;
// Exportamos la función para usarla en otros archivos
// En app.js, se puede llamar a connectDB() para establecer la conexión al iniciar la aplicación
