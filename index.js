require("dotenv").config(); // Cargar las variables de entorno desde el archivo .env
const usuarioRoutes = require("./routes/usuarioRoutes"); // Importa las rutas de usuario
const idiomaRoutes = require("./routes/idiomaRoutes"); // Importa las rutas de idioma}
const leccionRoutes = require("./routes/leccionRoutes"); // Importa las rutas de lección
const viewRoutes = require("./routes/viewRoutes"); // Importa las rutas de vistas
const express = require("express");
const PORT = process.env.PORT;
const connectDB = require("./config/db"); // Importa la función de conexión a la base de datos
// Importa el enrutador de autenticación (Express router, not 'router' package)
const { router: authRouter } = require("./middleware/auth");
const cors = require("cors");

connectDB(); // Llama a la función para conectar a la base de datos

// Inicializa la aplicación Express
const app = express();

// Middleware para parsear JSON en las peticiones (body-parser integrado)
app.use(express.json()); // Permite recibir datos en formato JSON

// Middleware para habilitar CORS
app.use(cors());    // Se dejan los paréntesis vacíos para permitir todas las solicitudes
                    // Se pueden poner ips para restringir acceso
                    // Ejemplo: app.use(cors({ origin: 'http://example.com' }));

app.use("/", viewRoutes);
app.use("/api/usuarios", usuarioRoutes);
app.use("/api/idiomas", idiomaRoutes);
app.use("/api/lecciones", leccionRoutes);
// Asegúrate que authRouter es un Express router (it is, from middleware/auth.js)
app.use("/api", authRouter); // Expone el endpoint /api/verify-token
app.listen(PORT, () => {
  console.log(`Servidor API escuchando en http://localhost:${PORT}`);
});
// Probar en http://localhost:3000/registro.html
