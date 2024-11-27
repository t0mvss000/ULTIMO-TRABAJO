const express = require('express');
const router = express.Router();
const MiPerfilController = require('../controladores/MiPerfil'); 
const multer = require('multer');
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); 
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix)
  }
});

const upload = multer({ storage: storage });

router.get('/', MiPerfilController.getMiPerfil);

router.put('/', upload.single('image'), MiPerfilController.updateMiPerfil); 

module.exports = router;
