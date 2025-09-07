require("dotenv").config(); // Cargar las variables de entorno desde el archivo .env
const usuarioRoutes = require("./routes/usuarioRoutes"); // Importa las rutas de usuario
const viewRoutes = require("./routes/viewRoutes"); // Importa las rutas de vistas
const express = require("express");
const PORT = process.env.PORT;
const connectDB = require("./config/db"); // Importa la función de conexión a la base de datos
const { router: authRouter } = require("./middleware/auth"); // Importa el enrutador de autenticación

connectDB(); // Llama a la función para conectar a la base de datos

// Inicializa la aplicación Express
const app = express();

// Middleware para parsear JSON en las peticiones (body-parser integrado)
app.use(express.json()); // Permite recibir datos en formato JSON

app.use("/", viewRoutes);
app.use("/api/usuarios", usuarioRoutes);
app.use("/api", authRouter); // Expone el endpoint /api/verify-token
app.listen(PORT, () => {
  console.log(`Servidor API escuchando en http://localhost:${PORT}`);
});
// Probar en http://localhost:3000/registro.html
