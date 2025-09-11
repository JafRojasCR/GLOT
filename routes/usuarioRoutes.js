const usuarioController = require("../controllers/usuarioController");
const { verificarToken } = require("../middleware/auth");
const router = require("express").Router();

router.get("/", usuarioController.obtenerUsuarios);
router.get("/:nombre", usuarioController.obtenerUsuarioPorNombre);
router.post("/", usuarioController.crearUsuario);
router.post("/login", usuarioController.login);
router.put("/:nombre", verificarToken, usuarioController.actualizarUsuario);
router.delete("/:id", verificarToken, usuarioController.eliminarUsuario);

module.exports = router;
