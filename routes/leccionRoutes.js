const leccionController = require("../controllers/leccionController");
const { verificarToken } = require("../middleware/auth");
const router = require("express").Router();

router.get("/", verificarToken, leccionController.obtenerLecciones);
router.get("/:id", verificarToken, leccionController.obtenerLeccionPorId);
router.post("/", verificarToken, leccionController.crearLeccion);
router.put("/:id", verificarToken, leccionController.actualizarLeccion);
router.delete("/:id", verificarToken, leccionController.eliminarLeccion);

module.exports = router;
