const fs = require("fs");
const path = require("path");
const { validarNombreUsuario, validarUsuario, validarIdUsuario } = require("../util/validar.js"); // Asegúrate de que la ruta sea correcta
const Usuario = require("../modelos/Usuario.js");
 
const crear_usuario = (req, res) => {
    let parametros = req.body;
 
    try {
        validarUsuario(parametros);
        const usuario = new Usuario(parametros);
        usuario.save()
            .then(usuarioGuardado => { // Manejar la promesa de Mongoose
                return res.status(200).json({
                    status: "éxito",
                    usuario: usuarioGuardado, // Devuelve el usuario con el _id asignado
                    mensaje: "Usuario creado con éxito!!"
                });
            })
            .catch(error => {
                console.error(error);
                return res.status(500).json({ // 500 para error del servidor
                    status: "error",
                    mensaje: "Error al guardar el usuario",
                    error: error.message // Incluye el mensaje de error para depuración
                });
            });
 
    } catch (error) {
        console.error(error);
        return res.status(400).json({ // 400 para Bad Request (error de validación)
            status: "error",
            mensaje: "Error de validación",
            errores: JSON.parse(error.message)
        });
    }
}
 
const listar_usuario = async (req, res) => {
    try {
        let consulta = Usuario.find({});
 
        if (req.params.ultimos) {
            consulta.limit(parseInt(req.params.ultimos)); // Convertir a número
        }
 
        let resultado = await consulta.sort({ fecha: -1 });
 
        if (!resultado || resultado.length === 0) { // Comprobar si el array está vacío
            return res.status(404).json({
                status: "error",
                mensaje: "No se han encontrado usuarios!!"
            });
        } else {
            return res.status(200).json({ // Cambiar a .json() para consistencia
                status: "éxito",
                contador: resultado.length,
                resultado
            });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: "error",
            mensaje: "Error al obtener los usuarios"
        });
    }
}
 
const listar_un_usuario = async (req, res) => {
    let nombreU = req.params.nombre;
 
    try {
        validarNombreUsuario(nombreU);
        let resultado = await Usuario.find({ name: nombreU }); // Usar name en la consulta
 
        if (!resultado || resultado.length === 0) {
            return res.status(404).json({
                status: "error",
                mensaje: "No se ha encontrado el usuario"
            });
        } else {
            return res.status(200).json({
                status: "éxito",
                resultado
            });
        }
    } catch (error) {
        console.error(error);
        return res.status(400).json({
            status: "error",
            mensaje: error.message // Mostrar el mensaje de error específico
        });
    }
}
 
const borrar_usuario = async (req, res) => {
    try {
        let usuarioId = req.params.id;
        validarIdUsuario(usuarioId);
        let resultado = await Usuario.findByIdAndDelete(usuarioId); // Usar findByIdAndDelete
 
        if (!resultado) {
            return res.status(404).json({
                status: "error",
                mensaje: "Usuario no encontrado"
            });
        } else {
            return res.status(200).json({
                status: "éxito",
                mensaje: "Usuario borrado"
            });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: "error",
            mensaje: "Error al borrar el usuario"
        });
    }
}
 
const editar_usuario = async (req, res) => {
    let usuarioId = req.params.id;
    let parametros = req.body;
 
    try {
        validarUsuario(parametros); // Validar los datos de entrada
        let resultado = await Usuario.findByIdAndUpdate(usuarioId, parametros, { new: true });
 
        if (!resultado) {
            return res.status(404).json({
                status: "error",
                mensaje: "Usuario no encontrado"
            });
        } else {
            return res.status(200).json({
                status: "éxito",
                usuario: resultado,
                mensaje: "Usuario actualizado!!"
            });
        }
 
    } catch (error) {
        console.error(error);
        return res.status(400).json({
            status: "error",
            mensaje: "Error de validación",
            errores: JSON.parse(error.message)
        });
    }
}
 
 
module.exports = {
    crear_usuario,
    listar_usuario,
    listar_un_usuario,
    borrar_usuario,
    editar_usuario
}
