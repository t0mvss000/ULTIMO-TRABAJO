const ListaPractica = require("../modelos/ListaPractica"); 

// Crea una nueva lista de prácticas
const crear_lista_practica = (req, res) => {
  let parametros = req.body;

  try {
    
    const listaPractica = new ListaPractica(parametros);
    listaPractica.save()
      .then((listaPracticaGuardada) => {
        return res.status(200).json({
          status: "éxito",
          listaPractica: listaPracticaGuardada,
          mensaje: "Lista de prácticas creada con éxito!!",
        });
      })
      .catch((error) => {
        console.error(error);
        return res.status(500).json({
          status: "error",
          mensaje: "Error al guardar la lista de prácticas",
          error: error.message,
        });
      });
  } catch (error) {
    console.error(error);
    return res.status(400).json({
      status: "error",
      mensaje: "Error de validación",
      errores: error.message,
    });
  }
};

// Lista todas las listas de prácticas
const listar_listas_practicas = async (req, res) => {
  try {
    let consulta = ListaPractica.find({});

    const listasPracticas = await consulta;

    if (listasPracticas.length === 0) {
      return res.status(404).json({
        status: "error",
        mensaje: "No se han encontrado listas de prácticas!!",
      });
    } else {
      return res.status(200).json({
        status: "éxito",
        listasPracticas: listasPracticas,
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: "error",
      mensaje: "Error al obtener las listas de prácticas",
    });
  }
};

// Obtener una lista de prácticas por su ID
const obtener_lista_practica = async (req, res) => {
  try {
    const listaPracticaId = req.params.id;
    const listaPractica = await ListaPractica.findById(listaPracticaId);

    if (!listaPractica) {
      return res.status(404).json({
        status: "error",
        mensaje: "Lista de prácticas no encontrada",
      });
    } else {
      return res.status(200).json({
        status: "éxito",
        listaPractica: listaPractica,
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: "error",
      mensaje: "Error al obtener la lista de prácticas",
    });
  }
};

// Actualizar una lista de prácticas
const actualizar_lista_practica = async (req, res) => {
  try {
    const listaPracticaId = req.params.id;
    const nuevosDatos = req.body;


    const listaPracticaActualizada = await ListaPractica.findByIdAndUpdate(
      listaPracticaId,
      nuevosDatos,
      { new: true }
    );

    if (!listaPracticaActualizada) {
      return res.status(404).json({
        status: "error",
        mensaje: "Lista de prácticas no encontrada",
      });
    } else {
      return res.status(200).json({
        status: "éxito",
        listaPractica: listaPracticaActualizada,
        mensaje: "Lista de prácticas actualizada!!",
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(400).json({
      status: "error",
      mensaje: "Error de validación",
      errores: error.message,
    });
  }
};

// Eliminar lista de prácticas
const eliminar_lista_practica = async (req, res) => {
  try {
    const listaPracticaId = req.params.id;
    const listaPracticaEliminada = await ListaPractica.findByIdAndDelete(
      listaPracticaId
    );

    if (!listaPracticaEliminada) {
      return res.status(404).json({
        status: "error",
        mensaje: "Lista de prácticas no encontrada",
      });
    } else {
      return res.status(200).json({
        status: "éxito",
        mensaje: "Lista de prácticas eliminada!!",
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: "error",
      mensaje: "Error al eliminar la lista de prácticas",
    });
  }
};

module.exports = {
  crear_lista_practica,
  listar_listas_practicas,
  obtener_lista_practica,
  actualizar_lista_practica,
  eliminar_lista_practica,
};