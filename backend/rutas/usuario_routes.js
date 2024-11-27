
const express = require("express");
const router = express.Router();
const { crear_usuario, listar_usuario, listar_un_usuario, borrar_usuario, editar_usuario } = require("../controladores/usuario");


router.post("/Sesion", crear_usuario);

router.get("/usuarios", listar_usuario);

router.get("/usuarios/:nombre", listar_un_usuario);  // Usamos :nombre para parametro

// DELETE para borrar un usuario por ID
router.delete("/usuarios/:id", borrar_usuario); // Usamos :id para parametro

// PUT para editar un usuario por ID
router.put("/usuarios/:id", editar_usuario);  // Usamos :id para parametro

module.exports = router;