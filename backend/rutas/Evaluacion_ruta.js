const express = require('express');
const router = express.Router();
const EvaluacionController = require('../controladores/Evaluacion'); 


router.post('/', EvaluacionController.crear_evaluacion);

router.get('/', EvaluacionController.listar_evaluaciones);

router.get('/:id', EvaluacionController.obtener_evaluacion);

router.put('/:id', EvaluacionController.actualizar_evaluacion);

router.delete('/:id', EvaluacionController.eliminar_evaluacion);

module.exports = router;