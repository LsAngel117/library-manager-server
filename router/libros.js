//router/libros.js
const { Router } = require('express');

// Controllers
const { getLibros, getEstadisticasLibros } = require('../controllers/libros');

// Middlewares
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

//Obtener todos los libros
router.get('/', validarJWT, getLibros);

//Obtener estadisticas de libros
router.get('/status', validarJWT, getEstadisticasLibros);

module.exports = router;