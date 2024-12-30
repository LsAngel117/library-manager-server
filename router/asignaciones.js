//router/asignaciones.js
const { Router } = require('express');

// Controllers
const { getAsignaciones, crearAsignacion, cambiarEstadoAsignacion } = require('../controllers/asignaciones');

// Middlewares
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

//Obtener todas las asignaciones
router.get('/', validarJWT, getAsignaciones);

//Hacer una nueva asignación
router.post('/create', validarJWT, crearAsignacion);

// Cambiar el estado de una asignación
router.put('/state/:id', validarJWT, cambiarEstadoAsignacion);

module.exports = router;