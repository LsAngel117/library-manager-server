//router/estudiantes.js
const { Router } = require('express');

// Controllers
const { getEstudiantes } = require('../controllers/estudiantes');

// Middlewares
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

//Obtener todos los estudiantes
router.get('/', validarJWT, getEstudiantes);

module.exports = router;