const Evaluacion = require("../modelos/Evaluacion_m"); 

const crear_evaluacion = (req, res) => {
    let parametros = req.body;

    try {
        
        const evaluacion = new Evaluacion(parametros);
        evaluacion.save()
            .then(evaluacionGuardada => {
                return res.status(200).json({
                    status: "éxito",
                    evaluacion: evaluacionGuardada, 
                    mensaje: "Evaluación creada con éxito!!"
                });
            })
            .catch(error => {
                console.error(error);
                return res.status(500).json({ 
                    status: "error",
                    mensaje: "Error al guardar la evaluación",
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

const listar_evaluaciones = async (req, res) => {
    try {
        let consulta = Evaluacion.find({});

        const evaluaciones = await consulta;

        if (evaluaciones.length === 0) { 
            return res.status(404).json({
                status: "error",
                mensaje: "No se han encontrado evaluaciones!!"
            });
        } else {
            return res.status(200).json({ 
                status: "éxito",
                evaluaciones: evaluaciones
            });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: "error",
            mensaje: "Error al obtener las evaluaciones"
        });
    }
}

const obtener_evaluacion = async (req, res) => {
    try {
        const evaluacionId = req.params.id; 
        const evaluacion = await Evaluacion.findById(evaluacionId);

        if (!evaluacion) {
            return res.status(404).json({
                status: "error",
                mensaje: "Evaluación no encontrada"
            });
        } else {
            return res.status(200).json({
                status: "éxito",
                evaluacion: evaluacion
            });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: "error",
            mensaje: "Error al obtener la evaluación"
        });
    }
}

const actualizar_evaluacion = async (req, res) => {
    try {
        const evaluacionId = req.params.id;
        const nuevosDatos = req.body; 


        const evaluacionActualizada = await Evaluacion.findByIdAndUpdate(evaluacionId, nuevosDatos, { new: true });

        if (!evaluacionActualizada) {
            return res.status(404).json({
                status: "error",
                mensaje: "Evaluación no encontrada"
            });
        } else {
            return res.status(200).json({
                status: "éxito",
                evaluacion: evaluacionActualizada,
                mensaje: "Evaluación actualizada!!"
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

const eliminar_evaluacion = async (req, res) => {
    try {
        const evaluacionId = req.params.id;
        const evaluacionEliminada = await Evaluacion.findByIdAndDelete(evaluacionId); 

        if (!evaluacionEliminada) {
            return res.status(404).json({
                status: "error",
                mensaje: "Evaluación no encontrada"
            });
        } else {
            return res.status(200).json({
                status: "éxito",
                mensaje: "Evaluación eliminada!!"
            });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: "error",
            mensaje: "Error al eliminar la evaluación"
        });
    }
}

module.exports = {
    crear_evaluacion,
    listar_evaluaciones,
    obtener_evaluacion,
    actualizar_evaluacion,
    eliminar_evaluacion
}