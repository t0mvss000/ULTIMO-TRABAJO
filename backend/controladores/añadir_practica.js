const { validarPractica } = require("../util/validar");
const AnadirPractica = require("../modelos/AñadirPractica");

const crear_practica = (req, res) => {
  try {
    validarPractica(req.body);
    const nuevaPractica = new AnadirPractica(req.body);
    nuevaPractica.save()
      .then((practicaGuardada) => {
        res.status(201).json({
          status: "éxito",
          practica: practicaGuardada,
          mensaje: "Práctica creada con éxito",
        });
      })
      .catch((error) => {
        console.error(error);
        res.status(500).json({
          status: "error",
          mensaje: "Error al crear la práctica",
          error: error.message,
        });
      });
  } catch (error) {
    console.error(error);
    res.status(400).json({
      status: "error",
      mensaje: "Error de validación",
      errores: JSON.parse(error.message),
    });
  }
};


const listar_practicas = async (req, res) => {
  try {
    const practicas = await AnadirPractica.find();
    res.status(200).json({
      status: "éxito",
      practicas,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "error",
      mensaje: "Error al obtener las prácticas",
    });
  }
};


const obtener_practica = async (req, res) => {
  try {
    const practicaId = req.params.id;
    const practica = await AnadirPractica.findById(practicaId);

    if (!practica) {
      return res.status(404).json({
        status: "error",
        mensaje: "Práctica no encontrada",
      });
    }

    res.status(200).json({
      status: "éxito",
      practica,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "error",
      mensaje: "Error al obtener la práctica",
    });
  }
};



const actualizar_practica = async (req, res) => {
  try {
    const practicaId = req.params.id;
    validarPractica(req.body) //<- validamos la nueva practica
    const practicaActualizada = await AnadirPractica.findByIdAndUpdate(
      practicaId,
      req.body,
      { new: true }
    );

    if (!practicaActualizada) {
      return res.status(404).json({
        status: "error",
        mensaje: "Práctica no encontrada",
      });
    }

    res.status(200).json({
      status: "éxito",
      practica: practicaActualizada,
      mensaje: "Práctica actualizada con éxito",
    });

  } catch (error) {
    console.error(error);
    res.status(400).json({
        status: "error",
        mensaje: "Error de validación",
        errores: JSON.parse(error.message)
      });
  }
};


const eliminar_practica = async (req, res) => {
  try {
    const practicaId = req.params.id;
    const practicaEliminada = await AnadirPractica.findByIdAndDelete(practicaId);

    if (!practicaEliminada) {
      return res.status(404).json({
        status: "error",
        mensaje: "Práctica no encontrada",
      });
    }

    res.status(200).json({
      status: "éxito",
      mensaje: "Práctica eliminada con éxito",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "error",
      mensaje: "Error al eliminar la práctica",
    });
  }
};


module.exports = {
  crear_practica,
  listar_practicas,
  obtener_practica,
  actualizar_practica,
  eliminar_practica,
};