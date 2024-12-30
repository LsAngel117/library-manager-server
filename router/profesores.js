//router/profesores.js
const { Router } = require('express');

// Controllers
const { getProfesores } = require('../controllers/profesores');

// Middlewares
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

//Obtener todos los profesores
router.get('/', validarJWT, getProfesores);

module.exports = router;