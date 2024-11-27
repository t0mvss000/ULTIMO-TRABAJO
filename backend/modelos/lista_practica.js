const ListaPracticas = require("../modelos/ListaPracticas"); 

// Crea una nueva lista de prácticas
const crearListaPracticas = (req, res) => {
    let parametros = req.body;

    try {
       
        const listaPracticas = new ListaPracticas(parametros);
        listaPracticas.save()
            .then(listaPracticasGuardada => {
                return res.status(200).json({
                    status: "éxito",
                    listaPracticas: listaPracticasGuardada,
                    mensaje: "Lista de prácticas creada con éxito!!"
                });
            })
            .catch(error => {
                console.error(error);
                return res.status(500).json({
                    status: "error",
                    mensaje: "Error al guardar la lista de prácticas",
                    error: error.message
                });
            });

    } catch (error) {
        console.error(error);
        return res.status(400).json({
            status: "error",
            mensaje: "Error de validación",
            errores: error.message
        });
    }
}

// Lista todas las listas de prácticas
const listarListasPracticas = async (req, res) => {
    try {
        let consulta = ListaPracticas.find({});


        const listasPracticas = await consulta;

        if (listasPracticas.length === 0) {
            return res.status(404).json({
                status: "error",
                mensaje: "No se han encontrado listas de prácticas!!"
            });
        } else {
            return res.status(200).json({
                status: "éxito",
                listasPracticas: listasPracticas
            });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: "error",
            mensaje: "Error al obtener las listas de prácticas"
        });
    }
}

// Obtener una lista de prácticas por su ID
const obtenerListaPracticas = async (req, res) => {
    try {
        const listaPracticasId = req.params.id;
        const listaPracticas = await ListaPracticas.findById(listaPracticasId);

        if (!listaPracticas) {
            return res.status(404).json({
                status: "error",
                mensaje: "Lista de prácticas no encontrada"
            });
        } else {
            return res.status(200).json({
                status: "éxito",
                listaPracticas: listaPracticas
            });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: "error",
            mensaje: "Error al obtener la lista de prácticas"
        });
    }
}

// Actualiza una lista de prácticas
const actualizarListaPracticas = async (req, res) => {
    try {
        const listaPracticasId = req.params.id;
        const nuevosDatos = req.body;

        const listaPracticasActualizada = await ListaPracticas.findByIdAndUpdate(
            listaPracticasId,
            nuevosDatos,
            { new: true }
        );

        if (!listaPracticasActualizada) {
            return res.status(404).json({
                status: "error",
                mensaje: "Lista de prácticas no encontrada"
            });
        } else {
            return res.status(200).json({
                status: "éxito",
                listaPracticas: listaPracticasActualizada,
                mensaje: "Lista de prácticas actualizada!!"
            });
        }
    } catch (error) {
        console.error(error);
        return res.status(400).json({
            status: "error",
            mensaje: "Error de validación",
            errores: error.message
        });
    }
}

// Elimina una lista de prácticas
const eliminarListaPracticas = async (req, res) => {
    try {
        const listaPracticasId = req.params.id;
        const listaPracticasEliminada = await ListaPracticas.findByIdAndDelete(
            listaPracticasId
        );

        if (!listaPracticasEliminada) {
            return res.status(404).json({
                status: "error",
                mensaje: "Lista de prácticas no encontrada"
            });
        } else {
            return res.status(200).json({
                status: "éxito",
                mensaje: "Lista de prácticas eliminada!!"
            });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: "error",
            mensaje: "Error al eliminar la lista de prácticas"
        });
    }
}

module.exports = {
    crearListaPracticas,
    listarListasPracticas,
    obtenerListaPracticas,
    actualizarListaPracticas,
    eliminarListaPracticas
}