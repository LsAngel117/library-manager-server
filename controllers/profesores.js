// controllers/profesores.js
const { response } = require('express');

// Models
const Profesor = require('../models/profesor');

//Obtener todos los profesores
const getProfesores = async (req, res = response) => {
    try {
        const profesores = await Profesor.findAll();
        res.json({
            ok: true,
            profesores
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
    getProfesores,
};