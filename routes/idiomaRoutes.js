const idiomaController = require("../controllers/idiomaController");
const { verificarToken } = require("../middleware/auth")
const router = require("express").Router();

router.get("/", verificarToken, idiomaController.obtenerIdiomas);
router.post("/", verificarToken, idiomaController.crearIdioma);
router.put("/:id", verificarToken, idiomaController.actualizarIdioma);
router.delete("/:id", verificarToken, idiomaController.eliminarIdioma);

module.exports = router