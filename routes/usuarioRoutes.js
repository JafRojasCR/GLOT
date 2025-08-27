const usuarioController = require("../controllers/usuarioController");
const { verificarToken } = require("../middleware/auth")
const router = require("express").Router();

router.get("/", verificarToken, usuarioController.obtenerUsuarios);
router.post("/", verificarToken, usuarioController.crearUsuario);
router.put("/:id", verificarToken, usuarioController.actualizarUsuario);
router.delete("/:id", verificarToken, usuarioController.eliminarUsuario);
// router.post("/login", usuarioController.loginUsuario);

module.exports = router