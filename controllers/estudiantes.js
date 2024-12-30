// controllers/estudiantes.js
const { response } = require('express');

// Models
const Estudiante = require('../models/estudiante');

//Obtener todos los estudiantes
const getEstudiantes = async (req, res = response) => {
    try {
        const estudiantes = await Estudiante.findAll();
        res.json({
            ok: true,
            estudiantes
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        });
    }
};

module.exports = {
    getEstudiantes,
};