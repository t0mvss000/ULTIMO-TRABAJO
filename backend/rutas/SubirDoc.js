const express = require('express');
const router = express.Router();
const SubirDocController = require('../controladores/SubirDoc_controlador'); 
const multer = require('multer');

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


router.post('/subir', upload.single('documento'), SubirDocController.subirDocumento);

router.get('/', SubirDocController.obtenerDocumentos);

module.exports = router;