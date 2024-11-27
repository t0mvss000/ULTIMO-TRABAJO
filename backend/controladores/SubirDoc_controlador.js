const multer = require('multer');
const SubirDoc = require("../modelos/SubirDoc");

// Configuración de Multer para el almacenamiento de archivos
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Directorio donde se guardarán los archivos
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix)
  }
});

const upload = multer({ storage: storage });

const subirDocumento = async (req, res) => {
  try {
    const nuevoDocumento = new SubirDoc({
      seleccion_archivo: req.file ? req.file.path : null, // Guardar la ruta del archivo si existe
      boton_subir: req.body.boton_subir, // Obtener el valor del botón de subida
      image: req.body.image, // Obtener la imagen si se proporciona
    });

    // Guardar el documento en la base de datos
    await nuevoDocumento.save();

    res.status(201).json({
      status: "éxito",
      documento: nuevoDocumento,
      mensaje: "Documento subido con éxito",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "error",
      mensaje: "Error al subir el documento",
    });
  }
};

const obtenerDocumentos = async (req, res) => {
  try {
    const documentos = await SubirDoc.find();
    res.status(200).json({
      status: "éxito",
      documentos,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "error",
      mensaje: "Error al obtener los documentos",
    });
  }
};

module.exports = {
  subirDocumento,
  obtenerDocumentos,
};