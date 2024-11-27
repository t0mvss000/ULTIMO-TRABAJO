
const express = require("express");
const router = express.Router();
const {
  crear_practica,
  listar_practicas,
  obtener_practica,
  actualizar_practica,
  eliminar_practica,
} = require("../controladores/añadir_practica");


router.post("/", crear_practica);

router.get("/", listar_practicas);

router.get("/:id", obtener_practica);

router.put("/:id", actualizar_practica);

router.delete("/:id", eliminar_practica);

module.exports = router;